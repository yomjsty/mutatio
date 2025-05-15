"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ClipboardIcon, KeyIcon, TrashIcon, CheckIcon } from "lucide-react"
import { toast } from "sonner"
import { createProjectApiKey } from "@/actions/apikey"
import { authClient } from "@/lib/auth-client"
import { buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

type Props = {
    projectId: string
    projectName: string
    apiKey?: {
        id: string
        name: string
        createdAt: string
    }
}

export function ApiKeyCard({ projectId, projectName, apiKey }: Props) {
    const [copied, setCopied] = useState(false)
    const [key, setKey] = useState<string | null>(null)
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleCopyApiKey = () => {
        if (!key) return
        navigator.clipboard.writeText(key)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const handleCreate = () => {
        startTransition(async () => {
            try {
                const newKey = await createProjectApiKey(projectId, name)
                setKey(newKey.key)
                toast.success("API key created successfully")
                setOpen(false)
                router.refresh()
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong")
            }
        })
    }

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await authClient.apiKey.delete({ keyId: apiKey!.id })
                toast.success("API key deleted")
                router.refresh()
            } catch {
                toast.error("Failed to delete key")
            }
        })
    }

    return (
        <Card className="overflow-hidden border-border/40 shadow-sm lg:col-span-2 h-fit">
            <CardHeader className="bg-card/50">
                <CardTitle className="text-xl">API Key</CardTitle>
                <CardDescription>Manage your project API key</CardDescription>
            </CardHeader>
            <CardContent>
                {apiKey ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                        <KeyIcon className="h-12 w-12 text-muted-foreground" />
                        <div className="w-full">
                            <h3 className="text-lg font-semibold">API Key Active</h3>
                            <p className="text-muted-foreground break-words my-2">{apiKey.name}</p>
                            {key && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 font-mono bg-muted p-3 rounded-md text-sm overflow-x-auto whitespace-nowrap scrollbar-thin">
                                            {key}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={handleCopyApiKey}
                                            className="flex-shrink-0"
                                        >
                                            {copied ? (
                                                <CheckIcon className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <ClipboardIcon className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <Alert>
                                        <KeyIcon className="h-4 w-4" />
                                        <AlertDescription>
                                            Please save your API Key somewhere safe. You won&apos;t be able to see it again.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                            <p className="text-sm text-muted-foreground mt-1">
                                Created At: {new Date(apiKey.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" className="gap-2">
                                        <TrashIcon className="h-4 w-4" />
                                        Delete Key
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will permanently delete your API key. This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            className={buttonVariants({ variant: "destructive" })}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-8">
                        <KeyIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No API Keys</h3>
                        <p className="text-muted-foreground mb-4 max-w-md">
                            You haven&apos;t created any API keys for this project yet. Create one to access your project programmatically.
                        </p>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button>Create API Key</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create API Key</DialogTitle>
                                    <DialogDescription>
                                        Generate an API key for this project. Only one key is allowed.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label className="text-right">Project</Label>
                                        <Input value={projectName} readOnly className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="key-name" className="text-right">Key Name</Label>
                                        <Input
                                            id="key-name"
                                            placeholder="e.g. Production Key"
                                            className="col-span-3"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleCreate} disabled={isPending}>
                                        {isPending ? "Creating..." : "Create"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
