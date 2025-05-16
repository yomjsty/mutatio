"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    id: string;
    name: string;
    description: string;
    entries: number;
    createdAt: string;
    lastUpdated: string;
    apiHits: number | string;
}

export function ProjectCard({
    id,
    name,
    description,
    entries,
    createdAt,
    lastUpdated,
    apiHits,
}: ProjectCardProps) {
    return (
        <Card key={id} className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <Badge variant="outline" className="font-normal">
                        {entries} entries
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-muted-foreground">Created</p>
                        <p>{new Date(createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Last Updated</p>
                        <p>{new Date(lastUpdated).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                        })}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">API Hits</p>
                        <p>
                            {typeof apiHits === 'number' ? apiHits.toLocaleString() : apiHits}
                        </p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-3 border-t flex justify-between">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/projects/${id}`}>Manage</Link>
                </Button>
                {/* <Button variant="ghost" size="sm" className="gap-1">
                    View API <ArrowUpRight className="h-3 w-3" />
                </Button> */}
            </CardFooter>
        </Card>
    );
}
