import { HTMLProps } from "react";

export default function TextArea({...props}: HTMLProps<HTMLTextAreaElement>) {
    return (
        <div className="w-full mt-[30px] md:mt-[50px]">
            <textarea
                className="w-full h-[150px] md:h-[200px] bg-[#1E1E1E] text-white p-[20px] rounded-md border-none outline-none resize-none"
                {...props}
            />
        </div>
    )
}