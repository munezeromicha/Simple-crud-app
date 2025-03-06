import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Model from "@/public/images/Model.png"
const SignupForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            router.push('/login?success=Account created successfully! Please sign in.');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white">
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
                <img
                    src={Model.src}
                    alt="Business owner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-16 left-0 right-0 text-center text-white p-4">
                    <h2 className="text-2xl font-medium mb-2">No Hazzles</h2>
                    <p className="text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </p>
                </div>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
                <div className="max-w-md w-full">
                    <h1 className="text-3xl font-bold text-blue-900 mb-4">Create your free account</h1>

                    <div className="mb-4">
                        <span className="text-gray-600">Already registered? </span>
                        <Link href="/login">
                            <span className="text-green-500 hover:text-green-600 cursor-pointer">Sign in</span>
                        </Link>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="firstName" className="block text-gray-600 mb-1">
                                First Name
                            </label>
                            <div className="relative">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Joshua"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="lastName" className="block text-gray-600 mb-1">
                                Last Name
                            </label>
                            <div className="relative">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Bakare"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-600 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="josh.bakery@gmail.com"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-gray-400">@</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label htmlFor="password" className="block text-gray-600 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="************"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {showPassword ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 text-lg font-medium"
                        >
                            {loading ? 'Creating account...' : 'Continue'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            By signing up, you agree to our{' '}
                            <Link href="/terms">
                                <span className="text-green-500 hover:text-green-600 cursor-pointer">Terms</span>
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy">
                                <span className="text-green-500 hover:text-green-600 cursor-pointer">Privacy Policy</span>
                            </Link>
                        </p>
                    </div>

                    <div className="mt-4 text-right text-xs text-gray-500">
                        © 2019 Tinylabs. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;