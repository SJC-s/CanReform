import {useLocation} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import '../../css/RfBoard/ReformDetail.css'
import ReformCommentWrite from "./ReformCommentWrite.jsx";
import ReformCommentList from "./ReformCommentList.jsx";

export default function ReformDetail() {
    const { post } = useLocation().state || {}; // location.state에서 post를 가져옴

    if (!post) {
        return <p>게시글 정보를 불러올 수 없습니다.</p>;
    }

    return (
        <Container className='detail-container' fluid style={{padding: "0px", marginTop: "10px", marginBottom: "10px"}}>
            <Row>
                <Col className="text-start" md={12}>
                    <Card style={{padding: '0px'}}>
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
                                <Col md={2}><p><strong>작성자:</strong> {post.userId}</p></Col>
                                <Col><p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleDateString()}</p></Col>
                                <Col><p><strong>조회수:</strong> {post.readCount}</p></Col>
                                <Col><p><strong>공개 여부:</strong> {post.isPrivate === 'Y' ? '공개' : '비공개'}</p></Col>
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
                                    <a href={`http://localhost:8080/api/posts/download/${post.filenames}`} target="_blank" rel="noopener noreferrer">
                                        {post.filenames}
                                    </a>
                                </div>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Button variant="secondary" onClick={() => window.history.back()}>목록으로</Button>
                                </div>
                                <div className="control-button">
                                    <Button variant="primary" className="mr-2">수정</Button>
                                    <Button variant="danger">삭제</Button>
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
