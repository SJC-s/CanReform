import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username , setUsername] = useState('');

    const handleSignup = () => {

        fetch(`http://localhost:8080/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        })
            .then((resp) => {
                if (!resp.ok && resp.status !== 400) {
                    throw new Error("회원 등록 오류" + resp.status);
                }
                return resp.json();
            })
            .then(data => {
                setSuccessMessage(data.message);
                alert("등록 성공")
                navigate("/")
            })
            .catch((error) => {
                alert("오류 발생 : " + error.message);
            });
    }
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
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="password">비밀번호:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="email">이메일:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div>
                <button type="button" onClick={handleSignup}>회원가입</button>
                <button type="button" onClick={returnback}>돌아가기</button>
                <button type="button" onClick={()=>{
                    setUsername(''); setPassword(''); setEmail('');
                }}>초기화</button>
            </div>
        </>
    )
}

