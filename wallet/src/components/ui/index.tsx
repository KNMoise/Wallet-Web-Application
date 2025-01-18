export function Button({ children, className, ...props }: any) {
    return (
        <button
            className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export function Input({ className, ...props }: any) {
    return (
        <input
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 ${className}`}
            {...props}
        />
    );
}
