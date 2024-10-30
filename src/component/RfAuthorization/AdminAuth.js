
// 권한 확인
export const checkAdminRole = async (isLoggedInId, navigate) => {
    try {
        // 인증 토큰 가져오기
        const token = localStorage.getItem('token');
        // 토큰이 없으면 로그인 페이지로 이동
        if (!token) {
            navigate('/login');
            return;
        }
        // 서버에 권한 요청 (ADMIN 권한 확인)
        const response = await fetch(`http://localhost:8080/api/getRole/${isLoggedInId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        // 응답이 성공적이지 않을 경우 예외 발생
        if (!response.ok) {
            throw new Error("권한 확인에 실패하였습니다.");
        }

        // JSON 형태로 응답 데이터 가져오기
        const data = await response.json();
        // 권한이 ADMIN이 아니면 0 반환
        if (data.role !== 'ADMIN') {
            return 0;
        }
        // ADMIN 권한이 있으면 1 반환
        return 1;
    } catch (error) {
        console.error('권한 확인 중 오류 발생:', error);
    }
};