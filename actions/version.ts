'use server'

import db from '@/lib/db'
import { getCurrentUser } from '@/lib/get-current-user'

interface VersionData {
    name: string
    projectId: string
}

export async function createVersion({ name, projectId }: VersionData) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const project = await db.project.findUnique({
        where: { id: projectId },
    })

    if (!project) {
        throw new Error('Project not found')
    }

    if (project.userId !== user.id) {
        throw new Error('Unauthorized access to this project')
    }

    const version = await db.version.create({
        data: {
            name,
            projectId,
        },
    })

    return version
}

export async function deleteVersion(versionId: string) {
    const user = await getCurrentUser()
    if (!user) throw new Error('Unauthorized')

    const version = await db.version.findUnique({
        where: { id: versionId },
        include: {
            project: true,
        }
    })

    if (!version) throw new Error('Version not found')
    if (version.project.userId !== user.id) throw new Error('Unauthorized access')

    await db.version.delete({
        where: { id: versionId },
    })

    return { success: true }
}
