import { BarChart3Icon } from "lucide-react"
import Link from "next/link"
import React from 'react'
import { Button } from "./ui/button"

export default function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <BarChart3Icon className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Mutatio</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        About
                    </Link>
                    <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Features
                    </Link>
                    <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        How It Works
                    </Link>
                    <Link href="/help" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Help
                    </Link>
                    <Link href="/changelogs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Changelogs (Example)
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </Link>
                    {/* <Link href="/signup">
                        <Button size="sm">Sign up</Button>
                    </Link> */}
                </div>
            </div>
        </nav>
    )
}
