import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Mypage.css'; // 스타일을 적용할 CSS 파일

axios.defaults.baseURL = 'http://localhost:8080'; // 백엔드 서버 주소

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({ username: "", email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // 회원정보 조회
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get('/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                if (error.response && error.response.status === 404) {
                    alert('사용자를 찾을 수 없습니다. 로그아웃 처리합니다.');
                    localStorage.removeItem('token');
                    navigate('/');
                }
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/user', userInfo, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsEditing(false);
            alert('회원정보가 수정되었습니다.');
        } catch (error) {
            console.error('Failed to update user info:', error.response ? error.response.data : error.message);
            alert('회원정보 수정에 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        const confirmation = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
        if (!confirmation) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete('/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("회원탈퇴가 완료되었습니다.");
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            console.error("회원탈퇴에 실패했습니다:", error);
        }
    };

    return (
        <div className="mypage-container">
            <h1 className="mypage-title">My Page</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="mypage-form">
                    <div className="form-group">
                        <label>닉네임:</label>
                        <input
                            type="text"
                            name="username"
                            value={userInfo.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>이메일:</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button">수정 완료</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">취소</button>
                    </div>
                </form>
            ) : (
                <div className="user-info">
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <div className="button-group">
                        <button onClick={handleEdit} className="edit-button">회원정보 수정</button>
                        <button onClick={handleDelete} className="delete-button">회원탈퇴</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mypage;
