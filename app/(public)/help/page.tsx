export default function HelpPage() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 py-24">
            <h1 className="text-3xl font-bold">Help</h1>

            <p>
                Mutatio adalah platform untuk mencatat dan membagikan changelog proyek kamu secara publik melalui API.
            </p>

            <h2 className="text-2xl font-semibold">1. Membuat Proyek</h2>
            <p>
                Setelah login, kamu bisa membuat proyek baru dari dashboard. Setiap proyek memiliki API key unik.
            </p>

            <h2 className="text-2xl font-semibold">2. Menambahkan Versi & Changelog</h2>
            <p>
                Kamu bisa menambahkan versi (seperti v1.0, v2.0) lalu mencatat perubahan (changelog) di dalamnya.
            </p>

            <h2 className="text-2xl font-semibold">3. Mengakses Changelog</h2>
            <p>
                Changelog bisa diakses publik melalui endpoint:
                <br />
                <code className="bg-gray-100 p-1 rounded block mt-2">
                    https://mutatio.vercel.app/api/public/&lt;API_KEY&gt;
                </code>
            </p>

            <h2 className="text-2xl font-semibold">4. Menampilkan Changelog di Website</h2>
            <p>Kamu bisa fetch dan tampilkan changelog menggunakan kode berikut:</p>

            <div className="bg-gray-100 rounded p-4 overflow-x-auto text-sm">
                <pre>
                    {`// getData.ts
export async function getData() {
    const response = await fetch(\`https://mutatio.vercel.app/api/public/\${process.env.NEXT_PUBLIC_MUTATIO_API_KEY}\`);
    const data = await response.json();
    return data.data;
}`}
                </pre>
            </div>

            <div className="bg-gray-100 rounded p-4 overflow-x-auto text-sm">
                <pre>
                    {`// page.tsx
import React, { Suspense } from 'react';
import ChangelogsList from "./changelog-list";
import { getData } from "@/lib/changelog-utils";

export default async function ChangelogsPage() {
    const changeLogsPromise = getData();

    return (
        <div className="container mx-auto px-4 py-8">
            <h2>Project Changelogs</h2>
            <Suspense fallback={<div>Loading...</div>}>
                <ChangelogsList changeLogsPromise={changeLogsPromise} />
            </Suspense>
        </div>
    );
}`}
                </pre>
            </div>

            <div className="bg-gray-100 rounded p-4 overflow-x-auto text-sm">
                <pre>
                    {`// changelog-list.tsx
"use client";

import { use } from "react";

interface Project {
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

export default function ChangelogsList({ changeLogsPromise }: { changeLogsPromise: Promise<Project> }) {
    const project = use(changeLogsPromise);

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
}`}
                </pre>
            </div>

            <p>
                Jika kamu butuh bantuan lebih lanjut, silakan hubungi kami di{" "}
                <a href="mailto:support@mutatio.pro" className="text-blue-600 line-through">
                    support@mutatio.pro
                </a>.
            </p>
        </div>
    );
}
