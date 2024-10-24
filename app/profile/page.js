'use client';

import { useEffect, useState } from 'react';
import { auth } from '../lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState([]);
    const router = useRouter(); // For navigation

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                await fetchFailedAttempts(); // Fetch failed attempts when the user is authenticated
            } else {
                router.push('/login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe(); // Clean up the subscription on unmount
    }, [router]);

    // Fetch failed attempts from the API
    const fetchFailedAttempts = async () => {
        try {
            const response = await fetch('/api/getFailedAttempts'); // Adjust this to your API route
            const data = await response.json();

            // Check if the response has attempts
            if (data.attempts) {
                setFailedAttempts(data.attempts);
            } else {
                console.error('Failed attempts data is not valid:', data);
            }
        } catch (error) {
            console.error('Error fetching failed attempts:', error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
                <p className="mb-4">Welcome, {user.displayName || user.email}!</p>
                <p>Email: {user.email}</p>
                <p>UID: {user.uid}</p>

                {/* Display failed login attempts */}
                <h2 className="text-xl font-semibold mt-6">Failed Login Attempts:</h2>
                <ul>
                    {failedAttempts.length > 0 ? (
                        failedAttempts.map((attempt, index) => (
                            <li key={index} className="mt-2">
                                <p>Email: {attempt.email}</p>
                                <p>Attempted Password: {attempt.attemptedPassword}</p>
                                <p>Time: {attempt.time}</p>
                            </li>
                        ))
                    ) : (
                        <p>No failed login attempts.</p>
                    )}
                </ul>

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
