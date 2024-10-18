import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";

export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username , setUsername] = useState('');

    // useMutation 훅을 사용하여 회원가입 요청을 처리
    const { mutate, isLoading, isError, error } = useMutation(
        () => {
            return fetch(`http://localhost:8080/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: 1,
                    email: email,
                    password: password,
                    username: username,
                    usersrole: 'MEMBER',
                    is_active: 'Y'
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
        fetch(`http://localhost:8080/api/check-username?username=${username}`)
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
        <>
            <div>
                <h2>회원가입</h2>
            </div>
            <div>
                <label htmlFor="username">사용자명:</label>
                <input type="text" id="username" name="username" value={username}
                       onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password">비밀번호:</label>
                <input type="password" id="password" name="password" value={password}
                       onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="email">이메일:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                       required />
            </div>
            <div>
                <button type="button" onClick={handleSignup} disabled={isLoading}>
                    {isLoading ? '등록 중...' : '회원가입'}
                </button>
                <button type="button" onClick={returnback}>돌아가기</button>
                <button type="button" onClick={() => {
                    setUsername('');
                    setPassword('');
                    setEmail('');
                }}>초기화</button>
            </div>
            {isError && <p style={{ color: 'red' }}>오류: {error.message}</p>}
        </>
    );
}

