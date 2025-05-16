"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface User {
    name: string;
    email: string;
}

export default function SettingsForm({ user }: { user: User }) {

    const [name, setName] = useState(user.name);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            await authClient.updateUser({
                name: name,
            });
            window.location.reload();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-md mx-auto border-border/40 shadow-sm">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                </div>

                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="mt-1 bg-muted cursor-not-allowed"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Your email address cannot be changed.</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t p-4">
                <Button onClick={handleSave} className="gap-2" disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    )
}
