import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectTable } from "./project-table";


export default function ProjectsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
                    <p className="text-muted-foreground">Manage and monitor all your projects in one place.</p>
                </div>
                <Link href="/dashboard/projects/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Project
                    </Button>
                </Link>
            </div>
            <ProjectTable />
        </div>
    )
}
