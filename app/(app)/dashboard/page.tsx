"use client"

import Link from "next/link"
import { Code2, FileText, Plus, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/stat-card"
import { ProjectCard } from "@/components/project-card"
import { RecentChangelogList } from "@/components/recent-changelog-list"
import { Skeleton } from "@/components/ui/skeleton"
import { useProjects, useLogs } from "@/hooks/use-projects"

export default function DashboardPage() {
    const { data, isLoading, isError, error } = useProjects()
    const { data: recentChangelogs, isLoading: isLoadingChangelogs } = useLogs()
    const projects = data || []

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
            </div>
        )
    }

    if (isError) {
        return <p className="text-red-500">Failed to load data: {error.message}</p>
    }

    const totalEntries = projects.reduce((sum, p) => sum + (p.versions?.reduce((acc, version) => acc + (version.logs?.length || 0), 0) || 0), 0)
    const totalApiHits = projects.reduce((sum, p) => sum + (p.apiKey?.requestCount ?? 0), 0)

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your changelogs and track their performance.</p>
                </div>
                <Link href="/dashboard/projects/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Project
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    title="Total Projects"
                    icon={FileText}
                    value={projects.length}
                    description="+2"
                />
                <StatCard
                    title="Total Changelog Entries"
                    icon={Code2}
                    value={totalEntries}
                    description="+15"
                />
                <StatCard
                    title="API Requests"
                    icon={RefreshCw}
                    value={totalApiHits.toLocaleString()}
                    description="+573"
                />
            </div>

            <Tabs defaultValue="projects" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="recent">Recent Changelogs</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                description={project.description || ""}
                                entries={project.versions?.reduce((acc, version) => acc + (version.logs?.length || 0), 0) || 0}
                                createdAt={project.createdAt}
                                lastUpdated={project.updatedAt}
                                apiHits={project.apiKey === null ? "No API Key" : (project.apiKey.requestCount ?? 0)}
                            />
                        ))}

                        <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                            <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                                <Plus className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Create New Project</h3>
                            <p className="text-sm text-muted-foreground text-center mb-4">
                                Start tracking changes for a new website or application
                            </p>
                            <Button asChild>
                                <Link href="/dashboard/projects/new">New Project</Link>
                            </Button>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="recent">
                    {isLoadingChangelogs ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-20 w-full rounded-xl" />
                            ))}
                        </div>
                    ) : (
                        <RecentChangelogList changelogs={recentChangelogs || []} />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
