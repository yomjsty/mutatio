'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@/actions/project'
import { columns, type Project } from "./columns";
import { DataTable } from "./data-table";

type ProjectResponse = {
    id: string
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
    userId: string
    isPublic: boolean
    apiKeyId: string | null
    user: {
        name: string | null
    }
    versions: Array<{
        id: string
        name: string
        projectId: string
        createdAt: string
        logs: Array<{
            id: string
            createdAt: Date
            userId: string
            message: string
            versionId: string
        }>
    }>
}

export function ProjectTable() {
    const { data: rawProjects, isLoading, error } = useQuery<ProjectResponse[]>({
        queryKey: ['projects'],
        queryFn: getAllProjects,
    })

    const projects: Project[] = rawProjects?.map(project => ({
        id: project.id,
        name: project.name,
        description: project.description ?? undefined,
        status: project.isPublic ? "public" : "private",
        version: project.versions?.length > 0
            ? project.versions[0].name
            : "No version",
        entries: project.versions?.reduce((acc, version) => acc + (version.logs?.length || 0), 0) || 0,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        APIHits: 0,
        Owner: project.user?.name ?? "Unknown"
    })) ?? []

    if (isLoading) return <p>Loading projects...</p>
    if (error) return <p>Error loading projects</p>

    return (
        <div className="space-y-4 mt-8">
            <DataTable columns={columns} data={projects} />
        </div>
    )
}
