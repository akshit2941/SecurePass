import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Password Security App</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/login">
                <span className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors">
                  Login
                </span>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <span className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors">
                  Register
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
