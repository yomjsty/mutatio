'use client'

import { VersionForm } from "./version-form"
import { VersionCard } from "./version-card"
import type { Log } from "./log-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Version {
    id: string
    name: string
    createdAt: Date
    projectId: string
    logs: Log[]
}

interface VersionSectionProps {
    projectId: string
    versions: Version[]
}

export function VersionSection({ projectId, versions }: VersionSectionProps) {
    return (
        <Card className="overflow-hidden border-border/40 shadow-sm lg:col-span-3">
            <CardHeader className="bg-card/50">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">Changelogs</CardTitle>
                        <CardDescription>Track changes and updates to your project</CardDescription>
                    </div>
                    <VersionForm projectId={projectId} />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {versions.map((version) => (
                    <VersionCard key={version.id} version={version} />
                ))}
            </CardContent>
        </Card>
    )
} 