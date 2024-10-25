import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {Card, CardBody, CardGroup, CardHeader, Col, Container, Row,} from "react-bootstrap";
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
                <Col className="report-detail ">
                    <Card className="post-info">
                        {post && (
                            <Card>
                                <Row>
                                    <CardHeader>
                                        <Row>
                                            <Col>제목 : {title}</Col>
                                            <Col>글번호 : {postId}</Col>
                                            <Col>공개 : {isPrivate}</Col>
                                            <Col>신고처리 상태 : </Col>
                                        </Row>
                                        <Row>
                                            <Col>글쓴이 : {username}</Col>
                                            <Col>글 생성일 : {createdAt}</Col>
                                            <Col>최종 수정일 : {updatedAt}</Col>
                                            <Col>조회수 : {readCount}</Col>
                                            <Col>신고수 : {reportCount}</Col>
                                        </Row>
                                        {filenames && filenames !== '' && filenames !== 'null' && (
                                            <Row>
                                                <Col>첨부파일 : {filenames}</Col>
                                            </Row>
                                        )}
                                    </CardHeader>
                                </Row>

                                <Row>
                                    <CardBody>
                                        <Col>{content}</Col>
                                        <Col></Col>
                                    </CardBody>
                                </Row>

                            </Card>
                        )}
                    </Card>
                    <CardGroup className="report-info">
                        {reports && reports.length > 0 ? (
                            <Card className={"d-grid"}>
                                {reports.map(report => (
                                    <Col key={report.reportId}>
                                        <p>신고자: {report.userId}</p>
                                        <p>신고 사유: {report.reason}</p>
                                        <p>신고 날짜: {new Date(report.createdAt).toLocaleString()}</p>
                                        {/* 다른 ReportsDTO 속성들 */}
                                    </Col>
                                ))}
                            </Card>
                        ) : (
                            <p>신고가 없습니다.</p>
                        )}
                    </CardGroup>
                </Col>
            </Container>
        </>
    );
};

export default ReformReportDetail;