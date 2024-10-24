import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import '../../css/RfBoard/ReformDetail.css'
import ReformCommentWrite from "./ReformCommentWrite.jsx";
import ReformCommentList from "./ReformCommentList.jsx";
import {useEffect, useRef, useState} from "react";
import axios from 'axios'; // HTTP 요청을 기본적으로 비동기로 수행하기 위해 자바스크립트에서 널리 사용되는 라이브러리

export default function ReformDetail({ isLoggedInId }) {
    const { post } = useLocation().state || {}; // location.state에서 post를 가져옴
    const navigate = useNavigate();
    const [currentPost, setCurrentPost] = useState(post);

    // useRef로 API 호출 여부를 추적하기 위한 플래그 설정
    const hasFetchedPost = useRef(false);

    useEffect(() => {
        if (!post) {
            // 게시글 정보가 없으면 목록으로 이동
            navigate('/posts');
        }
    }, [post, navigate]);

    useEffect(() => {
        if (!post) {
            // 게시글 정보가 없으면 목록으로 이동
            navigate('/posts');
        } else if (!hasFetchedPost.current) {
            // 플래그가 false일 때만 API 호출
            hasFetchedPost.current = true; // 플래그 설정
            // 서버로부터 조회된 게시글 정보 가져오기 (조회수 증가 포함)
            const fetchPostDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/posts/${post.postId}`);
                    setCurrentPost(response.data); // 서버에서 가져온 데이터로 업데이트
                } catch (error) {
                    console.error("게시글 정보를 불러오는 중 오류 발생:", error);
                    alert("게시글 정보를 불러오는 중 오류가 발생했습니다.");
                    navigate('/posts');
                }
            };
            fetchPostDetail();
        }
    }, [post, navigate]);

    if (!post) {
        return <p>게시글 정보를 불러올 수 없습니다.</p>;
    }

    // 허용된 이미지 파일 확장자 목록
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    // 확장자 확인 함수
    const isValidImage = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        return allowedExtensions.includes(extension);
    };



    // 게시글 삭제 함수
    const handleDelete = async () => {
        if (currentPost.userId !== isLoggedInId) {
            alert("이 게시글을 삭제할 권한이 없습니다.");
            return;
        }
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                // 인증 토큰 가져오기 (예: localStorage에서)
                const token = localStorage.getItem('token');
                if (!token) {
                    alert("인증 정보가 없습니다. 로그인 후 다시 시도하세요.");
                    return;
                }

                // 삭제 요청 시 헤더에 인증 토큰 추가
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                await axios.delete(`http://localhost:8080/api/posts/${currentPost.postId}`, config);
                alert("게시글이 삭제되었습니다.");
                navigate('/posts');
            } catch (error) {
                console.error("게시글 삭제 중 오류 발생:", error);
                alert("게시글 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    // 게시글 수정 페이지로 이동
    const handleEdit = () => {
        if (currentPost.userId !== isLoggedInId) {
            alert("이 게시글을 수정할 권한이 없습니다.");
            return;
        }
        navigate(`/posts/edit/${currentPost.postId}`, { state: { post: currentPost } });
    };


    return (
        <Container className='detail-container' fluid style={{padding: "0px", marginTop: "10px", marginBottom: "10px"}}>
            <Row>
                <Col className="text-start" md={12}>
                    <Card style={{padding: '0px'}}>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <h2>{currentPost.title}</h2>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Header>
                            <Row className="mt-2">
                                <Col md={2}>
                                    <p><strong>카테고리:</strong> {currentPost.category === 'Inquiry' ? '문의' : '의뢰'}</p>
                                </Col>
                                <Col>
                                    <p><strong>상태: {currentPost.status}</strong></p>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Header>
                            <Row>
                                <Col md={2}><p><strong>작성자:</strong> {currentPost.userId}</p></Col>
                                <Col><p><strong>작성일:</strong> {new Date(currentPost.createdAt).toLocaleDateString()}</p></Col>
                                <Col><p><strong>조회수:</strong> {currentPost.readCount}</p></Col>
                                <Col><p><strong>공개 여부:</strong> {currentPost.isPrivate === 'Y' ? '공개' : '비공개'}</p></Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <p><strong>설명</strong></p>
                                    <p>{currentPost.content}</p>
                                    <hr/>
                                </Col>
                            </Row>
                            {/* 파일 링크 */}
                            {currentPost.filenames && currentPost.filenames.length > 0 && (
                                <div>
                                    <h5>첨부 사진(클릭시 다운로드)</h5>
                                    <Row>
                                        {currentPost.filenames.split(',').map((filename, index) => (
                                            <Col key={index} md={4} className="mb-3">
                                                {isValidImage(filename) && (
                                                    <div>
                                                        <a href={`http://localhost:8080/api/posts/download/${filename}`}
                                                           target="_blank" rel="noopener noreferrer">
                                                            <img
                                                                src={`http://localhost:8080/api/posts/download/${filename}`}
                                                                alt={`첨부 이미지 미리보기 ${index + 1}`}
                                                                style={{maxWidth: "100%", marginTop: "10px"}}
                                                            />
                                                        </a>
                                                    </div>
                                                )}
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Button variant="secondary" onClick={() => window.history.back()}>목록으로</Button>
                                </div>
                                <div className="control-button">
                                    <Button variant="primary" className="mr-2" onClick={handleEdit}>수정</Button>
                                    <Button variant="danger" onClick={handleDelete}>삭제</Button>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <ReformCommentList/>
            <ReformCommentWrite/>
        </Container>
    );

}