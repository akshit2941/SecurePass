// Register.js
'use client';

import { useState } from 'react';
import { auth } from '../lib/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter(); // Initialize router for navigation

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('Registration successful!');
            // Optionally redirect to the login page after successful registration
            // router.push('/login');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            // Handle registration error accordingly
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
                    >
                        Register
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <button
                        onClick={() => router.push('/login')} // Navigate to the login page
                        className="text-indigo-500 hover:underline"
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
}
