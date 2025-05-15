'use server'

import { authClient } from "@/lib/auth-client";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/get-current-user";

export async function createProjectApiKey(projectId: string, name?: string) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            throw new Error("Unauthorized - Please sign in");
        }

        const { data: apiKey } = await authClient.apiKey.create({
            name: name || "My API Key",
            prefix: "sk_mutatio_",
        }, {
            headers: {
                Cookie: cookies().toString()
            }
        });

        if (!apiKey) {
            throw new Error("Failed to create API key");
        }

        await db.project.update({
            where: { id: projectId },
            data: {
                apiKeyId: apiKey.id
            }
        });

        return apiKey;
    } catch (error) {
        console.error('API Key creation error:', error);
        throw new Error(error instanceof Error ? error.message : "Failed to create API key");
    }
}
