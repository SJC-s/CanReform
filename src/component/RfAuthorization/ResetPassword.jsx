import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 쿼리 파라미터에서 토큰 추출
    const token = searchParams.get('token');

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            return;
        } else if (!newPassword || newPassword.length < 6) {
            setMessage('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        // 서버로 비밀번호 변경 요청 전송
        fetch(`http://localhost:8080/api/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                newPassword: newPassword,
                userId: userId
            })
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("회원 등록 오류: " + resp.status);
                }
                return resp.json();
            })
            .then(data => {
                if (data.message) {
                    // 비밀번호가 성공적으로 변경되었음을 사용자에게 알림
                    alert('비밀번호가 성공적으로 변경되었습니다.');

                    // 사용자 확인 이후 로그인 페이지로 이동
                    navigate('/login');
                } else {
                    setMessage('비밀번호 변경 중 오류가 발생했습니다.');
                }
            })
            .catch((error) => {
                console.error('에러 발생:', error);
                setMessage('서버와의 통신에 실패했습니다.');
            });
    };

    return (
        <div>
            <h2>비밀번호 재설정</h2>
            {/* 폼 요소로 패스워드 필드를 감쌈 */}
            <form onSubmit={handleResetPassword}>
                <div>
                    <input
                        type="text"
                        placeholder="사용자 ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        autoComplete="userId"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="새 비밀번호 입력"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit">비밀번호 재설정</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
