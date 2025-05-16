import { useQuery } from '@tanstack/react-query'
import { getAllProjects } from '@/actions/project'
import { getAllLogs } from '@/actions/log'

interface Version {
    id: string
    name: string
    createdAt: string
    projectId: string
    logs: Array<{
        id: string
        message: string
        createdAt: Date
        userId: string
        versionId: string
    }>
}

interface Project {
    id: string
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
    userId: string
    apiKeyId: string | null
    isPublic: boolean
    versions: Version[]
    apiKey: {
        requestCount: number | null
    } | null
}

interface Changelog {
    id: string;
    title: string;
    type: string;
    version: string;
    date: string;
    projectId: string;
    projectName: string;
    severity?: string;
}

function transformLogs(logs: Awaited<ReturnType<typeof getAllLogs>>): Changelog[] {
    return logs.map(log => ({
        id: log.id,
        title: log.message,
        type: 'update',
        version: log.version.name,
        date: log.createdAt.toISOString(),
        projectId: log.version.projectId,
        projectName: log.version.name,
        severity: 'info'
    }))
}

export function useProjects() {
    return useQuery<Project[]>({
        queryKey: ['projects'],
        queryFn: getAllProjects
    })
}

export function useLogs() {
    return useQuery<Changelog[]>({
        queryKey: ['logs'],
        queryFn: async () => {
            const logs = await getAllLogs()
            return transformLogs(logs)
        }
    })
} 