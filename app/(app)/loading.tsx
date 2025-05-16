import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-8 w-[100px]" />
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <div className="grid gap-2">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Skeleton className="h-4 w-[200px]" />
                    <div className="grid gap-2">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
