'use client'

import { Version } from "@/lib/generated/prisma"
import { LogForm } from "./log-form"
import { LogList } from "./log-list"
import type { Log } from "./log-list"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Calendar, Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { deleteVersion } from "@/actions/version"
import { useRouter } from "next/navigation"

interface VersionWithLogs extends Omit<Version, 'createdAt'> {
    createdAt: Date
    logs: Log[]
}

interface VersionCardProps {
    version: VersionWithLogs
}

export function VersionCard({ version }: VersionCardProps) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: deleteVersion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', version.projectId] })
            router.refresh()
        }
    })

    return (
        <div className="border p-4 rounded-md relative">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{version.name}</h3>

                <div className="flex items-center gap-2">
                    <LogForm versionId={version.id} />

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                                <Trash2 size={16} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this version?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will permanently delete the version and all associated logs.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => mutation.mutate(version.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <LogList logs={version.logs} projectId={version.projectId} />
            <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {new Date(version.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })}
            </p>
        </div>
    )
}
