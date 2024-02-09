
interface CommentaryProps {
    commentary?: string;
    picture?: string;
    nameCommentary?: string;
    dateCommentary?: string;
}

export default function Commentary({ commentary, picture, nameCommentary, dateCommentary }: CommentaryProps) {

    return (
        <div className="bg-[#141414] rounded-md mb-3 py-7 px-6">
            <div className="flex justify-between items-center">
                <div className="items-start">
                    <p className="text-white text-justify">
                        {commentary}
                    </p>
                    <div className="flex items-center mt-6">
                        <img src={ picture } alt="profile" className="w-12 h-12 rounded-full" />
                        <div className="ml-3">
                            <p className="text-white">{ nameCommentary }</p>
                            <p className="text-gray-500">{ dateCommentary }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}