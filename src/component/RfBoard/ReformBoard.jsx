import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUnlockAlt } from "react-icons/fa";
import '../../css/RfBoard/ReformBoard.css';
import ReformAnnouncement from "./ReformAnnouncement.jsx";
import ReformSlideBanner from "./ReformSlideBanner.jsx";
import {checkAdminRole} from "../RfAuthorization/AdminAuth.js";

const MAX_PAGES_DISPLAY = 10; // 최대 페이지네이션 버튼 수

export default function ReformBoard({ isLoggedInId }) {

    const [filteredPosts, setFilteredPosts] = useState([]);  // 필터링된 게시글 리스트
    const [category, setCategory] = useState('all');         // 현재 활성화된 탭
    const [searchValue, setSearchValue] = useState('');         // 검색어 상태(현재 상태 설정)
    const [search, setSearch] = useState('');                   // 검색어 상태(전송)
    const [currentPage, setCurrentPage] = useState(1);          // 현재 페이지 상태
    const [searchClassValue, setSearchClassValue] = useState('');   // 검색 범위 설정(현재 상태 설정)
    const [searchClass, setSearchClass] = useState('');   // 검색 범위 설정(전송)
    const [isAdmin, setIsAdmin] = useState(null);

    const postsPerPage = 5;                                   // 한 페이지에 보여줄 게시글 수

    const navigate = useNavigate();

    // 사용자 권한 확인
    useEffect(() => {
        if (isLoggedInId) {
            const fetchAdminRole = async () => {
                const result = await checkAdminRole(isLoggedInId, navigate);
                console.log(result)
                setIsAdmin(result === 1);
            };
            fetchAdminRole();
        }
    }, [isLoggedInId, navigate]);

    const url = 'http://localhost:8080/api/posts'
    // 백엔드에서 데이터를 가져오는 함수
    const fetchPosts = async (page, limit, search, category) => {
        const queryParams = new URLSearchParams({
            page,
            limit,
            search,
            category,
            searchClass
        });
        const response = await fetch(url + `?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        return response.json();
    };

    // 리액트 쿼리를 사용하여 데이터 가져오기
    const { data: posts = { content: [], totalPages: 0 }, status, error, refetch } = useQuery(
        ["posts", currentPage, postsPerPage, search, category, searchClass],
        () => fetchPosts(currentPage, postsPerPage, search, category, searchClass),
    );

    // Spring Boot에서 게시글 데이터를 불러오는 함수
    useEffect(() => {
        if (status === 'success') {
            setFilteredPosts(posts.content); // 받아온 게시글을 상태에 저장
        }
    }, [posts]);


    const getPageNumbers = () => {
        // 시작 페이지와 끝 페이지를 계산
        const totalPages = posts.page.totalPages; // 전체 페이지 수
        let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGES_DISPLAY / 2));
        let endPage = Math.min(totalPages, startPage + MAX_PAGES_DISPLAY - 1);

        // 현재 페이지가 끝 페이지에 가까울 때, 시작 페이지 조정
        if (endPage - startPage + 1 < MAX_PAGES_DISPLAY) {
            startPage = Math.max(1, endPage - MAX_PAGES_DISPLAY + 1);
        }

        // 페이지 배열 생성
        return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
    };


    // 카테고리와 검색어 필터링 처리 함수
    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
        setSearch(searchValue)
        setSearchClass(searchClassValue)
        refetch(); // react-query의 useQuery에 의해 자동으로 갱신
    };

    // 탭 변경 함수
    const handleTabChange = (tab) => {
        setCategory(tab);
        if (tab === 'all') {
            setSearch('');  // 전체 탭이면 검색어 초기화
            setSearchValue('');
        }
        handleSearch();  // 탭이 변경될 때 필터링 처리
    };

    // 엔터 키 입력 감지 함수
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // 엔터 키 입력 시 검색 실행
            e.target.focus; // 검색 후 커서 유지
        }
    };

    // 글쓰기 버튼을 눌렀을 때 동작하는 함수
    const handleWritePost = async () => {
        if (isLoggedInId) {
            navigate("/posts/write");
        } else {
            alert("로그인 후 글쓰기를 할 수 있습니다.");
            navigate("/login");  // 로그인 페이지로 이동
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
            {/* 배너 광고 */}
            <ReformSlideBanner/>
            <hr/>
            {/* 검색 창 및 탭 메뉴 - 가로로 나란히 배치 */}
            <div className="header-row">
                {/* 탭 메뉴 */}
                <div className="tabs">
                    <button onClick={() => handleTabChange('all')} className={'btn ' + (category === 'all' ? 'btn-primary' : 'btn-outline-primary')}>
                        전체
                    </button>
                    <button onClick={() => handleTabChange('Inquiry')} className={'btn ' + (category === 'Inquiry' ? 'btn-primary' : 'btn-outline-primary')}>
                        문의
                    </button>
                    <button onClick={() => handleTabChange('request')} className={'btn ' + (category === 'request' ? 'btn-primary' : 'btn-outline-primary')}>
                        의뢰
                    </button>
                </div>
                {/* 검색 창 - 우측 상단에 위치 */}
                <div className="search-bar">
                    <select className="form-select-sm m-1" value={searchClassValue} onChange={(e) => setSearchClassValue(e.target.value)}>
                        <option value="all">전체</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="userId">작성자</option>
                    </select>
                    <input
                        type="text"
                        placeholder="게시글 검색"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
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
                    <th style={{width: '10%'}}>신고수</th>
                    <th style={{width: '10%'}}>작성일</th>
                </tr>
                </thead>
                <tbody>
                <ReformAnnouncement/>
                {filteredPosts.length > 0 ? (  // 배열의 길이를 확인
                    filteredPosts.map(post => (
                        <tr key={post.postId}>
                            <td>{post.category === 'Inquiry' ? '문의' : '의뢰'}</td>
                            <td>{post.isPrivate === 'Y' ? <FaUnlockAlt style={{color:"darkblue"}}/>: <FaLock style={{color:"gray"}}/>}</td>
                            <td>
                                {post.isPrivate === 'N' && post.userId !== isLoggedInId && !isAdmin ? (
                                    <span style={{ color: 'grey' }}>{post.title}</span> // 비활성화된 제목 (비공개 글이면서 작성자가 본인이 아닌 경우)
                                ) : (
                                    <Link to={`/posts/${post.postId}`} state={{post}}>
                                        {post.title}
                                    </Link> // 활성화된 제목 (공개글이거나 작성자가 본인인 경우)
                                )}
                            </td>
                            <td>{post.userId}</td>
                            <td>{post.readCount}</td>
                            <td>{post.commentCount}</td>
                            <td>{post.reportCount}</td>
                            <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
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
            {posts && posts.page.totalPages > 0 && (
                <div className="pagination">
                    <button onClick={() => setCurrentPage(1)}>{'<<'}</button>
                    <button onClick={() => setCurrentPage(Math.max(1, currentPage - (MAX_PAGES_DISPLAY/2)))}>{'<'}</button>
                    {getPageNumbers().map(pageNumber => (
                        <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
                                style={{
                                    backgroundColor: currentPage === pageNumber ? '#007bff' : '#f0f0f0',
                                    color: currentPage === pageNumber ? 'white' : 'black',
                                }}>
                            {pageNumber}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(Math.min(currentPage + (MAX_PAGES_DISPLAY/2), posts.page.totalPages))}>{'>'}</button>
                    <button onClick={() => setCurrentPage(posts.page.totalPages)}>{'>>'}</button>
                </div>
            )}
        </div>
    );
}
