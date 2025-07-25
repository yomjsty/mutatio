import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, apiKey, openAPI } from "better-auth/plugins";
import db from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        admin(),
        openAPI(),
        apiKey({
            rateLimit: {
                enabled: true,
                timeWindow: 1000 * 60 * 60 * 24, // 1 day
                maxRequests: 100, // 10 requests per day
            },
        }),
        nextCookies(),
    ],
});
