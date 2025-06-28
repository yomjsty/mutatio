import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
                    <p className="text-muted-foreground">Manage and monitor all your projects in one place.</p>
                </div>
                <Link href="/dashboard/projects/new">n d
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Project
                    </Button>
                </Link>
            </div>
            <div className="rounded-md border">
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
        </div>
    );
} 