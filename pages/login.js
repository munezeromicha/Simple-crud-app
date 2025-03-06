import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LoginForm from '../components/Auth/LoginForm';

export default function Login() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { success } = router.query;

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/employees');
        }
    }, [status, router]);

    if (status === 'authenticated') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {success && (
                <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-md">
                    {success}
                </div>
            )}
            <LoginForm />
        </div>
    );
}