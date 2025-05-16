"use client";

import { use } from "react";

export interface Project {
    id: string;
    name: string;
    versions: Array<{
        id: string;
        name: string;
        createdAt: string;
        logs: Array<{
            id: string;
            message: string;
            createdAt: string;
        }>;
    }>;
}

export default function ChangelogsList({ changeLogsPromise }: { changeLogsPromise: Promise<Project | null> }) {
    const project = use(changeLogsPromise);

    if (!project) {
        return <p className="text-red-500">Failed to load changelog data.</p>;
    }

    return (
        <div className="space-y-8">
            <div key={project.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                <h2 className="text-xl font-bold mb-3">{project.name} Project</h2>
                {project.versions.map((version) => (
                    <div key={version.id} className="mb-6 pl-4 border-l-4 border-indigo-500">
                        <h3 className="text-lg font-semibold mb-2">
                            {version.name} - {new Date(version.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </h3>
                        <ul className="list-disc space-y-1 pl-6">
                            {version.logs.map((log) => (
                                <li key={log.id} className="text-gray-700">
                                    <p>{log.message}</p>
                                    <small className="text-xs text-gray-500">
                                        {new Date(log.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </small>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

