import {useState} from "react";
import {Container, Row, Col, Form, Button, Alert} from "react-bootstrap";

export default function FindUserId() {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFindUserId = () => {
        // 이메일 유효성 확인
        if (!email.includes('@')) {
            setErrorMessage('유효한 이메일 주소를 입력하세요.');
            return;
        }

        // 서버로 이메일 전송하여 아이디 찾기
        fetch(`http://localhost:8080/api/findUserId?email=${email}`)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("아이디 찾기 실패");
                }
                return resp.json();
            })
            .then((data) => {
                setUserId(data.userId);
                setErrorMessage('');
            })
            .catch(() => {
                setErrorMessage("입력한 이메일로 가입된 아이디를 찾을 수 없습니다.");
            });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <h2 className="text-center mb-4">아이디 찾기</h2>
                    <Form>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>가입 시 사용한 이메일을 입력하세요</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleFindUserId}>
                            아이디 찾기
                        </Button>
                    </Form>

                    {userId && (
                        <Alert variant="success" className="mt-3">
                            회원님의 아이디는: <strong>{userId}</strong> 입니다.
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
