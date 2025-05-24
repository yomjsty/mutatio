import Link from "next/link";

export default function AboutPage() {
    return (
        // <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto p-6 space-y-6 py-24">
            <h1 className="text-3xl font-bold">About Mutatio</h1>
            <p>
                Mutatio is a simple, developer-friendly changelog manager for your projects. Whether you&apos;re building software solo or in a team, Mutatio helps you document changes clearly and consistently.
            </p>

            <h2 className="text-2xl font-semibold">Why Mutatio?</h2>
            <ul className="list-disc list-inside">
                <li>Track version history for any project</li>
                <li>Publish changelogs via API or share them with your team</li>
                <li>Simple UI for managing updates</li>
                <li>Public/private project visibility</li>
            </ul>

            <h2 className="text-2xl font-semibold">Who is it for?</h2>
            <p>
                Developers, indie hackers, open source maintainers, or anyone who needs to document their product changes in a structured way.
            </p>

            <p>
                Built with ❤️ using Next.js 15 and made for the modern web.
            </p>

            <Link href="https://akbarknawan.vercel.app/" target="_blank" className="text-blue-600">
                See my other projects
            </Link>
        </div>
        // </div>
    );
}
