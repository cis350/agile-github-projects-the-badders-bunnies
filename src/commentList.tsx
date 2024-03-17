import React, { useState, ChangeEvent, MouseEvent } from 'react';

type CommentListProps = {
}

let next_id = 0;

const CommentList: React.FC<CommentListProps> = () => {
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);

    return (
        <div style = { { width:'100%' } }>
            <ul>
                {comments.map(comment => (
                <li key = { comment.id }> { comment.text } </li>
                ))}
            </ul>
            <textarea
                value = { text }
                onChange = { e => setText(e.target.value) }
                style = { { width:'100%', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;' } }
            />
            <button onClick={
                () => {
                    setComments([
                        ...comments,
                        { id: next_id++, text: text }
                    ]);
                }
            }>Add</button>
        </div>
    );
}

export default CommentList;