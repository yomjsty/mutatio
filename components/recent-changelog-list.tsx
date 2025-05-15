"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Changelog {
    id: string;
    title: string;
    type: string;
    version: string;
    date: string;
    projectId: string;
    projectName: string;
}

interface RecentChangelogListProps {
    changelogs: Changelog[];
}

export function RecentChangelogList({ changelogs }: RecentChangelogListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Changelog Entries</CardTitle>
                <CardDescription>Your latest changelog entries across all projects</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {changelogs.map((changelog) => (
                        <div key={changelog.id} className="flex items-start gap-4 p-3 rounded-lg border">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge
                                        variant={
                                            changelog.type === "feature"
                                                ? "default"
                                                : changelog.type === "improvement"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                        className="capitalize"
                                    >
                                        {changelog.type}
                                    </Badge>
                                    <span className="text-sm font-medium">{changelog.version}</span>
                                </div>
                                <h4 className="font-medium">{changelog.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-muted-foreground">{changelog.projectName}</span>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(changelog.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={`/dashboard/projects/${changelog.projectId}`}>
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">View project</span>
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/projects">View All Projects</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
