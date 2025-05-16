import { BarChart3Icon } from "lucide-react"
import Link from "next/link"
import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t bg-muted/50">
            <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12 mx-auto px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <BarChart3Icon className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Mutatio</span>
                </div>
                <nav className="flex gap-4 sm:gap-6">
                    <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Terms
                    </Link>
                    <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Privacy
                    </Link>
                    <Link href="/help" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Help
                    </Link>
                    <Link target="_blank" href="https://instagram.com/akbarknawan" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                </nav>
                <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Mutatio. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
