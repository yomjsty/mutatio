'use server';

import db from '@/lib/db';
import { getCurrentUser } from "@/lib/get-current-user";

export async function createProject(formData: FormData) {
    const user = await getCurrentUser();
    if (!user) throw new Error('Unauthorized');

    const name = formData.get('name')?.toString().trim();
    const description = formData.get('description')?.toString().trim();

    if (!name) throw new Error('Project name is required');

    const project = await db.project.create({
        data: {
            name,
            description,
            userId: user.id,
        },
    });

    return {
        ...project
    };
}

export async function getAllProjects() {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const projects = await db.project.findMany({
        where: {
            userId: user.id,
        },
        include: {
            versions: {
                include: {
                    logs: true,
                },
                orderBy: {
                    name: 'desc',
                },
            },
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return projects.map(project => ({
        ...project,
        createdAt: project.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }),
        updatedAt: project.updatedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }),
        versions: project.versions.map(version => ({
            ...version,
            createdAt: version.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            })
        }))
    }))
}

export async function getProjectById(id: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const project = await db.project.findUnique({
        where: { id },
        include: {
            versions: {
                include: {
                    logs: {
                        include: {
                            user: true,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                    }
                },
                orderBy: {
                    name: 'desc',
                },
            },
            apiKey: true,
        },
    })

    if (!project || project.userId !== user.id) {
        throw new Error('Project not found')
    }

    return project
}

export async function deleteProject(id: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const project = await db.project.findUnique({
        where: { id },
    })

    if (!project || project.userId !== user.id) {
        throw new Error('Project not found or unauthorized')
    }

    await db.project.delete({
        where: { id },
    })

    return { success: true }
}