// "use client";

// import { useChangelogs } from "@/hooks/use-changelogs";

// interface Project {
//     id: string;
//     name: string;
//     versions: Array<{
//         id: string;
//         name: string;
//         createdAt: string;
//         logs: Array<{
//             id: string;
//             message: string;
//             createdAt: string;
//         }>;
//     }>;
// }

// export default function ChangelogList({ apiKey }: { apiKey: string }) {
//     const { data: project, isLoading, error } = useChangelogs(apiKey);

//     if (isLoading) return <div><div className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-6 animate-pulse">
//         <div className="h-6 bg-gray-300 rounded w-1/3" />
//         <div className="space-y-4 pl-4 border-l-4 border-indigo-300">
//             <div className="h-5 bg-gray-200 rounded w-1/4" />
//             <ul className="space-y-2 pl-4 list-disc">
//                 <li className="h-4 bg-gray-200 rounded w-2/3" />
//                 <li className="h-4 bg-gray-200 rounded w-1/2" />
//             </ul>
//         </div>
//     </div></div>;
//     if (error) return <div>Failed to load changelogs.</div>;

//     return (
//         <div className="space-y-8">
//             <div key={project.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
//                 <h2 className="text-xl font-bold mb-3">{project.name} Project</h2>
//                 {project.versions.map((version: Project['versions'][number]) => (
//                     <div key={version.id} className="mb-6 pl-4 border-l-4 border-indigo-500">
//                         <h3 className="text-lg font-semibold mb-2">
//                             {version.name} - {new Date(version.createdAt).toLocaleDateString("en-US", {
//                                 year: "numeric", month: "short", day: "numeric",
//                             })}
//                         </h3>

//                         <ul className="list-disc space-y-1 pl-6">
//                             {version.logs.map((log) => (
//                                 <li key={log.id} className="text-gray-700">
//                                     <p>{log.message}</p>
//                                     <small className="text-xs text-gray-500">
//                                         {new Date(log.createdAt).toLocaleDateString("en-US", {
//                                             year: "numeric", month: "short", day: "numeric",
//                                         })}
//                                     </small>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

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
    const project = use(changeLogsPromise); // satu project, bukan array

    return (
        <div className="space-y-8">
            <div key={project.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                <h2 className="text-xl font-bold mb-3">{project.name} Project</h2>

                {project.versions.map((version) => (
                    <div key={version.id} className="mb-6 pl-4 border-l-4 border-indigo-500">
                        <h3 className="text-lg font-semibold mb-2">{version.name} - {new Date(version.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}</h3>

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
