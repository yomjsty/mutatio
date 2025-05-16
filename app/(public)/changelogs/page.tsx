// import ChangelogList from "./changelog-list";

// export default function ChangelogsPage() {
//     const apiKey = process.env.NEXT_PUBLIC_MUTATIO_API_KEY!;

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-bold mb-4">Mutatio Changelogs</h2>
//             <ChangelogList apiKey={apiKey} />
//         </div>
//     );
// }

import React, { Suspense } from 'react';
import ChangelogsList from "./changelog-list";
import { getData } from "@/lib/changelog-utils";

export default async function ChangelogsPage() {
    const changeLogsPromise = getData();

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Mutatio Changelogs</h2>
            <Suspense fallback={
                <div className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-6 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-1/3" />
                    <div className="space-y-4 pl-4 border-l-4 border-indigo-300">
                        <div className="h-5 bg-gray-200 rounded w-1/4" />
                        <ul className="space-y-2 pl-4 list-disc">
                            <li className="h-4 bg-gray-200 rounded w-2/3" />
                            <li className="h-4 bg-gray-200 rounded w-1/2" />
                        </ul>
                    </div>
                </div>
            }>
                <ChangelogsList changeLogsPromise={changeLogsPromise} />
            </Suspense>
        </div>
    );
}
