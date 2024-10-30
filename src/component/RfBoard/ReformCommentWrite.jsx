import {Button, Row} from "react-bootstrap";
import '/src/css/RfBoard/ReformCommentWrite.css'
import {FaUndo} from "react-icons/fa";
import {useCallback, useEffect, useRef, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function ReformCommentWrite() {

    const { postId, announcementId } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    // 댓글 작성 mutation
    const queryClient = useQueryClient();
    const writeCommentMutation = useMutation(
        (comment) => {
            const endpoint = `http://localhost:8080/api/comments`;
            const params = postId ? `/postComments?postId=${postId}` : `/announcementComments?announcementId=${announcementId}`; // ID를 쿼리 파라미터로 추가
            return fetch(`${endpoint}${params}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(comment),
            }).then(response => {
                if (!response.ok) {
                    throw new Error("데이터 fetch 오류 : 댓글 쓰기");
                }
                return response.json();
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments", postId || announcementId]); // ID에 따라 쿼리 무효화
                resetTextBox(); // 댓글 작성 후 텍스트 박스 초기화
            },
            onError: (error) => {
                console.error(error);
                throw new Error("댓글 쓰기 실패");
            }
        }
    );

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                let response;
                if (postId) {
                    response = await fetch(`http://localhost:8080/api/comments/postComments/${postId}`);
                } else if (announcementId) {
                    response = await fetch(`http://localhost:8080/api/comments/announcementComments/${announcementId}`);
                } else {
                    throw new Error("No ID provided");
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch comments");
                }

                const data = await response.json();
                setComments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, announcementId]);

    // 댓글 작성 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!commentText) return alert("댓글을 작성해주세요.");

        const commentData = {
            content : commentText,
            userId : isLoggedInId,
            postId, // postId가 있으면 여기에 추가
            announcementId // announcementId가 있으면 여기에 추가
        };

        writeCommentMutation.mutate(commentData);
        setCommentText(""); // 작성 후 입력창 비우기
    };

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
                                disabled
                            />
                        </div>
                    </div>}
                    </Row>
                    </>
                    )
                }