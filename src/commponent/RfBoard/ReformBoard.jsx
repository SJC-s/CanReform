import { useState, useEffect } from 'react';
import {useQuery} from "react-query";
import {Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FaLock, FaUnlock, FaUnlockAlt} from "react-icons/fa";

const MAX_PAGES_DISPLAY = 10; // 최대 페이지네이션 버튼 수

export default function ReformBoard() {

    const url = 'http://192.168.0.25:8080/api/posts'
    const {data: posts = [], status, error} = useQuery(
        "posts",
        () => fetch(url)  // method : GET
            .then(resp =>{
                if(!resp.ok){
                    throw new Error("There wa a problem fecthing data.")
                }
                return resp.json()
            })
    );

    const [filteredPosts, setFilteredPosts] = useState([]);  // 필터링된 게시글 리스트
    const [activeTab, setActiveTab] = useState('all');         // 현재 활성화된 탭
    const [searchQuery, setSearchQuery] = useState('');         // 검색어 상태
    const [currentPage, setCurrentPage] = useState(1);          // 현재 페이지 상태

    const postsPerPage = 5;                                   // 한 페이지에 보여줄 게시글 수
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage); // 총 페이지 수

    const navigate = useNavigate();


    // Spring Boot에서 게시글 데이터를 불러오는 함수
    useEffect(() => {
            console.log(posts)
        if (status === 'success') {
            handleSearch();  // 서버에서 데이터를 받아온 후 필터링
        }
    }, [posts, activeTab]);


    // 카테고리와 검색어 필터링 처리 함수
    const handleSearch = () => {
        const filtered = posts.filter(([post , ])=> {
            return (activeTab === 'all' || post.category === activeTab) &&
                post.title.toLowerCase().includes(searchQuery.toLowerCase())// 제목 검색 필터
        })
        setFilteredPosts(filtered);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
    };

    // 탭 변경 함수
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'all') {
            setSearchQuery('');  // 전체 탭이면 검색어 초기화
        }
        handleSearch();  // 탭이 변경될 때 필터링 처리
    };

    // 엔터 키 입력 감지 함수
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // 엔터 키 입력 시 검색 실행
        }
    };

    // 현재 페이지에 해당하는 게시글 가져오기
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);  // 필터링된 게시글에서 페이징 처리

    // 페이지 이동 처리 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지네이션 버튼을 동적으로 생성하는 함수
    const getPageNumbers = () => {
        let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_DISPLAY / 2));
        let endPage = Math.min(startPage + MAX_PAGES_DISPLAY - 1, totalPages);

        startPage = Math.max(1, endPage === totalPages ? endPage-MAX_PAGES_DISPLAY+1 : startPage);
        return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
    };

    // 글쓰기 버튼을 눌렀을 때 동작하는 함수
    const handleWritePost = async () => {
        try {
            const response = await fetch('http://192.168.0.25:8080/api/check-login', {
                method: 'GET',
                credentials: 'include',  // 세션 정보를 포함하는 옵션
            });

            if (response.ok) {
                window.location.href = '/write';
            } else if (response.status === 401) {
                navigate('/login');  // 스프링 부트 로그인 페이지
            }
        } catch (error) {
            console.error('로그인 확인 에러:', error);
        }
    };

    if (status === "error") {
        return <p>{error}</p>
    }
    if (status === "loading") {
        return <p>로딩 중...</p>;  // 데이터를 불러오는 동안 로딩 표시
    }

    return (
        <div className="container">
            {/* 검색 창 및 탭 메뉴 - 가로로 나란히 배치 */}
            <div className="header-row">
                {/* 탭 메뉴 */}
                <div className="tabs">
                    <button onClick={() => handleTabChange('all')} className={'btn ' + (activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary')}>
                        전체
                    </button>
                    <button onClick={() => handleTabChange('Inquiry')} className={'btn ' + (activeTab === 'Inquiry' ? 'btn-primary' : 'btn-outline-primary')}>
                        문의
                    </button>
                    <button onClick={() => handleTabChange('request')} className={'btn ' + (activeTab === 'request' ? 'btn-primary' : 'btn-outline-primary')}>
                        의뢰
                    </button>
                </div>
                {/* 검색 창 - 우측 상단에 위치 */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="게시글 검색"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>
                        검색
                    </button>
                </div>
            </div>

            {/* 게시판 테이블 리스트 */}
            <table className="table table-hover table-light table-bordered">
                <thead>
                <tr>
                    <th style={{width: '10%'}}>카테고리</th>
                    <th style={{width: '10%'}}>공개</th>
                    <th style={{width: '30%'}}>제목</th>
                    <th style={{width: '10%'}}>작성자</th>
                    <th style={{width: '10%'}}>조회수</th>
                    <th style={{width: '10%'}}>댓글수</th>
                    <th style={{width: '10%'}}>작성일</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.length > 0 ? (
                    currentPosts.map(([post, username]) => (
                        <tr key={post.post_id}>
                            <td>{post.category === 'Inquiry' ? '문의' : '의뢰'}</td>
                            <td>{post.is_private === 'Y' ? <FaUnlockAlt style={{color:"darkblue"}}/>: <FaLock style={{color:"gray"}}/>}</td>
                            <td>
                                {post.is_private === 'N' ? (
                                    <span style={{ color: 'grey' }}>{post.title}</span> // 비활성화된 제목
                                ) : (
                                <Link to={`/posts/${post.post_id}`} state={{post, username}}>
                                    {post.title}
                                </Link> // 활성화된 제목 (공개글이거나 작성자가 본인인 경우)
                                )}
                            </td>
                            <td>{username}</td>
                            <td>{post.readCount}</td>
                            <td>{post.commentCount}</td>
                            <td>{new Date(post.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
                            게시글이 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* 글쓰기 버튼 */}
            <div className="write-btn">
                <Button variant="primary" onClick={handleWritePost}>
                    글쓰기
                </Button>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(1)}>{'<<'}</button>
                    <button onClick={() => setCurrentPage(Math.max(1, currentPage - MAX_PAGES_DISPLAY))}>{'<'}</button>
                    {getPageNumbers().map(pageNumber => (
                        <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}
                                style={{
                                    backgroundColor: currentPage === pageNumber ? '#007bff' : '#f0f0f0',
                                    color: currentPage === pageNumber ? 'white' : 'black',
                                }}>
                            {pageNumber}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(Math.min(currentPage+MAX_PAGES_DISPLAY,totalPages))}>{'>'}</button>
                    <button onClick={() => setCurrentPage(totalPages)}>{'>>'}</button>
                </div>
            )}
        </div>
    );
}
