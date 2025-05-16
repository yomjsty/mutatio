export default function TermsPage() {
    return (
        // <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto p-6 space-y-6 py-24">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p>
                By accessing or using Mutatio, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the service.
            </p>

            <h2 className="text-2xl font-semibold">1. Use of the Service</h2>
            <p>
                You may use Mutatio only in compliance with applicable laws and regulations. You are responsible for the content you publish through the service.
            </p>

            <h2 className="text-2xl font-semibold">2. API Keys</h2>
            <p>
                Each user is issued an API key to access public changelogs. Sharing or misuse of the API key is prohibited.
            </p>

            <h2 className="text-2xl font-semibold">3. Termination</h2>
            <p>
                We reserve the right to suspend or terminate your access to the service at any time, without notice or liability, for any reason.
            </p>

            <p>
                If you have questions about these terms, contact us at <a href="mailto:support@mutatio.pro" className="text-blue-600 line-through">support@mutatio.pro</a>.
            </p>
        </div>
        // </div>
    );
}
