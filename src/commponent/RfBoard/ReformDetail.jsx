import { useState, useEffect } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from "react-bootstrap";

export default function ReformDetail() {
    const { post, username } = useLocation().state || {}; // location.state에서 post와 username을 가져옴

    if (!post) {
        return <p>게시글 정보를 불러올 수 없습니다.</p>;
    }

   /* const { post_id } = useParams(); // URL에서 postId를 가져옴
    const [postDetail, setPostDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 게시글 상세 정보 API 호출
        const fetchPostDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${postId}`);
                const data = await response.json();
                setPostDetail(data);
                setLoading(false);
            } catch (error) {
                console.error('게시글을 불러오는 중 오류 발생:', error);
            }
        };

        fetchPostDetail();
    }, [post_id]);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className="container">
            <h2>{postDetail.title}</h2>
            <p>작성자: {postDetail.username}</p>
            <p>{postDetail.content}</p>
            <p>작성일: {new Date(postDetail.created_at).toLocaleDateString()}</p>
            <p>조회수: {postDetail.readCount}</p>
            <p>댓글수: {postDetail.commentCount}</p>
        </div>
    );*/

    return (
        <Container fluid style={{padding: "0px", marginTop:"10px", marginBottom:"10px"}}>
            <Row>
                <Col className="text-start" md={12}>
                    <Card style={{padding:'0px'}}>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <h2>{post.title}</h2>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Header>
                            <Row className="mt-2">
                                <Col md={2}>
                                    <p><strong>카테고리:</strong> {post.category === 'Inquiry' ? '문의' : '의뢰'}</p>
                                </Col>
                                <Col>
                                    <p><strong>상태: {post.status}</strong></p>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Header>
                            <Row>
                                <Col md={2}><p><strong>작성자:</strong> {username}</p></Col>
                                <Col><p><strong>작성일:</strong> {new Date(post.created_at).toLocaleDateString()}</p></Col>
                                <Col><p><strong>조회수:</strong> {post.readCount}</p></Col>
                                <Col><p><strong>공개 여부:</strong> {post.is_private === 'Y' ? '비공개' : '공개'}</p></Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <p><strong>설명</strong></p>
                                    <p>{post.content}</p>
                                    <hr/>
                                </Col>
                            </Row>

                            {/* 파일 링크 */}
                            {post.filenames && (
                                <div>
                                    <h5>첨부 사진</h5>
                                    <a href={`/upload/${post.filenames}`} download>{post.filenames}</a>
                                </div>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Button variant="secondary" onClick={() => window.history.back()}>목록으로</Button>
                                </div>
                                <div>
                                    <Button variant="primary" className="mr-2">수정</Button>
                                    <Button variant="danger">삭제</Button>
                                </div>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}
