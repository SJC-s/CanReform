import {Button, CardGroup, Row} from "react-bootstrap";
import '/src/css/RfBoard/ReformCommentWrite.css'
import {FaTrash} from "react-icons/fa";
import {useCallback, useEffect, useRef} from "react";


export default function ReformCommentWrite() {

    const textarea = useRef();
    const handleTextAreaSize = useCallback(() => {
        textarea.current.style.height = 'auto'; // 이전 높이를 초기화
        textarea.current.style.height = textarea.current.scrollHeight + 'px';   // 새로운 높이 설정
    }, []);
    const reset = () => {
        textarea.current.value = "";
        handleTextAreaSize();
    }

    useEffect(() => {
        handleTextAreaSize();
    }, [handleTextAreaSize]);


    return (
        <>
            <hr/>
            <Row className="comment-box">
                <div className="comment-group">
                    <div className="input-group">
                        <textarea className="userid" rows={1} readOnly/>
                        <textarea className="commentContent" rows={1} ref={textarea} onInput={handleTextAreaSize}/>
                    </div>
                    <div className="btns">
                        <Button variant="primary">등록</Button>
                        <Button variant="danger" onClick={reset}><FaTrash/></Button>
                    </div>
                </div>
            </Row>
        </>
    )
}