import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {FaLock, FaMailBulk, FaUser} from "react-icons/fa";
import {BiRename} from "react-icons/bi";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username , setUsername] = useState('');
    const [userId, setUserId] = useState('');

    // useMutation 훅을 사용하여 회원가입 요청을 처리
    const { mutate, isLoading, isError, error } = useMutation(
        () => {
            return fetch(`http://localhost:8080/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    email: email,
                    password: password,
                    username: username,
                    usersRole: 'MEMBER',
                    isActive: 'Y'
                })
            }).then(resp => {
                if (!resp.ok) {
                    throw new Error("회원 등록 오류: " + resp.status);
                }
                return resp.json();
            });
        },
        {
            onSuccess: (data) => {
                // 데이터가 성공적으로 반환된 경우 처리
                console.log("회원가입 성공:", data);
                alert("등록 성공");
                navigate("/"); // 성공 시 메인 페이지로 이동
            },
            onError: (error) => {
                alert("오류 발생: " + error.message);
            }
        }
    );


    const handleSignup = () => {
        // 아이디 중복 체크 API 호출
        fetch(`http://localhost:8080/api/check-userId?userId=${userId}`)
            .then((resp) => resp.json())
            .then((isExists) => {
                if (isExists) {
                    // 아이디가 이미 존재하는 경우 처리
                    alert('아이디가 이미 존재합니다. 다른 아이디를 사용하세요.');
                } else {
                    // 중복이 없으면 회원가입 진행
                    mutate();
                }
            })
            .catch((error) => {
                alert('오류 발생: ' + error.message);
            });
    };


    const returnback = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            location.href = "/"
        }
    }




    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <Form>
                        <Row>
                            <Col md={1}>
                                <FaUser/>
                            </Col>
                            <Col>
                                <Form.Group controlId="user_id" className="mb-3">

                                    <Form.Control
                                        placeholder="사용자 아이디"
                                        type="text"
                                        name="user_id"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <FaLock/>
                            </Col>
                            <Col>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Control
                                        placeholder="비밀번호"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <BiRename/>
                            </Col>
                            <Col>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Control
                                        placeholder="사용자명"
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <FaMailBulk/>
                            </Col>
                            <Col>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Control
                                        placeholder="이메일"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-grid gap-2">
                            <Button variant="primary" onClick={handleSignup} disabled={isLoading}>
                                {isLoading ? <Spinner as="span" animation="border" size="sm" /> : '회원가입'}
                            </Button>
                            <Button variant="secondary" onClick={returnback}>돌아가기</Button>
                            <Button variant="danger" onClick={() => {
                                setUserId('');
                                setUsername('');
                                setPassword('');
                                setEmail('');
                            }}>초기화</Button>
                        </div>

                        {isError && <Alert variant="danger" className="mt-3">오류: {error.message}</Alert>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

