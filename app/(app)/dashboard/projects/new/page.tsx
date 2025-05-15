'use client'

import { createProject } from '@/actions/project'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { toast } from 'sonner' // jika kamu pakai library seperti 'sonner' atau 'react-hot-toast'

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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            disabled={pending}
        >
            {pending ? 'Creating...' : 'Create Project'}
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
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

            <form action={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {errorMessage && (
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                )}

                <SubmitButton />
            </form>
        </div>
    )
}
