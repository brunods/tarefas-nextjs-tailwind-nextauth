
interface TextAreaProps {
    placeholder: string;
}

interface TextAreaProps {
    placeholder: string;
    id: string; // Added 'id' property
}

export default function TextArea({ 
    placeholder,
    id, 
}: TextAreaProps) {
    return (
        <div className="w-full mt-[30px] md:mt-[50px]">
            <textarea
                className="w-full h-[150px] md:h-[200px] bg-[#1E1E1E] text-white p-[20px] rounded-md border-none outline-none resize-none"
                placeholder={placeholder}
                id={id}
            />
        </div>
    )
}