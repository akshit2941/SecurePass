// Profile.js
'use client';

import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter(); // For navigation

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, [router]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
                <p className="mb-4">Welcome, {user.displayName || user.email}!</p>
                <p>Email: {user.email}</p>
                <p>UID: {user.uid}</p>
                {/* Add more user info if needed */}
                <button
                    onClick={() => {
                        auth.signOut(); // Sign out the user
                        router.push('/login'); // Redirect to login
                    }}
                    className="mt-4 w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
