"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon, ArrowUpDown, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteProject } from "@/actions/project"
import { toast } from "sonner"
import { useTransition } from "react"
import { AlertDialog, AlertDialogHeader, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { useQueryClient } from "@tanstack/react-query"

// Tipe data Project kamu
export type Project = {
    id: string
    name: string
    description?: string
    status: "public" | "private"
    entries: number
    createdAt: string
    updatedAt: string
    APIHits: number
    Owner: string
}

function ActionCell({ project }: { project: Project }) {
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteProject(project.id)
                toast.success("Project deleted successfully.")
                queryClient.invalidateQueries({ queryKey: ["projects"] })
            } catch (error) {
                toast.error("Failed to delete project.")
                console.error(error)
            }
        })
    }

    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <Link href={`/dashboard/projects/${project.id}`}>
                        <DropdownMenuItem>View Project</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>View API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AlertDialog>
                            <AlertDialogTrigger className="text-destructive flex items-center justify-center gap-2">
                                <Trash2 size={16} className="text-destructive" /> Delete Project
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete project &ldquo;{project.name}&rdquo;?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the project and all its versions and logs. This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-red-600 hover:bg-red-700"
                                        disabled={isPending}
                                    >
                                        {isPending ? "Deleting..." : "Delete"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "name",
        header: () => (
            <div className="flex items-center gap-1">
                Project Name
            </div>
        ),
        cell: ({ row }) => {
            const name = row.original.name
            const description = row.original.description
            return (
                <div>
                    <div className="font-medium">{name}</div>
                    {description && (
                        <div className="text-xs text-muted-foreground">{description}</div>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => {
            const status = getValue() as string
            return (
                <Badge
                    variant={
                        status === "public"
                            ? "default"
                            : status === "private"
                                ? "secondary"
                                : "outline"
                    }
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            )
        },
    },
    {
        accessorKey: "version",
        header: "Version",
    },
    {
        accessorKey: "entries",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Entries
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Updated
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
    },
    {
        accessorKey: "APIHits",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-3"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    API Hits
                    <ArrowUpDown className="h-4 w-4" />
                </button>
            )
        },
        cell: ({ getValue }) => {
            const hits = getValue() as number
            return hits.toLocaleString()
        },
    },
    {
        accessorKey: "Owner",
        header: "Owner",
    },
    {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => <ActionCell project={row.original} />
    },
]
