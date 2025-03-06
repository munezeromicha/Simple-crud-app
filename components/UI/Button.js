const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    fullWidth = false,
    className = ""
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case "primary":
                return "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500";
            case "secondary":
                return "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500";
            case "danger":
                return "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
            case "outline":
                return "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500";
            default:
                return "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500";
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return "py-1 px-3 text-sm";
            case "md":
                return "py-2 px-4 text-base";
            case "lg":
                return "py-3 px-6 text-lg";
            default:
                return "py-2 px-4 text-base";
        }
    };

    const baseClasses = "rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50";
    const widthClass = fullWidth ? "w-full" : "";

    const buttonClasses = `${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${widthClass} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </button>
    );
};

export default Button;