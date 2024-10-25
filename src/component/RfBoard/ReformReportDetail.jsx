import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {Button, Card, CardBody, CardFooter, CardGroup, CardHeader, Col, Container, Row,} from "react-bootstrap";
import '/src/css/RfBoard/ReformReportDetail.css'

const ReformReportDetail = ({ isLoggedInId }) => {
    const { postId } = useParams();
    const [reportDetails, setReportDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/report/details/${postId}`);
                if (!response.ok) throw new Error('데이터를 불러오는 데 실패했습니다.');
                const data = await response.json();
                console.log(data)
                setReportDetails(data);
            } catch (error) {
                console.error('Error fetching report details:', error);
                setError(error.message); // 오류 메시지를 상태에 저장
            }
        };

        fetchReportDetails();
    }, [postId]);

    // 게시물 정보와 신고 리스트 가져오기
    let post = [];
    let reports = null;
    let {title, content, userId, isPrivate, username,
        filenames, readCount, status, createdAt, updatedAt, reportCount} = '';

    if (reportDetails) {
        // reportDetails의 첫 번째 키를 가져옴
        post = Object.keys(reportDetails)[0]// 첫 번째 키를 가져옴
        const titleMatch = Object.keys(reportDetails)[0].match(/title=(.*?),/);
        const contentMatch = Object.keys(reportDetails)[0].match(/content=(.*?),/);
        const isPrivateMatch = Object.keys(reportDetails)[0].match(/isPrivate=(.*?),/);
        const filenamesMatch = Object.keys(reportDetails)[0].match(/filenames=(.*?),/);
        const readCountMatch = Object.keys(reportDetails)[0].match(/readCount=(.*?),/);
        const createdAtMatch = Object.keys(reportDetails)[0].match(/createdAt=(.*?),/);
        const updatedAtMatch = Object.keys(reportDetails)[0].match(/updatedAt=(.*?),/);
        const reportCountMatch = Object.keys(reportDetails)[0].match(/reportCount=(.*?),/);
        const statusMatch = Object.keys(reportDetails)[0].match(/status=(.*?),/);
        const usernameMatch = Object.keys(reportDetails)[0].match(/userId=(.*?),/);

        title = titleMatch ? titleMatch[1] : null;
        content = contentMatch ? contentMatch[1] : null;
        isPrivate = isPrivateMatch ? isPrivateMatch[1] : null;
        filenames = filenamesMatch ? filenamesMatch[1] : null;
        readCount = readCountMatch ? readCountMatch[1] : null;
        createdAt = createdAtMatch ? createdAtMatch[1] : null;
        updatedAt = updatedAtMatch ? updatedAtMatch[1] : null;
        reportCount = reportCountMatch ? reportCountMatch[1] : null;
        status = statusMatch ? statusMatch[1] : null;
        username = usernameMatch ? usernameMatch[1] : null;

        reports = reportDetails[Object.keys(reportDetails)]; // 첫 번째 키를 사용해 게시물 정보 가져오기
        console.log(":::::::: post : " + post)
        console.log(title)
        console.log(">>>>>>>>> report : " + reports)
    }

    // 데이터가 없을 경우 로딩 표시나 오류 메시지 표시
    if (error) return <div>오류 발생: {error}</div>;
    if (!reportDetails) return <div>로딩 중...</div>;

    return (
        <>
            <Container>
                <div className={"report-detail text-lg-start"}>
                    <Card className="post-info p-0 me-2">
                        {post && (
                            <>
                                <CardHeader>
                                    <Row>
                                        <Col><p><strong>제목</strong> : {title}</p></Col>
                                        <Col><p><strong>글번호</strong> : {postId}</p></Col>
                                        <Col><p><strong>공개</strong> : {isPrivate}</p></Col>
                                        <Col><p><strong>처리상태</strong>: </p></Col>
                                    </Row>
                                </CardHeader>
                                <CardHeader>
                                    <Row>
                                        <Col><p><strong>글쓴이</strong> : {username}</p></Col>
                                        <Col><p><strong>조회수</strong> : {readCount}</p></Col>
                                        <Col><p><strong>신고수</strong> : {reportCount}</p></Col>
                                    </Row>
                                </CardHeader>
                                <CardHeader>
                                    <Row>
                                        <Col><p><strong>등록일</strong> : {createdAt.toLocaleString()}</p></Col>
                                        <Col><p><strong>최종 수정일</strong> : {updatedAt.toLocaleString()}</p></Col>
                                    </Row>
                                </CardHeader>
                                    {filenames && filenames !== '' && filenames !== 'null' && (
                                        <CardHeader>
                                            <Row>
                                                <Col><strong>첨부파일</strong> : {filenames}</Col>
                                            </Row>
                                        </CardHeader>
                                    )}
                                <CardBody>
                                    <Row>
                                        <Col>{content}</Col>
                                    </Row>
                                </CardBody>
                            </>
                        )}
                        <CardFooter>
                            <Row>
                                <Col>
                                    <Button className={"btn-success"}>처리 완료</Button>
                                </Col>
                                <Col className={"text-lg-end"}>
                                    <Button className={"btn-secondary"}>글잠금</Button>
                                    <Button className={"ms-3 btn-danger"}>글삭제</Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>

                    {reports && reports.length > 0 ? (
                    <div className="report-detail-list d-grid gap-3">
                        {reports.map(report => (
                            <Card className={"p-0"}>
                                <CardHeader className={"text-md-start"} key={report.reportId}>
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