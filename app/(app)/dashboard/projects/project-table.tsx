'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@/actions/project'
import { columns, type Project } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton"

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
    apiKey: {
        requestCount: number | null
    } | null
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
        APIHits: project.apiKey === null ? "No API Key" : (project.apiKey?.requestCount ?? 0),
        Owner: project.user?.name ?? "Unknown"
    })) ?? []

    if (isLoading) return (
        <div className="space-y-4">
            <div className="p-4">
                <div className="flex items-center gap-4 py-4">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-8 w-[100px] ml-auto" />
                </div>
            </div>
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <th key={i} className="h-12 px-4">
                                    <Skeleton className="h-4 w-[100px]" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-b">
                                {Array.from({ length: 8 }).map((_, j) => (
                                    <td key={j} className="p-4">
                                        <Skeleton className="h-4 w-[100px]" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-[100px]" />
                    <Skeleton className="h-8 w-[200px]" />
                </div>
            </div>
        </div>
    )
    if (error) return <p>Error loading projects</p>

    return (
        <div className="space-y-4 mt-8">
            <DataTable columns={columns} data={projects} />
        </div>
    )
}
