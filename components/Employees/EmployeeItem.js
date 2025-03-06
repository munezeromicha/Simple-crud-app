const EmployeeItem = ({ employee, onEdit, onDelete }) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {employee.firstName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.lastName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {employee.role}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    onClick={onEdit}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="text-red-600 hover:text-red-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
        </tr>
    );
};

export default EmployeeItem;