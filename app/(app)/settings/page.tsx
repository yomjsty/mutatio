import { getCurrentUser } from "@/lib/get-current-user";
import SettingsForm from "./settings-form";
import { redirect } from "next/navigation";


export default async function SettingsPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account information</p>
                </div>
            </div>

            <SettingsForm user={user} />
        </div>
    )
}
