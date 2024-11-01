import {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FaLock, FaUnlockAlt} from "react-icons/fa";
import '../../css/RfBoard/ReformBoard.css';
import {checkAdminRole} from "../RfAuthorization/AdminAuth.js";

export default function ReformReport({ isLoggedInId, setIsLoggedInId }) {
    const [items, setItems] = useState([]);  // 게시물 리스트
    const [page, setPage] = useState(1);  // 현재 페이지
    const [isLoading, setIsLoading] = useState(false);  // 로딩 상태
    const [hasMore, setHasMore] = useState(true);  // 더 가져올 데이터가 있는지 여부
    const [reportStatus, setReportStatus] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const navigate = useNavigate();

    // 사용자 권한 확인
    useEffect(() => {
        if (isLoggedInId) {
            const fetchAdminRole = async () => {
                const result = await checkAdminRole(isLoggedInId, navigate);
                setIsAdmin(result === 1);
            };
            fetchAdminRole();
        }
    }, [isLoggedInId, navigate]);

    // 권한이 관리자가 아닐 경우 홈으로
    useEffect(() => {
        if(isAdmin === false) {
            alert("권한이 없습니다.")
            navigate("/");
        }
    }, [isAdmin])

    // 서버에서 데이터 가져오는 함수
    useEffect(() => {
        const fetchData = async () => {
            if (isLoading) return;  // 이미 로딩 중이면 중복 호출 방지
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/report?reportCount=0&page=${page}`, {
                    method: 'GET', // HTTP 메서드 설정
                    headers: {
                        'Content-Type': 'application/json', // 요청 본문의 데이터 형식
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // JWT 토큰 추가
                    }}); // API 호출
                if (!response.ok) {
                    throw new Error('네트워크 응답이 정상적이지 않습니다');
                }
                const data = await response.json();
                console.log(data); // 데이터 확인

                const processedData = data.map(post => ({
                    ...post,
                    reportStatus: post.reportStatus || null  // 기본적으로 null 설정
                }));

                // 기존 아이템과 새로 받은 데이터를 결합하여 중복 제거
                setItems(prevItems => {
                    const combinedItems = [...prevItems, ...processedData];
                    return Array.from(new Map(combinedItems.map(item => [item.postId, item])).values());  // 중복 제거된 항목만 설정
                });

                if (data.length < 10) setHasMore(false);  // 10개 미만이면 더 이상 데이터 없음
            } catch (error) {
                console.error('데이터를 불러오는 중 에러가 발생했습니다:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [page]);

    // 스크롤을 감지하여 페이지 증가
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    const sortedItems = items.sort((a, b) => {
        // 처리 상태가 null인 항목을 먼저 표시
        if (a.reportStatus === '처리 중' && b.reportStatus !== '처리 중') return -1;
        if (a.reportStatus !== '처리 중' && b.reportStatus === '처리 중') return 1;

        // 처리 상태가 같으면 순서 유지 (신고 수는 이미 정렬된 상태)
        return 0;
    });

    return (
        <div className="container">
            {/* 게시판 테이블 리스트 */}
            {isLoggedInId && isAdmin &&  <table className="table table-hover table-light table-bordered">
                <thead>
                <tr>
                    <th style={{width: '10%'}}>신고수</th>
                    <th style={{width: '10%'}}>카테고리</th>
                    <th style={{width: '10%'}}>공개</th>
                    <th style={{width: '30%'}}>제목</th>
                    <th style={{width: '10%'}}>작성자</th>
                    <th style={{width: '10%'}}>작성일</th>
                    <th style={{width: '10%'}}>처리</th>
                </tr>
                </thead>
                <tbody>
                {sortedItems.length > 0 ? (
                    sortedItems.sort((a,b) => (a.reportStatus === '처리 완료' ? 1 : 0) - (b.reportStatus === '처리 완료' ? 1: 0))
                        .map(post => (
                            <tr key={post.postId} className={post.reportStatus === '처리 완료' ? 'table-success' : ''}>
                                <td>{post.reportCount}</td>
                                <td>{post.category === 'Inquiry' ? '문의' : '의뢰'}</td>
                                <td>{post.isPrivate === 'Y' ? <FaUnlockAlt style={{color: "darkblue"}}/> :
                                    <FaLock style={{color: "gray"}}/>}</td>
                                <td>
                                    {post.isPrivate === 'N' && post.userId !== isLoggedInId ? (
                                        <span style={{color: 'grey'}}>{post.title}</span>
                                    ) : (
                                        <Link to={`/report/details/${post.postId}`} state={{post}}>
                                            {post.title}
                                        </Link>
                                    )}
                                </td>
                                <td>{post.userId}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {post.reportStatus}
                                </td>
                            </tr>
                        ))
                ) : (
                    <tr>
                    <td colSpan="7" style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
                            게시글이 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>}

            {/* 로딩 표시 */}
            {isLoading && <p>로딩 중...</p>}
        </div>
    );
}
