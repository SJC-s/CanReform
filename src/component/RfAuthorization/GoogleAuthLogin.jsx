import { GoogleLogin } from '@react-oauth/google';
import {useNavigate} from "react-router-dom";

export default function GoogleAuthLogin() {

    const navigate = useNavigate();
    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        // ID Token을 백엔드로 전송
        const response = await fetch("http://localhost:8080/api/googleLogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });
        const data = await response.json();
        console.log("로그인 성공", data);
        navigate(-1)
    };

    return (
        <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => console.log('Login Failed')}
        />
    );
}
