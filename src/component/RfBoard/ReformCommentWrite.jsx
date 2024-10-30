import {Button, Row} from "react-bootstrap";
import '/src/css/RfBoard/ReformCommentWrite.css'
import {FaUndo} from "react-icons/fa";
import {useCallback, useEffect, useRef, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // 게시판 컴포넌트

export default function ReformCommentWrite() {

    const {postId} = useParams();
    const [userId, setUserId] = useState("");
    const [commentText, setCommentText] = useState("");
    const textarea = useRef();
    const [isLoggedInId, setIsLoggedInId] = useState(''); // id가 있으면 로그인으로 가정
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
    }, [handleTextAreaSize, commentText]);


    // 인증정보 가져오기
    useEffect(() => {
        // 로그인 여부 확인 (예: 로컬 스토리지에 토큰이 있는지 확인)
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setIsLoggedInId(decoded.sub); // 백엔드에서 JWT에 userId를 클레임으로 포함시켰다고 가정
            setUserId(decoded.sub);
        }
    }, []);

    const resetTextBox = () => {
        setCommentText(""); // 댓글창 초기화
        handleTextAreaSize(); // 댓글창 크기 초기화
    }

    // 댓글 쓰기
    const queryClient = useQueryClient()
    const writeCommentMutation = useMutation(
        (comment) => {
            return fetch(`http://localhost:8080/api/comments`,
                {
                    method : "POST",
                    headers : {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body : JSON.stringify(comment),
                }).then(response => {
                if(!response.ok){
                    throw new Error("데이터 fetch 오류 : 댓글 쓰기");
                }
                return response.json();
            });
        },{
            onSuccess : () => {
                queryClient.invalidateQueries(["comments", postId]);
                resetTextBox();
            },
            onError: (error) => {
                console.error(error)
                throw new Error("댓글 쓰기 실패")
            }
        }

    )

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            postId : postId,
            userId : userId,
            content : commentText
        }
        console.log("postId : " + postId);
        console.log("userId : " + userId);
        console.log("comment : " + commentText);
        writeCommentMutation.mutate(comment);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 줄바꿈 방지
            handleSubmit(e); // 댓글 제출
        }
    };

    return (
        <>
            <hr/>
            <Row className="comment-box">
                {isLoggedInId ?
                    <div className="comment-group">
                        <div className="input-group">
                        <textarea
                            className="userid"
                            rows={1}
                            cols={18}
                            value={isLoggedInId}
                            disabled/>
                            <textarea
                                className="commentContent"
                                rows={1}
                                cols={88}
                                ref={textarea}
                                value={commentText}
                                onKeyDown={handleKeyDown}
                                onInput={handleTextAreaSize}
                                onChange={(e) => {
                                    setCommentText(e.target.value)
                                }}
                                placeholder="댓글을 입력해주세요."
                            />
                        </div>
                        <div className="btns">
                            <Button variant="primary" onClick={handleSubmit}>등록</Button>
                            <Button variant="danger" onClick={reset}><FaUndo/></Button>
                        </div>
                    </div>
                    : <div className="comment-group">
                        <div className="input-group">
                        <textarea
                            className="userid"
                            rows={1}
                            cols={18}
                            value={""}
                            disabled/>
                            <textarea
                                className="commentContent"
                                rows={1}
                                cols={88}
                                ref={textarea}
                                value={"로그인 후 댓글 작성이 가능합니다."}
                                onKeyDown={handleKeyDown}
                                onInput={handleTextAreaSize}
                                onChange={(e) => {
                                    setCommentText(e.target.value)
                                }}
                                placeholder="댓글을 입력해주세요."
                                disabled
                            />
                        </div>
                    </div>}
                    </Row>
                    </>
                    )
                }