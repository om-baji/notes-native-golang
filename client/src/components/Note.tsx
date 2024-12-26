import { useNavigate } from 'react-router-dom';

const Note = ({ title, content, id }: {
    title: string,
    content: string,
    id: number
}) => {

    const navigate = useNavigate();


    return (
        <div
            key={id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow"
            onClick={() => navigate(`/note?id=${id}`)}>

            <h3 className="text-xl font-semibold text-neutral-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-2">{content}</p>
        </div>
    )
}

export default Note
