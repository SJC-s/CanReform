import { useState, useRef, useCallback, useEffect } from 'react';
import '../../css/RfMain/MainSlide.css';
import {Button} from "react-bootstrap";
import {FaStar, FaUser} from "react-icons/fa";

export default function MainScroll() {
    const [posts, setPosts] = useState([]);
    const [avgRatings, setAvgRatings] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(2); // 현재 표시할 데이터의 인덱스 (처음 2개를 표시)
    const loader = useRef(null);
    const [showLoadMore, setShowLoadMore] = useState(false); // 더보기 버튼 표시 여부
    const [lastIndex, setLastIndex] = useState(3); // 더보기 버튼 이전에 보여줄 항목의 수

    // 백엔드에서 게시물 및 평점 목록을 불러오는 함수
    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/api/main'); // 백엔드의 엔드포인트 호출
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            const { mainPage, avgRatings } = await response.json();
            if (Array.isArray(mainPage) && Array.isArray(avgRatings)) {
                setPosts(mainPage);
                setAvgRatings(avgRatings);
            } else {
                console.error('Expected an array but got:', { mainPage, avgRatings });
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching file list:', error);
            setIsLoading(false);
        }
    }, []);

    // 컴포넌트가 처음 렌더링될 때 게시물 및 평점 목록을 불러옴
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // posts와 avgRatings를 결합하여 combinedData를 생성하는 useEffect
    useEffect(() => {
        // avgRatings 데이터를 postId를 기준으로 매핑
        const ratingsMap = avgRatings.reduce((acc, rating) => {
            acc[rating.postId] = rating.averageRating;
            return acc;
        }, {});

        // posts에 평균 평점을 매핑
        const combined = posts.map(post => ({
            ...post,
            averageRating: ratingsMap[post.postId] || 0.0,
        }));

        setCombinedData(combined);
    }, [posts, avgRatings]);

    // 스크롤할 때마다 이미지를 추가하는 함수
    const getFiles = useCallback(() => {
        if (isLoading) return; // 로딩 중이면 함수 실행 중단
        setIsLoading(true);

        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (lastIndex >= combinedData.length) {
            setShowLoadMore(false);
        } else {
            setShowLoadMore(true);
        }
        setIsLoading(false);
    }, [currentIndex, isLoading, lastIndex, combinedData]);

    // IntersectionObserver가 loader에 도달했을 때 이벤트
    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                getFiles(); // 새로운 파일 목록을 가져옴
            }
        },
        [getFiles]
    );

    // IntersectionObserver 설정 (스크롤 감지)
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleObserver, option);

        if (loader.current) observer.observe(loader.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    // "더보기" 버튼을 눌렀을 때 파일을 하나씩 불러오는 함수
    const handleLoadMore = () => {
        getFiles(); // 새로운 파일 목록을 가져옴
        setLastIndex(lastIndex + 3)
    };

    return (
        <div className="container">
            <h2>최고의 의뢰글</h2>
            {combinedData.slice(0,lastIndex).map((file, idx) => (
                <div
                    key={idx}
                    className="row align-items-center bg-info-subtle mb-3 p-3"
                    style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }} // flexbox : 수직 가운데 정렬 적용
                >
                    {/* 파일 이름을 이미지 경로로 설정 : 좌측 이미지 */}
                    {/* 홀수 인덱스는 좌측에 이미지 */}
                    {idx % 2 === 0 ? (
                        <>
                            <div className="col-md-6 text-center">
                                <img
                                    src={`http://localhost:8080/api/posts/download/${file.filenames.split(',').pop()}`}
                                    alt={file.title}
                                    className="img-fluid"
                                    style={{ width: '500px', maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                            <div className="col-md-6" style={{ flex: 1, textAlign: 'left', paddingLeft: '20px' }}>
                                <p><FaUser/> <b>{file.userId}</b>
                                    ({new Date(file.createdAt).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })})</p>
                                <h3>{file.title}</h3>
                                <p>{file.content}.</p>
                                <h6><FaStar/> {file.averageRating.toFixed(2)}</h6>
                            </div>
                        </>
                    ) : (
                        // 짝수 인덱스는 우측에 이미지
                        <>
                        <div className="col-md-6" style={{ flex: 1, textAlign: 'right', paddingRight: '20px' }}>
                                <p><FaUser/> <b>{file.userId}</b>
                                    ({new Date(file.createdAt).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })})</p>
                                <h3>{file.title}</h3>
                                <p>{file.content}.</p>
                                <h6><FaStar/> {file.averageRating.toFixed(2)}</h6>
                            </div>
                            <div className="col-md-6 text-center">
                                <img
                                    src={`http://localhost:8080/api/posts/download/${file.filenames.split(',').pop()}`}
                                    alt={file.title}
                                    className="img-fluid"
                                    style={{ width: '500px', maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
            {/* 스크롤의 끝에 도달하면 이 요소가 관찰됨 */}
            <div ref={loader} />

            {/* 더보기 버튼 */}
            {showLoadMore && (
                <Button onClick={handleLoadMore} style={{ marginTop: '20px' }}>
                    더보기
                </Button>
            )}
        </div>
    )
}
