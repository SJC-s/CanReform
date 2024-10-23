import { useState } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ReformNew() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Inquiry");
    const [isPrivate, setIsPrivate] = useState("Y");
    const [filenames, setFilenames] = useState([]);
    const [filePreviews, setFilePreviews] = useState([]); // 미리보기 URL 저장

    const navigate = useNavigate();

    // 허용할 확장자 목록
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

    // 확장자 확인 함수
    const isValidExtension = (filename) => {
        const extension = filename.split('.').pop().toLowerCase(); // 파일 확장자 추출
        return allowedExtensions.includes(extension);
    };


    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // 확장자가 허용된 파일만 필터링
        const validFiles = selectedFiles.filter((file) => isValidExtension(file.name));

        if (validFiles.length !== selectedFiles.length) {
            alert("허용된 확장자 파일만 업로드할 수 있습니다: " + allowedExtensions.join(", "));
            return;
        }

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
                                        label="공개 여부"
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
                                    <Form.Label>첨부 파일 (허용된 파일: {allowedExtensions.join(", ")})</Form.Label>
                                    <Form.Control
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        accept="image/*" // 이미지 파일만 선택 가능
                                    />
                                    <div className="mt-3">
                                        {filePreviews.length > 0 && (
                                            <div>
                                                <h5>이미지 미리보기</h5>
                                                {filePreviews.map((preview, index) => (
                                                    <img
                                                        key={index}
                                                        src={preview}
                                                        alt="미리보기"
                                                        style={{ maxWidth: "200px", marginRight: "10px" }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
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