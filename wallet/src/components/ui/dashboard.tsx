export function Avatar({ src, alt }: { src: string; alt: string }) {
    return (
        <img
            className="w-10 h-10 rounded-full border-2 border-gray-200"
            src={src}
            alt={alt}
        />
    );
}

// Button Component
export function Button({ children, variant, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) {
    const baseStyles = "px-4 py-2 rounded font-medium transition";
    const variants = {
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        default: "bg-blue-600 text-white hover:bg-blue-700",
    };

    return (
        <button className={`${baseStyles} ${variants[variant as keyof typeof variants || "default"]}`} {...props}>
            {children}
        </button>
    );
}

// Card Components
export function Card({ children }: { children: React.ReactNode }) {
    return <div className="bg-white shadow rounded-lg">{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
    return <div className="p-4 border-b">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="p-4">{children}</div>;
}

// Table Components
export function Table({ children }: { children: React.ReactNode }) {
    return <table className="w-full text-sm">{children}</table>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead>{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="border-t">{children}</tr>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
    return <th className="px-4 py-2 text-left bg-gray-50">{children}</th>;
}

export function TableCell({ children }: { children: React.ReactNode }) {
    return <td className="px-4 py-2">{children}</td>;
}
