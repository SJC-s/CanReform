import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import '../../css/RfBoard/ReformDetail.css'
import ReformCommentWrite from "./ReformCommentWrite.jsx";
import ReformCommentList from "./ReformCommentList.jsx";
import axios from 'axios'; // HTTP 요청을 기본적으로 비동기로 수행하기 위해 자바스크립트에서 널리 사용되는 라이브러리
import {useEffect, useRef, useState} from "react";
import {checkAdminRole} from "../RfAuthorization/AdminAuth.js";

export default function ReformAnnouncementDetail({ isLoggedInId }) {
    const { announcement } = useLocation().state || {}; // location.state에서 announcement를 가져옴
    const navigate = useNavigate();
    const [currentAnnouncement, setCurrentAnnouncement] = useState(announcement);
    const [isAdmin, setIsAdmin] = useState(null);

    // useRef로 API 호출 여부를 추적하기 위한 플래그 설정
    const hasFetchedAnnouncement = useRef(false);

    useEffect(() => {
        console.log(isLoggedInId)
        if (!announcement) {
            // 공지 정보가 없으면 목록으로 이동
            navigate('/posts');
        } else if (!hasFetchedAnnouncement.current) {
            // 플래그가 false일 때만 API 호출
            hasFetchedAnnouncement.current = true; // 플래그 설정
            // 서버로부터 조회된 공지 정보 가져오기 (조회수 증가 포함)
            const fetchData = async () => {
                try {
                    // 공지 정보와 평점 정보 병렬로 가져오기
                    const announcementDetailResponse = await axios.get(`http://localhost:8080/api/announcement/${announcement.announcementId}`);
                    setCurrentAnnouncement(announcementDetailResponse.data); // 공지 정보 업데이트
                } catch (error) {
                    console.error("공지 정보를 불러오는 중 오류 발생:", error);
                    alert("공지 정보를 불러오는 중 오류가 발생했습니다.");
                    navigate('/posts');
                }
            };

            fetchData();
        }
    }, [announcement, navigate]);

    // 사용자 권한 확인
    useEffect(() => {
        if (isLoggedInId) {
            const fetchAdminRole = async () => {
                const result = await checkAdminRole(isLoggedInId, navigate);
                console.log(result)
                setIsAdmin(result === 1);
            };
            fetchAdminRole();
        }
    }, [isLoggedInId, navigate]);

    if (!announcement) {
        return <p>공지 정보를 불러올 수 없습니다.</p>;
    }

    // 허용된 이미지 파일 확장자 목록
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    // 확장자 확인 함수
    const isValidImage = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        return allowedExtensions.includes(extension);
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
            return;
        }

        try {
            const token = localStorage.getItem('token'); // JWT 토큰 가져오기
            if (!token) {
                alert("인증 정보가 없습니다. 로그인 후 다시 시도하세요.");
                return;
            }

            const headers = { Authorization: `Bearer ${token}` }; // 인증 헤더 설정

            await axios.delete(`http://localhost:8080/api/announcement/${currentAnnouncement.announcementId}`, { headers });
            alert("공지가 삭제되었습니다.");
            navigate('/posts');
        } catch (error) {
            console.error("공지 삭제 중 오류 발생:", error);
            alert("공지 삭제 중 오류가 발생했습니다.");
        }
    };

    // 공지 수정 페이지로 이동
    const handleEdit = () => {
        navigate(`/announcement/edit/${currentAnnouncement.announcementId}`, { state: { announcement: currentAnnouncement } });
    };

    return (
        <Container className='detail-container' fluid style={{padding: "0px", marginTop: "10px", marginBottom: "10px"}}>
            <Row>
                <Col className="text-start" md={12}>
                    <Card style={{padding: '0px'}}>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <h2>{currentAnnouncement.title}</h2>
                                </Col>
                             </Row>
                        </Card.Header>
                        <Card.Header>
                            <Row className="mt-2">
                                <Col md={2}>
                                    <p><strong>카테고리:</strong> {currentAnnouncement.category === 'Category' ? '공지' : null}</p>
                                </Col>
                                <Col></Col>
                                <Col></Col>
                                <Col></Col>
                            </Row>
                        </Card.Header>
                        <Card.Header>
                            <Row>
                                <Col md={2}><p><strong>작성자:</strong> {currentAnnouncement.userId}</p></Col>
                                <Col><p><strong>작성일:</strong> {new Date(currentAnnouncement.createdAt).toLocaleDateString()}</p></Col>
                                <Col md={2}><p><strong>조회수:</strong> {currentAnnouncement.readCount}</p></Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <p><strong>설명</strong></p>
                                    <p>{currentAnnouncement.content}</p>
                                    <hr/>
                                </Col>
                            </Row>
                            {/* 파일 링크 */}
                            {currentAnnouncement.filenames && currentAnnouncement.filenames.length > 0 && (
                                <div>
                                    <h5>첨부 사진(클릭시 다운로드)</h5>
                                    <Row>
                                        {currentAnnouncement.filenames.split(',').map((filename, index) => (
                                            <Col key={index} md={2} className="mb-3">
                                                {isValidImage(filename) && (
                                                    <div>
                                                        <a href={`http://localhost:8080/api/announcements/download/${filename}`}
                                                           target="_blank" rel="noopener noreferrer">
                                                            <img
                                                                src={`http://localhost:8080/api/announcements/download/${filename}`}
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
                                {isLoggedInId && isAdmin ? <div className="control-button">
                                    <Button variant="primary" className="mr-2" onClick={handleEdit}>수정</Button>
                                    <Button variant="danger" onClick={handleDelete}>삭제</Button>
                                </div> : null}
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