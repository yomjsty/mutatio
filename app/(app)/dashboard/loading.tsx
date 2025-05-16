import { Plus } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Skeleton className="h-8 w-[150px] mb-2" />
                    <Skeleton className="h-4 w-[300px]" />
                </div>
                <Skeleton className="h-10 w-[120px]" />
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                        <Skeleton className="h-8 w-[80px]" />
                        <Skeleton className="h-4 w-[60px]" />
                    </Card>
                ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="projects" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="recent">Recent Changelogs</TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* Project Card Skeletons */}
                        {[...Array(5)].map((_, i) => (
                            <Card key={i} className="p-6 space-y-4">
                                <Skeleton className="h-6 w-[150px]" />
                                <Skeleton className="h-4 w-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[120px]" />
                                </div>
                            </Card>
                        ))}

                        <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                            <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                                <Plus className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Create New Project</h3>
                            <p className="text-sm text-muted-foreground text-center mb-4">
                                Start tracking changes for a new website or application
                            </p>
                            <Skeleton className="h-10 w-[120px]" />
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="recent">
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-20 w-full rounded-xl" />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
