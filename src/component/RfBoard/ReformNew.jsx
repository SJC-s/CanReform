import { useState } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReformFormFields from "./ReformFormFields.jsx";
import { allowedExtensions, filterValidFiles } from "../utils/fileUtils";

export default function ReformNew() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Inquiry");
    const [isPrivate, setIsPrivate] = useState("Y");
    const [filenames, setFilenames] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]); // 미리보기 URL 저장

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // 확장자가 허용된 파일만 필터링
        const validFiles = filterValidFiles(selectedFiles);
        setFilenames(validFiles); // 유효한 파일만 상태에 저장

        // 이미지 파일 미리보기 URL 생성
        const previews = validFiles.map((file) => URL.createObjectURL(file));
        setFilePreviews(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');  // JWT 토큰을 로컬 스토리지에서 가져옴

        const formData = new FormData();
        formData.append("post", new Blob([JSON.stringify({ title, content, category, isPrivate })], { type: "application/json" })); // 게시글 데이터 추가

        Array.from(filenames).forEach((file) => {
            formData.append("files", file); // 파일 추가
        });

        await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        }).then(data => {
            if (data.status === 200) {
                alert("글이 성공적으로 등록되었습니다.");
                navigate("/posts"); // 게시글 목록으로 이동
            } else {
                alert("글 작성 중 오류가 발생했습니다.");
            }

        })
            .catch(error => {
                console.error('Error:', error)
                alert("서버 통신 중 문제가 발생했습니다.");
            });
    };

    return (
        <Container fluid style={{ padding: "0px", marginTop: "10px", marginBottom: "10px" }}>
            <Row>
                <Col className="text-start" md={12}>
                    <Card>
                        <Card.Header>
                            <h2>글 작성</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <ReformFormFields
                                    title={title}
                                    setTitle={setTitle}
                                    category={category}
                                    setCategory={setCategory}
                                    isPrivate={isPrivate}
                                    setIsPrivate={setIsPrivate}
                                    content={content}
                                    setContent={setContent}
                                    allowedExtensions={allowedExtensions}
                                    handleFileChange={handleFileChange}
                                    filePreviews={filePreviews}
                                    setFilePreviews={setFilePreviews}
                                />
                                <div className="mt-4">
                                    <Button variant="primary" type="submit">
                                        작성
                                    </Button>
                                    <Button variant="secondary" className="ml-2" onClick={() => navigate(-1)}>
                                        취소
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
