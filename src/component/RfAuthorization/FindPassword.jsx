import {useState} from "react";
import {Container, Row, Col, Form, Button, Alert} from "react-bootstrap";

export default function FindPassword() {
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFindPassword = () => {
        // 아이디 및 이메일 유효성 확인
        if (!userId || !email.includes('@')) {
            setErrorMessage('유효한 아이디와 이메일을 입력하세요.');
            return;
        }

        // 서버로 아이디와 이메일 전송하여 비밀번호 재설정 요청
        fetch(`http://localhost:8080/api/findPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                email: email
            })
        })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("비밀번호 찾기 실패");
                }
                return resp.json();
            })
            .then(() => {
                setSuccessMessage('비밀번호 재설정 링크가 가입했던 이메일로 전송되었습니다.');
                setErrorMessage('');
            })
            .catch(() => {
                setErrorMessage("입력한 정보로 계정을 찾을 수 없습니다.");
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <h2 className="text-center mb-4">비밀번호 찾기</h2>
                    <Form>
                        <Form.Group controlId="userId" className="mb-3">
                            <Form.Label>아이디를 입력하세요</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="아이디"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                                autoComplete={userId}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>가입 시 사용한 이메일을 입력하세요</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete={email}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleFindPassword}>
                            비밀번호 찾기
                        </Button>
                    </Form>

                    {successMessage && (
                        <Alert variant="success" className="mt-3">
                            {successMessage}
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="danger" className="mt-3">
                            {errorMessage}
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
