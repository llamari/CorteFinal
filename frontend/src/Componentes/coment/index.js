import { AiOutlineLike } from "react-icons/ai";
import './index.css'
import { useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { MdOutlineStar } from "react-icons/md";

const Coment = (props) => {
    const [liked, setLiked] = useState(false);

    const LikeComment = async (commentId) => {
        const token = localStorage.getItem('token');
        try {
            if (liked) return; // Evita múltiplos likes
            const response = await axios.post(`http://localhost:5000/comments/like/${commentId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setLiked(true);
            }
        } catch (error) {
            console.error('Erro ao curtir comentário:', error);
        }
    };

    return (
        <div>
            <div className='comment'>
                <div className="comment-header">
                    <p>{props.author}</p>

                    <p>
                        <Rating 
                        name="read-only" 
                        value={props.rating} 
                        readOnly
                        precision={0.5}
                        emptyIcon={<MdOutlineStar style={{ color: "rgb(74, 67, 117)" }} />}
                        />
                    </p>
                </div>

                <div className="comment-content">
                    <p>{props.coment}</p>
                </div>

                <div>
                    <div
                        style={{ color: liked ? "#00B37E" : "#e7e5f3", display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => LikeComment(props.id)}
                    >
                        <AiOutlineLike
                            size={20}
                            style={{ fontWeight: 'bold', marginRight: '.5rem' }}
                        />
                        <p>Aplaudir • {liked ? props.likes + 1 : props.likes}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coment;