import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Skeleton className="h-9 w-32 mb-2" />
                    <Skeleton className="h-5 w-56" />
                </div>
            </div>

            <div className="mt-8 space-y-6">
                {/* Profile section skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-7 w-24" />
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid gap-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>

                {/* Button skeleton */}
                <div className="flex justify-end">
                    <Skeleton className="h-10 w-28" />
                </div>
            </div>
        </div>
    )
}
