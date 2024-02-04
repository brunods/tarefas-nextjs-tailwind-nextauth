import { ReactNode } from 'react';

export default function ButtonPrimary({ children }: { children: ReactNode }) {
    return (
        <button className="w-full bg-blue-800 text-white py-3 px-6 rounded-md font-bold text-lg hover:bg-blue-900 transition-all duration-700">
            {children}
        </button>
    )
}