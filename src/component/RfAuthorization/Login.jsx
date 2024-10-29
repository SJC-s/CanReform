import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Row, Col, Form, Button, Alert, InputGroup} from "react-bootstrap";
import {useMutation} from "react-query";
import {FaLock, FaUser} from "react-icons/fa";
import {TiDelete} from "react-icons/ti";
import {jwtDecode} from "jwt-decode";
import GoogleAuthLogin from "./GoogleAuthLogin.jsx";

export default function Login({ setIsLoggedInId }) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showClearIdButton, setShowClearIdButton] = useState(false);

    const navigate = useNavigate();

    // 로그인 요청을 처리하는 mutation
    const {mutate, isLoading} = useMutation(
        () => {
            return fetch(`http://localhost:8080/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    userId: userId,
                    password: password
                })
            }).then(resp => {
                if (!resp.ok && resp.status !== 400) {
                    throw new Error("로그인 실패");
                }
                return resp.json();
            });
        },
        {
            onSuccess: (data) => {
                // 로그인 성공 시 처리
                localStorage.setItem('token', data.token); // 예시로 토큰 저장
                setSuccessMessage("로그인 성공");
                if (data) {
                    const decoded = jwtDecode(data.token);
                    setIsLoggedInId(decoded.sub); // 백엔드에서 JWT에 userId를 클레임으로 포함시켰다고 가정
                }
                navigate(-1); // 메인 페이지로 이동
            },
            onError: (error) => {
                // 로그인 실패 시 처리
                setErrorMessage(error.message);
            }
        }
    );

    // 로그인 버튼 클릭 시 실행되는 함수
    const handleLogin = () => {
        if (!userId || !password) {
            setErrorMessage("사용자명과 비밀번호를 입력하세요.");
            return;
        }
        mutate(); // 로그인 요청 보내기
    };

    // 엔터 키 입력 감지 함수
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(); // 엔터 키 입력 시 검색 실행
        }
    }

    const handleIdChange = (e) => {
        setUserId(e.target.value);
        setShowClearIdButton(e.target.value.length > 0);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const clearIdField = () => {
        setUserId('');
        setShowClearIdButton(false);
    };


    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <h2 className="text-center mb-4">로그인</h2>

                    {/* 로그인 성공 메시지 */}
                    {successMessage && (
                        <Alert variant="success">
                            {successMessage}
                        </Alert>
                    )}

                    {/* 에러 메시지 */}
                    {errorMessage && (
                        <Alert variant="danger">
                            {errorMessage}
                        </Alert>
                    )}

                    <Form>
                        <Row>
                            <Col md={1}>
                                <FaUser/>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="사용자 아이디를 입력하세요"
                                        value={userId}
                                        onChange={handleIdChange}
                                        onKeyDown={handleKeyDown}
                                        required
                                        autoComplete={userId}
                                    />
                                    {showClearIdButton && (
                                        <Button
                                            variant="outline-secondary"
                                            className="btn_delete"
                                            id="id_clear"
                                            onClick={clearIdField}
                                        >
                                            <TiDelete/>
                                        </Button>
                                    )}
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <FaLock/>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onKeyDown={handleKeyDown}
                                        required
                                        autoComplete="current-password"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-grid gap-2">
                            <Button
                                variant="primary"
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? '로그인 중...' : '로그인'}
                            </Button>
                            {/* 아이디/비밀번호 찾기 링크 */}
                            <div className="d-flex justify-content-between">
                                <Button variant="secondary" onClick={() => navigate('/findUserid')}>
                                    아이디 찾기
                                </Button>
                                <GoogleAuthLogin setIsLoggedInId={setIsLoggedInId}/>
                                <Button variant="secondary" onClick={() => navigate('/findPassword')}>
                                    비밀번호 찾기
                                </Button>
                            </div>
                            <Button
                                variant="warning"
                                onClick={() => navigate(-1)}
                            >
                                돌아가기
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}