export default function PrivacyPage() {
    return (
        // <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto p-6 space-y-6 py-24">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p>
                Your privacy is important to us. This privacy policy explains how we collect, use, and protect your data when you use Mutatio.
            </p>

            <h2 className="text-2xl font-semibold">1. Data We Collect</h2>
            <p>
                We collect information you provide directly, such as your email and project details. We may also collect usage data for analytics and improvement.
            </p>

            <h2 className="text-2xl font-semibold">2. How We Use Data</h2>
            <p>
                We use your data to provide and improve our service, personalize your experience, and communicate with you.
            </p>

            <h2 className="text-2xl font-semibold">3. Sharing and Disclosure</h2>
            <p>
                We do not sell your data. We may share data with third-party providers to operate the service (e.g., database, hosting).
            </p>

            <h2 className="text-2xl font-semibold">4. Public Projects</h2>
            <p>
                If your project is marked as <strong>public</strong>, its changelogs may be visible to anyone with access to the public API or shared links.
            </p>

            <p>
                For questions, contact us at <a href="mailto:privacy@mutatio.pro" className="text-blue-600 line-through">privacy@mutatio.pro</a>.
            </p>
        </div>
        // </div>
    );
}
