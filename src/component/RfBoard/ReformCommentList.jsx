import {useCallback, useEffect, useRef, useState} from "react";
import {Button, Row} from "react-bootstrap";
import '/src/css/RfBoard/ReformCommentList.css'
import {FaTrash} from "react-icons/fa";


export default function ReformCommentList(){

    const [comments, setComments] = useState([
        // 테스트용 댓글 데이터
        { commentId: 1, postId: 76, userId: "eee", content: "aaaaa" },
        { commentId: 2, postId: 76, userId: "ddd", content: "bbbb" }
    ]);
    const [index, setIndex] = useState(0);
    const textarea = useRef();
    const handleTextAreaSize = useCallback(() => {
        textarea.current.style.height = 'auto'; // 이전 높이를 초기화
        textarea.current.style.height = textarea.current.scrollHeight + 'px';   // 새로운 높이 설정
    }, []);

    useEffect(handleTextAreaSize, [textarea]);

    return (
        <>
            <hr/>
            <Row>
                <div className="commentListBox">
                    {comments.map((comment) => (
                        <div key={comment.commentId}>
                            <div className="commentList-group" key={comment.commentId}>
                                <div className="commentList">
                                    <textarea className="userid" rows={1} value={comment.userId} disabled/>
                                    <textarea
                                        className="comment"
                                        rows={1}
                                        ref={textarea}
                                        value={comment.content}
                                        onInput={handleTextAreaSize}
                                        disabled
                                    />
                                </div>
                                <div className="commentDelete">
                                    <Button variant="danger">
                                        <FaTrash/>
                                    </Button>
                                </div>
                            </div>
                            {/* 마지막 댓글이 아닐 경우에만 구분선 추가 */}
                            {index < comments.length - 1 && <hr />}
                        </div>
                    ))}
                </div>
            </Row>
        </>
    )
}