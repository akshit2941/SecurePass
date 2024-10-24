// Login.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { auth } from '../lib/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter(); // Initialize the router

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Login successful!');
            // Redirect to the profile page
            router.push('/profile'); // Redirect after successful login
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            // Log the failed attempt
            await logFailedAttempt(email, password);
        }
    };

    const logFailedAttempt = async (attemptedEmail, attemptedPassword) => {
        try {
            await fetch('/api/logFailedAttempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    attemptedEmail, // This is already correct
                    attemptedPassword,
                }),
            });
        } catch (logError) {
            console.error('Failed to log attempt:', logError);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
                    >
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
}
