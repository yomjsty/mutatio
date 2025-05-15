import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/lib/auth";
import { Project, Version, Log } from "@/types";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ apiKey: string }> }
) {
    const { apiKey } = await params;

    const { valid, key } = await auth.api.verifyApiKey({
        body: {
            key: apiKey,
        },
    });

    if (!valid || !key) {
        return NextResponse.json({ error: "API key invalid or disabled." }, { status: 401 });
    }

    const validatedKey = await db.apikey.findUnique({
        where: {
            id: key.id
        },
        include: {
            project: {
                include: {
                    versions: {
                        include: {
                            logs: {
                                orderBy: {
                                    createdAt: "desc",
                                }
                            },
                        },
                        orderBy: {
                            name: "desc",
                        }
                    }
                }
            }
        }
    });

    if (!validatedKey || !validatedKey.project) {
        return NextResponse.json({ error: "No project data found." }, { status: 404 });
    }

    const data = validatedKey.project.flatMap((project) =>
        project.versions.flatMap((version) =>
            version.logs.map((log) => ({
                project: {
                    id: project.id,
                    name: project.name,
                } as Project,
                version: {
                    id: version.id,
                    name: version.name,
                    createdAt: version.createdAt,
                } as Version,
                log: {
                    id: log.id,
                    message: log.message,
                    createdAt: log.createdAt,
                } as Log,
            }))
        )
    );

    return NextResponse.json({ data });
}
