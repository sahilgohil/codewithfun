"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "lucide-react";

const Auth: React.FC = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    if (loading) {
        return <div className="text-sm text-gray-500">Loading...</div>;
    }

    return (
        <div className="flex items-center gap-4">
            {session?.user ? (
                <div className="flex items-center gap-2 text-gray-300">
                    <User size={18} />
                    <span className="text-sm font-medium">{session.user.email}</span>
                    <button
                        onClick={() => signOut()}
                        className="ml-2 text-xs text-red-400 hover:text-red-300 hover:underline"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    href="/login"
                    className="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    Login
                </Link>
            )}
        </div>
    );
};

export default Auth;
