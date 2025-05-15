"use client";

import Link from "next/link";
import { Github, Mail, ArrowLeft, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const handleSocialLogin = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
            errorCallbackURL: "/error",
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to home
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-4">
                                <div className="size-12 rounded-xl bg-black flex items-center justify-center">
                                    <span className="text-white text-lg font-bold">
                                        M
                                    </span>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold">
                                Welcome to Mutatio.pro
                            </h1>
                            <p className="text-gray-500 mt-2">
                                Sign in to manage your changelogs
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full justify-start text-base font-normal h-12"
                                onClick={() => handleSocialLogin()}
                            >
                                <Github className="mr-3 h-5 w-5" />
                                Continue with GitHub
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start text-base font-normal h-12"
                                disabled
                            >
                                <svg
                                    className="mr-3 h-5 w-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                    <path d="M1 1h22v22H1z" fill="none" />
                                </svg>
                                Continue with Google
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start text-base font-normal h-12"
                                disabled
                            >
                                <Twitter className="mr-3 h-5 w-5" />
                                Continue with Twitter
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-2 text-sm text-gray-500">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full justify-start text-base font-normal h-12"
                                disabled
                            >
                                <Mail className="mr-3 h-5 w-5" />
                                Continue with Email
                            </Button>
                        </div>
                    </div>

                    {/* <div className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-black hover:underline"
                        >
                            Sign up
                        </Link>
                    </div> */}
                </div>
            </div>

            <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-100">
                <div className="container mx-auto">
                    <p>
                        © {new Date().getFullYear()} Mutatio.pro. All rights
                        reserved.
                    </p>
                    <div className="mt-2 flex justify-center space-x-4">
                        <Link href="/terms" className="hover:underline">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:underline">
                            Privacy
                        </Link>
                        <Link href="/help" className="hover:underline">
                            Help
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
