import { createAuthClient } from "better-auth/react";
import { adminClient, apiKeyClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [adminClient(), inferAdditionalFields<typeof auth>(), apiKeyClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
