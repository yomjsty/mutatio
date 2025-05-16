import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, BarChart3Icon, ClockIcon, KeyIcon } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-20 md:py-28">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Track Changes, Simplify Development
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Mutatio helps you track changes, manage projects, and collaborate with your team. All in one place.
                                </p>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link href="/login">
                                        <Button size="lg" className="gap-1">
                                            Get Started <ArrowRightIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href="#how-it-works">
                                        <Button size="lg" variant="outline">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="mx-auto lg:mx-0 relative p-2 md:p-4">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/30 to-primary/20 rounded-2xl blur-2xl opacity-70" />
                                <Image
                                    src="/dashboard-image.png"
                                    alt="Dashboard Preview"
                                    className="relative mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last border border-border/50 shadow-xl bg-background/50 backdrop-blur-sm"
                                    width={550}
                                    height={310}
                                    quality={100}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-muted/50 py-16 md:py-20" id="features">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                                    Mutatio provides all the tools you need to track changes and manage your projects effectively.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <ClockIcon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Changelog Tracking</h3>
                                <p className="text-center text-muted-foreground">
                                    Keep track of all changes made to your projects with detailed changelogs.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <KeyIcon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">API Key Management</h3>
                                <p className="text-center text-muted-foreground">
                                    Securely manage API keys for your projects with easy regeneration and deletion.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <BarChart3Icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold">Project Analytics</h3>
                                <p className="text-center text-muted-foreground">
                                    Get insights into your project performance with detailed analytics and reports.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-16 md:py-20" id="how-it-works">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple & Effective</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                                    Get started with Mutatio in just a few simple steps.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                    1
                                </div>
                                <h3 className="text-xl font-bold">Create a Project</h3>
                                <p className="text-center text-muted-foreground">
                                    Set up your project with a name and description to get started.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                    2
                                </div>
                                <h3 className="text-xl font-bold">Add Changelogs</h3>
                                <p className="text-center text-muted-foreground">
                                    Document changes and updates to keep track of your project&apos;s progress.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                    3
                                </div>
                                <h3 className="text-xl font-bold">Manage API Keys</h3>
                                <p className="text-center text-muted-foreground">
                                    Generate and manage API keys to integrate with your applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                {/* <section className="bg-muted/50 py-16 md:py-20">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                                <p className="text-muted-foreground">
                                    &quot;Mutatio has completely transformed how we track changes in our projects. It&apos;s simple, intuitive, and
                                    incredibly powerful.&quot;
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-muted h-10 w-10"></div>
                                    <div>
                                        <p className="text-sm font-medium">Sarah Johnson</p>
                                        <p className="text-xs text-muted-foreground">CTO, TechCorp</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
                                <p className="text-muted-foreground">
                                    &quot;The API key management feature is a game-changer. It&apos;s made our development process so much more
                                    secure and efficient.&quot;
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-muted h-10 w-10"></div>
                                    <div>
                                        <p className="text-sm font-medium">Michael Brown</p>
                                        <p className="text-xs text-muted-foreground">Lead Developer, DevStudio</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm md:col-span-2 lg:col-span-1">
                                <p className="text-muted-foreground">
                                    &quot;I&apos;ve tried many project management tools, but Mutatio stands out for its simplicity and focus on
                                    changelog tracking. It&apos;s exactly what our team needed.&quot;
                                </p>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-muted h-10 w-10"></div>
                                    <div>
                                        <p className="text-sm font-medium">Alex Rodriguez</p>
                                        <p className="text-xs text-muted-foreground">Product Manager, InnovateCo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* CTA Section */}
                <section className="bg-muted/50 py-16 md:py-20">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                                    Join thousands of developers who are already using Mutatio to track changes and manage their projects.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/login">
                                    <Button size="lg" className="gap-1">
                                        Login Now (Free) <ArrowRightIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                                {/* <Link href="#pricing">
                                    <Button size="lg" variant="outline">
                                        View Pricing
                                    </Button>
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
