import React from 'react';

interface AlertProps {
    children: React.ReactNode;
    type: 'success' | 'error' | 'warning';
}

export default function Alert({ children, type }: AlertProps) {
    function colorType(type: 'success' | 'error' | 'warning') {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    }

    const bgColor = colorType(type);

    return (
        <div className={`absolute min-w-[300px] right-0 top-0 mt-[100px] mr-[30px] md:mr-[100px] w-fit p-2 md:p-4 ${bgColor} text-gray-950 text-center rounded-md`}>
            {children}
        </div>
    );
}
