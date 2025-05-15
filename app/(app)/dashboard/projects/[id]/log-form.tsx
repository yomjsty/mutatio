'use client'

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLog } from "@/actions/log"
import { useRouter } from "next/navigation"

interface LogFormProps {
    versionId: string
}

export function LogForm({ versionId }: LogFormProps) {
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const queryClient = useQueryClient()
    const router = useRouter()

    const createLogMutation = useMutation<
        { id: string; message: string; versionId: string; createdAt: Date; userId: string },
        Error,
        { message: string; versionId: string }
    >({
        mutationFn: (newLog) => createLog(newLog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['version', versionId] })
        },
        onError: (error: Error) => {
            console.error("Error creating log:", error)
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!message.trim()) return

        setIsSubmitting(true)

        try {
            await createLogMutation.mutateAsync({ message, versionId })
            setMessage('')
            router.refresh()
        } catch (error) {
            console.error("Error creating log:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Create Log</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New Log</AlertDialogTitle>
                    <AlertDialogDescription>
                        Add a log entry for this version. Provide a log message that describes the changes or updates.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="log-message" className="text-right">
                            Log Message
                        </Label>
                        <Input
                            id="log-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Log'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
