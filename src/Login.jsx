import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


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
        const username = document.querySelector(`#username`)
        const password = document.querySelector(`#password`)
        const formData = new URLSearchParams();
        formData.append('username', username.value);
        formData.append('password', password.value);
        fetch(`http://localhost:8080/login`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body : formData.toString()
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

                {/* 회원가입 성공 메시지 */}
                {successMessage && (
                    <div style={{ color: 'green' }}>
                        <p>{successMessage}</p>
                    </div>
                )}

                {/* 에러 메시지 */}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="username">사용자명:</label>
                    <input type="text" id="username" name="username" required />
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
}