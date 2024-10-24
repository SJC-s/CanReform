import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import ReformFormFields from "./ReformFormFields.jsx";
import {allowedExtensions, filterValidFiles} from "../utils/fileUtils"; // 유틸리티 함수 가져오기

export default function ReformEdit() {
    const { state } = useLocation();
    const { post } = state || {};

    const [title, setTitle] = useState(post ? post.title : "");
    const [content, setContent] = useState(post ? post.content : "");
    const [category, setCategory] = useState(post ? post.category : "Inquiry");
    const [isPrivate, setIsPrivate] = useState(post ? post.isPrivate : "Y");
    const [existingFilenames, setExistingFilenames] = useState(post && post.filenames ? post.filenames.split(",") : []); // 기존 파일은 배열로 변환
    const [newFiles, setNewFiles] = useState([]); // 새로 추가된 파일 객체 저장
    const [filePreviews, setFilePreviews] = useState([]); // 미리보기 URL 저장

    const navigate = useNavigate();

    useEffect(() => {
        if (!post) {
            navigate("/posts"); // 게시글이 없으면 목록으로 이동
        }
    }, [post, navigate]);

    useEffect(() => {
        // 기존 파일 리스트를 filePreviews에 반영
        if (existingFilenames && existingFilenames.length > 0) {
            const existingPreviews = existingFilenames
                .filter((filename) => filename) // 빈 파일명 제거
                .map((filename) => `http://localhost:8080/api/posts/download/${filename}`);

            setFilePreviews((prevPreviews) => {
                // 기존 파일 미리보기와 새로 추가된 파일 미리보기 중복 제거
                return [...new Set([...prevPreviews, ...existingPreviews])];
            });
        }
    }, [existingFilenames]);


    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // 확장자가 허용된 파일만 필터링
        const validFiles = filterValidFiles(selectedFiles);
        setNewFiles((prevFilenames) => [...prevFilenames, ...validFiles]); // 유효한 파일만 상태에 저장

        // 이미지 파일 미리보기 URL 생성
        const previews = validFiles.map((file) => URL.createObjectURL(file));
        setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    };

    const mutation = useMutation(async (formData) => {
        const token = localStorage.getItem('token');  // JWT 토큰을 로컬 스토리지에서 가져옴

        const response = await fetch(`http://localhost:8080/api/posts/${post.postId}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error("글 수정 중 오류가 발생했습니다.");
        }
        return response;
    }, {
        onSuccess: () => {
            alert("글이 성공적으로 수정되었습니다.");
            navigate("/posts"); // 게시글 목록으로 이동
        },
        onError: (error) => {
            console.error('Error:', error);
            alert("서버 통신 중 문제가 발생했습니다.");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("post", new Blob([JSON.stringify({ postId: post.postId, title, content, category, isPrivate })], { type: "application/json" })); // 게시글 데이터 추가

        // 기존 파일명은 문자열로 추가
        existingFilenames.forEach((filename) => {
            formData.append("existingFiles", filename);
        });

        // 새로 추가된 파일 객체는 파일로 추가
        newFiles.forEach((file) => {
            formData.append("files", file);
        });

        mutation.mutate(formData);
    };

    return (
        <Container fluid style={{ padding: "0px", marginTop: "10px", marginBottom: "10px" }}>
            <Row>
                <Col className="text-start" md={12}>
                    <Card>
                        <Card.Header>
                            <h2>글 수정</h2>
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
                                    filenames={existingFilenames}
                                    setFilenames={setExistingFilenames}
                                />
                                <div className="mt-4">
                                    <Button variant="primary" type="submit">
                                        수정
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
