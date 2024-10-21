import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Container, Row, Col, Form, Button, Alert, InputGroup} from "react-bootstrap";
import {useMutation} from "react-query";
import {FaLock, FaUser} from "react-icons/fa";
import {TiDelete} from "react-icons/ti";

export default function Login({ setIsLoggedIn }) {
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
                setIsLoggedIn(true); // 로그인 상태 업데이트
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
                            <Button
                                variant="secondary"
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
/*

export default function Login() {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 성공 여부를 확인하는 로직
        const checkLoginStatus = () =>{
            const token = localStorage.getItem("token"); // 예: 로컬 스토리지에서 토큰 확인
            setLoginStatus(!!token); // 토큰이 있으면 로그인 상태로 설정
        };

        checkLoginStatus();
    }, [navigate]);

    useEffect(()=>{
        if(loginStatus){
            navigate('/')
        }
    }, [loginStatus, navigate])


    const handleLogin = () => {
        const userId = document.querySelector(`#userId`)
        const password = document.querySelector(`#password`)
        const formData = new URLSearchParams();
        formData.append('userId', userId.value);
        formData.append('password', password.value);
        fetch(`http://localhost:8080/api/login`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body : formData.toString(),
            mode : "cors"
        })
            .then((resp) => {
                console.log(resp)
                if(!resp.ok && resp.status !== 400){
                    throw new Error("로그인 실패" + resp.status);
                }
                return resp.json();

            })
            .then(data => {
                setSuccessMessage(data.message)
                alert(data.message);
                navigate("/");
            })
            .catch((error) => {
                console.error("fetch 에러:", error); // 전체 에러 객체 출력
                setErrorMessage("로그인 오류 발생" + error.message);
            });
    };

    const returnBack = () => {
        if(window.history.length>1){
            navigate(-1)
        } else{
            location.href="/"
        }
    }

    return (
        <>
            <div>
                <div>
                    <h2>로그인</h2>
                </div>

                {/!* 회원가입 성공 메시지 *!/}
                {successMessage && (
                    <div style={{ color: 'green' }}>
                        <p>{successMessage}</p>
                    </div>
                )}

                {/!* 에러 메시지 *!/}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="userId">사용자명:</label>
                    <input type="text" id="userId" name="userId" required />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <div>
                    <button type="button" onClick={handleLogin}>로그인</button>
                    <button type="button" id="back" onClick={returnBack}>돌아가기</button>
                </div>
            </div>
        </>
    );
}*/
