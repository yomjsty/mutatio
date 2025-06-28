"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative mb-4">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
                {copied ? "Copied!" : "Copy"}
            </button>
            <SyntaxHighlighter language={language} style={oneDark} customStyle={{ borderRadius: "0.5rem", padding: "1rem" }}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default function HelpPage() {
    const getDataCode = `// getData.ts
export async function getData() {
    const response = await fetch(\`https://mutatio.vercel.app/api/public/\${process.env.NEXT_PUBLIC_MUTATIO_API_KEY}\`);
    const data = await response.json();
    return data.data;
}`;

    const pageCode = `// page.tsx
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
}`;

    const listCode = `// changelog-list.tsx
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
}`;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 py-24">
            <h1 className="text-3xl font-bold">Help</h1>

            <p>
                Mutatio is a platform for recording and publicly sharing your project&apos;s changelogs via API.
            </p>

            <h2 className="text-2xl font-semibold">1. Create a Project</h2>
            <p>
                After logging in, you can create a new project from your dashboard. Each project gets a unique API key.
            </p>

            <h2 className="text-2xl font-semibold">2. Add Versions & Changelogs</h2>
            <p>
                You can add versions (e.g., v1.0, v2.0) and log your changes under each version.
            </p>

            <h2 className="text-2xl font-semibold">3. Access Changelog via API</h2>
            <p>
                Changelogs are publicly accessible via:
            </p>
            <CodeBlock
                code={`https://mutatio.vercel.app/api/public/<API_KEY>`}
                language="bash"
            />

            <h2 className="text-2xl font-semibold">3.1 Sample API Response</h2>
            <p>
                Here&apos;s an example of the JSON structure returned by the public API endpoint:
            </p>
            <CodeBlock
                code={`{
  "data": {
    "id": "e2d5e002-6f74-4852-a869-b2be6f7c0339",
    "name": "Mutatio Project",
    "versions": [
      {
        "id": "aac33701-4bcf-4bf8-8056-a1fb7971e2c9",
        "name": "v1",
        "createdAt": "2025-05-16T10:40:29.255Z",
        "logs": [
          {
            "id": "d7d0818b-9511-40e3-80bf-1b58ee9cd853",
            "message": "(Example from BetterAuth) Authentication type missing on refershToken options",
            "createdAt": "2025-05-16T10:41:57.415Z"
          },
          {
            "id": "a4eac29c-4042-4a32-bfa9-b567ad259fc4",
            "message": "(Example from BetterAuth) Added c.authentication to refresh token",
            "createdAt": "2025-05-16T10:41:38.353Z"
          },
          {
            "id": "1b8918d7-33f2-45e6-b3af-3dbb40ac3c9d",
            "message": "(Example from BetterAuth) plugin: Error code support for haveibeenpwned plugin",
            "createdAt": "2025-05-16T10:41:07.589Z"
          }
        ]
      }
    ]
  }
}`}
                language="json"
            />


            <h2 className="text-2xl font-semibold">4. Displaying Changelog on Your Website</h2>
            <p className="mb-2">
                The examples below using <strong>Next.js 15</strong> with <code>Server Actions</code>:
            </p>

            <CodeBlock code={getDataCode} language="tsx" />
            <CodeBlock code={pageCode} language="tsx" />
            <CodeBlock code={listCode} language="tsx" />

            <h2 className="text-2xl font-semibold">5. Caching with React Query (Recommended)</h2>
            <p className="mb-2">
                For better performance and user experience, we recommend using <strong>React Query</strong> (TanStack Query) to cache your changelog data. This prevents unnecessary API requests on page refreshes and provides automatic background updates.
            </p>

            <CodeBlock
                code={`// Use React Query for caching
import { useQuery } from '@tanstack/react-query'

function ChangelogsList() {
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['changelogs'],
    queryFn: () => fetch('https://mutatio.vercel.app/api/public/YOUR_API_KEY')
      .then(res => res.json())
      .then(data => data.data),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading changelogs</div>

  // Render your changelog data here
  return (
    <div>
      {/* Your existing changelog rendering logic */}
    </div>
  )
}`}
                language="tsx"
            />

            <p>
                React Query provides automatic caching, background refetching, and optimistic updates, making your changelog display more efficient and responsive.
            </p>

            <p>
                Need more help? Feel free to contact us at{" "}
                <a href="mailto:support@mutatio.pro" className="text-blue-600 line-through">
                    support@mutatio.pro
                </a>.
            </p>
        </div>
    );
}
