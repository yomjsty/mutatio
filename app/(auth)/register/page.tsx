"use client";

import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6">
                    Register to LinkFuse
                </h1>
                <button
                    onClick={async () => {
                        await authClient.signIn.social({
                            provider: "github",
                        });
                    }}
                    className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition text-lg w-full"
                >
                    Sign in with GitHub
                </button>
            </div>
        </main>
    );
}
