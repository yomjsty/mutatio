'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createVersion } from "@/actions/version"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

interface Version {
    name: string
    projectId: string
}

interface VersionResponse {
    id: string
    name: string
    projectId: string
    createdAt: Date
}

export function VersionForm({ projectId }: { projectId: string }) {
    const [name, setName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const router = useRouter()

    const createVersionMutation = useMutation<VersionResponse, Error, Version>({
        mutationFn: (newVersion: Version) => createVersion(newVersion),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            setOpen(false)
        },
        onError: (error: Error) => {
            console.error("Error creating version:", error)
        },
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)

        try {
            await createVersionMutation.mutateAsync({ name, projectId })
            setName('')
            router.refresh()
        } catch (error) {
            console.error('Failed to create version:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Version
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Version</DialogTitle>
                    <DialogDescription>
                        Create a new version for your project. Provide a version name and description if necessary.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Version Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            placeholder="v1.0.0"
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Version'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
