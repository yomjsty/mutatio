import { getProjectById } from '@/actions/project'
import { notFound } from 'next/navigation'
import { VersionSection } from "./version-section"
import { ApiKeyCard } from "./apikey-card"

interface ProjectPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    let project

    try {
        const projectId = await params
        project = await getProjectById(projectId.id)
    } catch {
        return notFound()
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <VersionSection projectId={project.id} versions={project.versions} />

                <ApiKeyCard
                    projectId={project.id}
                    projectName={project.name ?? ''}
                    apiKey={project.apiKey ? {
                        id: project.apiKey.id,
                        name: project.apiKey.name ?? '',
                        createdAt: project.apiKey.createdAt.toISOString()
                    } : undefined}
                />
            </div>
        </div>
    )
}
