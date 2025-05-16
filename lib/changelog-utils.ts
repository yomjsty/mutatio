import { Project } from "@/app/(public)/changelogs/changelog-list";

export async function getData(): Promise<Project | null> {
    try {
        const response = await fetch(`https://mutatio.vercel.app/api/public/${process.env.NEXT_PUBLIC_MUTATIO_API_KEY}`, {
            cache: "force-cache",
        });

        const json = await response.json();
        if (!json?.data?.name) return null;

        return json.data;
    } catch (error) {
        console.error("getData failed", error);
        return null;
    }
}
