import {useEffect, useRef, useState} from "react";
import {Button, Row} from "react-bootstrap";
import '/src/css/RfBoard/ReformCommentList.css'
import {FaTrash} from "react-icons/fa";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {checkAdminRole} from "../RfAuthorization/AdminAuth.js";


export default function ReformCommentList(){

    const [userId, setUserId] = useState("");
    const [isLoggedInId, setIsLoggedInId] = useState(''); // id가 있으면 로그인으로 가정
    const {postId} = useParams();
    const [commentId, setCommentId] = useState(1);
    const [index, setIndex] = useState(0);
    const [isAdmin, setIsAdmin] = useState(null);
    const textarea = useRef();
    const navigate = useNavigate();

    // 사용자 권한 확인
    useEffect(() => {
        if (isLoggedInId) {
            const fetchAdminRole = async () => {
                const result = await checkAdminRole(isLoggedInId, navigate);
                setIsAdmin(result === 1);
            };
            fetchAdminRole();
        }
    }, [isLoggedInId, navigate]);

    // 댓글 삭제
    const queryClient = useQueryClient()
    const deleteCommentMutation = useMutation(
        (commentId) => {
            return fetch(`http://localhost:8080/api/comments/${commentId}`,
                {method : "DELETE"}).then(response => {
                if(!response.ok){
                    throw new Error("데이터 fetch 오류 : 댓글 삭제");
                }
            })

        },{
            onSuccess : () => {
                queryClient.invalidateQueries(["comments", postId]);
            },
            onError: (error) => {
                console.error(error)
                throw new Error("댓글 삭제 실패")
            }
        }

    )

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


    const handleTextAreaSize = (textarea) => {
        if (textarea) {
            textarea.style.height = 'auto'; // 높이 초기화
            textarea.style.height = `${textarea.scrollHeight}px`; // 새 높이 설정
        }
    };


    // 댓글 불러오기
    const {data:comments = [], status, error} = useQuery(
        ["comments", postId],
        () => {
            return fetch(`http://localhost:8080/api/comments/${postId}`)
                .then(response => {
                    if(!response.ok){
                        throw new Error("데이터 fetch 오류 : 댓글 조회")
                    }
                    return response.json()
                })
        }
    )

    if (status === "error") {
        return <p>{error}</p>
    }

    if (status === "loading") {
        return <p>Loading...</p>
    }




    return (
        <>
            <hr/>
            <Row>
                <div className="commentListBox">
                    {comments && comments.length > 0 ? comments.map((comment) => (
                        <div key={comment.commentId}>
                            <div className="commentList-group" key={comment.commentId}>
                                <div className="commentList">
                                    <textarea
                                        className="userid"
                                        rows={1}
                                        cols={20}
                                        value={comment.userId}
                                        disabled
                                    />
                                    <textarea
                                        className="comment"
                                        rows={1}
                                        cols={90}
                                        ref={(el) => handleTextAreaSize(el)} // 직접 높이 조정 함수 호출
                                        value={comment.content}
                                        onInput={(e) => handleTextAreaSize(e.target)}
                                        disabled
                                    />
                                    <textarea
                                        className="createAt"
                                        rows={1}
                                        cols={30}
                                        ref={textarea}
                                        value={comment.createdAt}
                                        disabled
                                    />
                                </div>
                                {comment.userId === isLoggedInId || isAdmin ? <div className="commentDelete">
                                    <Button variant="danger">
                                        <FaTrash onClick={() => {
                                            const confirmed = confirm("댓글을 삭제하시겠습니까?");
                                            if (confirmed) {
                                                deleteCommentMutation.mutate(comment.commentId)}
                                            }
                                        }/>
                                    </Button>
                                </div> : null}
                            </div>
                            {/* 마지막 댓글이 아닐 경우에만 구분선 추가 */}
                            {index < comments.length - 1 && <hr/>}
                        </div>
                    )) :
                        <div>
                            <p>댓글이 없습니다.</p>
                        </div>
                    }
                </div>
            </Row>
        </>
    )
}