import { useState } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ReformNew() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Inquiry");
    const [isPrivate, setIsPrivate] = useState("Y");
    const [filenames, setFilenames] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            content,
            category,
            isPrivate,
            filenames,
        };

        try {
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                alert("글이 성공적으로 등록되었습니다.");
                navigate("/posts"); // 게시글 목록으로 이동
            } else {
                alert("글 작성 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 통신 중 문제가 발생했습니다.");
        }
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
                                <Form.Group controlId="postTitle">
                                    <Form.Label>제목</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="제목을 입력하세요"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="postCategory" className="mt-3">
                                    <Form.Label>카테고리</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="Inquiry">문의</option>
                                        <option value="request">의뢰</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="postPrivate" className="mt-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="비공개 여부"
                                        checked={isPrivate === "Y"}
                                        onChange={(e) => setIsPrivate(e.target.checked ? "Y" : "N")}
                                    />
                                </Form.Group>

                                <Form.Group controlId="postContent" className="mt-3">
                                    <Form.Label>내용</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        placeholder="내용을 입력하세요"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mt-3">
                                    <Form.Label>첨부 파일</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setFilenames(e.target.files[0].name)}
                                    />
                                </Form.Group>

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