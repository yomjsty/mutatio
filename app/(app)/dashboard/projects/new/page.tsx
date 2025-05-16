'use client'

import { createProject } from '@/actions/project'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface Project {
    id: string
    name: string
    description: string | null
    userId: string
    createdAt: Date
    updatedAt: Date
    entries: number
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            disabled={pending}
            className=""
        >
            {pending ? (
                <div className="flex items-center">
                    <Loader2 className="animate-spin mr-2" />
                    Creating...
                </div>
            ) : 'Create Project'}
        </Button>
    )
}

export default function NewProjectPage() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setErrorMessage(null)

        try {
            const newProject = await createProject(formData)

            startTransition(() => {
                queryClient.setQueryData(['projects'], (oldData: Project[] = []) => {
                    return [newProject, ...oldData]
                })
                toast.success('Project created successfully!')
                router.push('/dashboard/projects')
            })
        } catch (error) {
            console.error('Failed to create project:', error)
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong.')
            toast.error('Failed to create project')
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-2 mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Create New Project</h1>
                    <p className="text-muted-foreground">Add a new project to your dashboard</p>
                </div>
            </div>

            <Card className="max-w-2xl mx-auto border-border/40 shadow-sm">
                <CardHeader className="bg-card/50 pb-4">
                    <CardTitle className="text-xl">Project Details</CardTitle>
                    <CardDescription>Enter information about your new project</CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                    <form action={handleSubmit} className="space-y-6">
                        <div>
                            <Label className="block text-sm font-medium mb-1">Project Name</Label>
                            <Input
                                type="text"
                                name="name"
                                required
                                placeholder="e.g., E-commerce App"
                            // className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Choose a descriptive name for your project</p>
                        </div>

                        <div>
                            <Label className="block text-sm font-medium mb-1">Description</Label>
                            <Textarea
                                name="description"
                                rows={5}
                                className="resize-none"
                                placeholder="Describe your project..."
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Optional: Add details about your project&apos;s purpose and goals
                            </p>
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 text-sm">{errorMessage}</p>
                        )}

                        <div className="flex justify-end gap-3 pt-4">
                            <Link href="/dashboard/projects">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                            <SubmitButton />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
