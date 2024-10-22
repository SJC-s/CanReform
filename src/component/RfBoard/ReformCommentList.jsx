import {useCallback, useEffect, useRef, useState} from "react";
import {Button, Row} from "react-bootstrap";
import '/src/css/RfBoard/ReformCommentList.css'
import {FaTrash} from "react-icons/fa";


export default function ReformCommentList(){

    const [comments, setComments] = useState([]);
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
                    <div className="commentList-group">
                        <div className="commentList">
                            <textarea className="userid" rows={1} readOnly/>
                            <textarea className="comment" rows={1} ref={textarea} onInput={handleTextAreaSize}/>
                        </div>
                        <div className="commentDelete">
                            <Button variant="danger"><FaTrash/></Button>
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}