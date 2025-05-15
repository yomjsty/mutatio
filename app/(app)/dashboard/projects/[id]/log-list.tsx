"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLog } from "@/actions/log"
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
import { useRouter } from "next/navigation"

export interface Log {
    id: string
    message: string
    createdAt: Date
    userId: string
    user: {
        name: string | null
    }
}

export function LogList({ logs, projectId }: { logs: Log[], projectId: string }) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation({
        mutationFn: deleteLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            router.refresh()
        },
    })

    if (logs.length === 0) {
        return <p className="text-sm text-muted-foreground mt-4">No changelogs yet.</p>
    }

    return (
        <div className="space-y-4 mt-4">
            {logs.map((log) => (
                <Card key={log.id} className="overflow-hidden border-border/40">
                    <CardContent className="flex justify-between items-center">
                        <div className="grid gap-2">
                            <div className="font-medium">{log.message}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                {log.createdAt.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })} - {log.user.name}
                            </p>
                        </div>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                                    <Trash2 size={16} />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete this log?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. The log will be permanently deleted.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => mutation.mutate(log.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
