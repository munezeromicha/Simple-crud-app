import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import EmployeeList from '../../components/Employees/EmployeeList';
import EmployeeForm from '../../components/Employees/EmployeeForm';

export default function EmployeesPage() {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchEmployees = async () => {
        if (!session?.user?.id) {
            console.log('Session check failed:', { session, status });
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch('/api/employees', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Response not OK:', { status: response.status, data });
                if (response.status === 401) {
                    setError('Session expired. Please login again.');
                    await signOut({ callbackUrl: '/login' });
                    return;
                }
                throw new Error(data.message || 'Failed to fetch employees');
            }

            setEmployees(data.employees || []);
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            console.log('Authenticated session found:', session);
            fetchEmployees();
        }
    }, [session, status]);

    const handleAddEmployee = async (employeeData) => {
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.user?.id}`,
                },
                credentials: 'include',
                body: JSON.stringify(employeeData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add employee');
            }

            await fetchEmployees();
            setShowAddForm(false);
        } catch (error) {
            console.error('Add employee error:', error);
            throw new Error(error.message);
        }
    };

    const handleEditEmployee = async (employeeData) => {
        if (!session?.user?.id) {
            setError('No active session found');
            router.push('/login');
            return;
        }

        try {
            const response = await fetch(`/api/employees/${editingEmployee._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(employeeData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Session expired. Please login again.');
                    await signOut({ callbackUrl: '/login' });
                    return;
                }
                setError(data.message || 'Failed to update employee');
                return;
            }

            await fetchEmployees();
            setEditingEmployee(null);
        } catch (error) {
            console.error('Edit employee error:', error);
            setError(error.message);
        }
    };

    const handleDeleteEmployee = async (employeeId) => {
        if (!session?.user?.id) {
            setError('No active session found');
            router.push('/login');
            return;
        }

        try {
            const response = await fetch(`/api/employees/${employeeId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Session expired. Please login again.');
                    await signOut({ callbackUrl: '/login' });
                    return;
                }
                setError(data.message || 'Failed to delete employee');
                return;
            }

            await fetchEmployees();
        } catch (error) {
            console.error('Delete employee error:', error);
            setError(error.message);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                    {error}
                </div>
                <button
                    onClick={() => router.push('/login')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Return to Login
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-800">Employees</h1>
                <button
                    onClick={() => {
                        setShowAddForm(!showAddForm);
                        setEditingEmployee(null);
                    }}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                    {showAddForm ? 'Cancel' : 'Add New'}
                </button>
            </div>

            {(showAddForm || editingEmployee) && (
                <div className="mb-8">
                    <EmployeeForm
                        onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
                        initialData={editingEmployee}
                        formType={editingEmployee ? 'edit' : 'create'}
                    />
                </div>
            )}

            <EmployeeList
                employees={employees}
                onEdit={(employee) => {
                    setEditingEmployee(employee);
                    setShowAddForm(false);
                }}
                onDelete={handleDeleteEmployee}
            />
        </div>
    );
}