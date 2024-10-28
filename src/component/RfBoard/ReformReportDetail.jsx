import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row,} from "react-bootstrap";
import '/src/css/RfBoard/ReformReportDetail.css'
import {useMutation} from "react-query";

const ReformReportDetail = ({ isLoggedInId }) => {
    const { postId } = useParams();
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();
    const [reportStatus, setReportStatus] = useState("처리중");


    // reportDetails 객체 가져와서 post, report 분리
    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/report/details/${postId}`);
                if (!response.ok) throw new Error('데이터를 불러오는 데 실패했습니다.');
                const data = await response.json();

                const postData = data[0].post; // 첫 번째 객체의 post 가져오기
                const reportsData = data[0].reports; // 첫 번째 객체의 reports 가져오기

                setPost(postData); // post 상태 설정
                setReports(reportsData); // reports 상태 설정
            } catch (error) {
                console.error('Error fetching report details:', error);
                setError(error.message); // 오류 메시지를 상태에 저장
            }
        };

        fetchReportDetails();
    }, [postId]);

    // 공개-비공개 전환 mutation
    const privateMutation = useMutation(
        (formData) => {
            const token = localStorage.getItem('token');  // JWT 토큰을 로컬 스토리지에서 가져옴
            return fetch(`http://localhost:8080/api/posts/${postId}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            }).then(resp => {
                if (!resp.ok) {
                    throw new Error("네트워크 요청 실패");
                }
                return resp.json();
            })
        },
        {
            onSuccess: (data) => {
                if(post.isPrivate === 'Y'){
                    alert("게시글을 비공개로 전환하였습니다.")
                } else {
                    alert("게시글을 공개로 전환하였습니다.")
                }
                navigate(0);
            },
            onError: (error) => {
                console.error("변경 중 오류 발생:", error);
            },
        }
    )
    
    // 리포트 삭제 메서드
    const deleteReports = () => {
        fetch(`http://localhost:8080/api/report/${postId}`, {
            method : "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // 필요한 경우 토큰 추가
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    console.log("서버 삭제 요청 중 오류가 발생하였습니다.");
                    return resp.json().then(error => { throw new Error(error.message || "삭제 요청 실패"); });
                }
            })
            .then(data => {
                console.log("리포트 삭제 성공:", data);
                navigate("/report")
            })
            .catch(error => {
                console.error("삭제 중 오류 발생:", error);
            });
    }

    // 댓글 삭제 메서드
    const deleteComments = () => {
        fetch(`http://localhost:8080/api/comments/deletePost/${postId}`, {
            method : "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // 필요한 경우 토큰 추가
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    console.log("서버 삭제 요청 중 오류가 발생하였습니다.");
                    return resp.json().then(error => { throw new Error(error.message || "삭제 요청 실패"); });
                }
            })
            .then(data => {
                console.log("댓글 삭제 성공:", data);
                navigate("/report")
            })
            .catch(error => {
                console.error("삭제 중 오류 발생:", error);
            });
    }

    // 게시글 삭제 메서드
    const deletePost = () => {
        fetch(`http://localhost:8080/api/posts/${postId}`, {
            method : "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // 필요한 경우 토큰 추가
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    console.log("서버 삭제 요청 중 오류가 발생하였습니다.");
                    return resp.json().then(error => { throw new Error(error.message || "삭제 요청 실패"); });
                }
            })
            .then(data => {
            console.log("게시글 삭제 성공:", data);
            navigate("/report")
        })
            .catch(error => {
                console.error("삭제 중 오류 발생:", error);
            });
    }

    // 처리 완료 메서드
    const confirms = () => {
        if(reportStatus === '처리중'){
            setReportStatus("완료")
            alert("처리 완료하였습니다.")
        } else {
            setReportStatus("처리중")
            alert("상태를 되돌렸습니다.")
        }
    }

    // 처리 완료 핸들러
    const handleConfirms = () => {
        confirms()
        navigate(0)
    }

    // 삭제 핸들러
    const handleDeletePost = () => {
        if(confirm("게시글을 삭제하시겠습니까?")){
            deleteReports()
            deleteComments()
            deletePost()
        }
    }

    // 공개-비공개 전환 핸들러
    const handlePrivateMutation = () => {
        const formData = new FormData();
        const newIsPrivate = post.isPrivate === 'Y' ? 'N' : 'Y';

        formData.append("post", new Blob([JSON.stringify({
            postId: postId,
            title : post.title,
            content : post.content,
            category : post.category,
            isPrivate : newIsPrivate
        })], { type: "application/json" })); // 게시글 데이터 추가

        // 기존 파일명은 문자열로 추가
        if(Array.isArray(post.filenames)){
            post.filenames.forEach((filename) => {
                formData.append("existingFiles", filename);
            });
        }

        privateMutation.mutate(formData);
    }
    
    // 데이터가 없을 경우 로딩 표시나 오류 메시지 표시
    if (error) return <div>오류 발생: {error}</div>;
    if (!post) return <div>로딩 중...</div>;

    return (
        <>
            <Container>
                <div className={"report-detail text-lg-start"}>
                    <Card className="post-info p-0 me-2">
                        {post ? (
                            <>
                                <CardHeader>
                                    <Row>
                                        <Col><p><strong>제목</strong> : {post.title}</p></Col>
                                        <Col><p><strong>글번호</strong> : {postId}</p></Col>
                                        <Col><p><strong>공개</strong> : {post.isPrivate}</p></Col>
                                        <Col><p><strong>처리상태</strong>: {reportStatus}</p></Col>
                                    </Row>
                                </CardHeader>
                                <CardHeader>
                                    <Row>
                                        <Col><p><strong>글쓴이</strong> : {post.username}</p></Col>
                                        <Col><p><strong>조회수</strong> : {post.readCount}</p></Col>
                                        <Col><p><strong>신고수</strong> : {post.reportCount}</p></Col>
                                    </Row>
                                </CardHeader>
                                <CardHeader>
                                    <Row>
                                        <Col><p><strong>등록일</strong> : {new Date(post.createdAt).toLocaleString()}</p></Col>
                                        <Col><p><strong>최종 수정일</strong> : {new Date(post.updatedAt).toLocaleString()}</p></Col>
                                    </Row>
                                </CardHeader>
                                    {post.filenames && post.filenames !== '' && post.filenames !== 'null' && post.filenames.length > 0 && (
                                        <CardHeader>
                                            <Row>
                                                <Col><strong>첨부파일</strong> : {post.filenames}</Col>
                                            </Row>
                                        </CardHeader>
                                    )}
                                <CardBody>
                                    <Row>
                                        <Col>{post.content}</Col>
                                    </Row>
                                </CardBody>
                            </>
                        ) : <>게시글 로딩 중...</>}
                        <CardFooter>
                            <Row>
                                <Col>
                                    {reportStatus && reportStatus === '처리중' ?
                                        <Button className={"btn-success me-3"} onClick={handleConfirms}>처리 완료</Button>
                                    : <Button className={"btn-danger me-3"}>되돌리기</Button>
                                    }
                                    <Button onClick={() => navigate(-1)} className={"btn-secondary"}>목록으로</Button>
                                </Col>
                                <Col className={"text-lg-end"}>
                                    {post && post.isPrivate === 'Y' ? <Button className={"btn-secondary"} onClick={handlePrivateMutation}>비공개로 전환</Button> :
                                        <Button className={"btn-secondary"} onClick={handlePrivateMutation}>공개로 전환</Button>}
                                    <Button className={"ms-3 btn-danger"} onClick={handleDeletePost}>글삭제</Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>

                    {reports && reports.length > 0 ? (
                        <div className="report-detail-list d-grid gap-3">
                            {reports.map(report => (
                                <Card className={"p-0"} key={report.reportId}>
                                    <CardHeader className={"text-md-start"}>
                                        <Row>신고자: {report.userId}</Row>
                                        <Row>신고일: {new Date(report.createdAt).toLocaleString()}</Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>{report.reason}</Row>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : (<p>신고가 없습니다.</p>)}

                </div>
            </Container>
        </>
    );
};

export default ReformReportDetail;