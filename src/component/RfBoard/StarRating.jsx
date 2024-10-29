import { useEffect, useState } from 'react';
import starEmpty from '../../assets/star1.png'; // 빈 별
import starHalf from '../../assets/star2.png';  // 반 별
import starFull from '../../assets/star3.png';  // 꽉 찬 별
import '../../css/RfBoard/StarRating.css';
import axios from "axios";

const StarRating = ({ currentPost, isLoggedInId }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [rating, setRating] = useState(0); // 별점 상태 추가
    const [currentUserRating, setCurrentUserRating] = useState(null); // 사용자 개인 평점
    const [averageRating, setAverageRating] = useState(0); // 게시물의 평균 평점
    const [totalRatingsCount, setTotalRatingsCount] = useState(0); // 총 평점 개수

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. 사용자 개인 평점 요청
                const userRatingResponse = await axios.get(`http://localhost:8080/api/ratings/${currentPost.postId}/user/${isLoggedInId}`);
                setCurrentUserRating(userRatingResponse?.data || null);

                // 2. 게시물 전체의 평균 평점 요청
                const averageRatingResponse = await axios.get(`http://localhost:8080/api/ratings/${currentPost.postId}/average`);
                setAverageRating(averageRatingResponse?.data || 0);
                setTotalRatingsCount(averageRatingResponse?.data.count || 0);
            } catch {
                alert("데이터를 불러오는 중 오류가 발생했습니다.");
            }
        };
        fetchData();
    }, [currentPost.postId, isLoggedInId]);

    const handleRatingChange = async (newRating) => {
        setRating(newRating);
        console.log("Selected Rating:", newRating);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const ratingData = {
                postId: currentPost.postId,
                userId: isLoggedInId,
                rating: newRating,
            };

            const response = await axios.post('http://localhost:8080/api/ratings', ratingData, config);

            if (response.status === 200) {
                console.log("별점 전송 성공:", response.data);
                alert("별점이 저장되었습니다.");
                // 별점이 저장된 후 사용자 평점과 평균 평점을 즉시 업데이트
                setCurrentUserRating(newRating);

                // 평균 평점 즉시 업데이트 (새로운 평점이 반영되도록 계산)
                const newTotalRatingSum = (averageRating * totalRatingsCount) + newRating;
                const newTotalRatingsCount = totalRatingsCount + (currentUserRating ? 0 : 1); // 새로운 평점인지 여부에 따라 카운트 증가
                const newAverageRating = newTotalRatingSum / newTotalRatingsCount;

                setAverageRating(newAverageRating);
                setTotalRatingsCount(newTotalRatingsCount);
            }
        } catch (error) {
            console.error("별점 전송 중 오류 발생:", error);
            alert("별점 저장 중 오류가 발생했습니다.");
        }
    };

    const isUserAllowedToRate = currentUserRating === null;

    const handleMouseEvents = (index, event, type) => {
        if (!isUserAllowedToRate) return;

        const { left, width } = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - left;
        const newHoverRating = mouseX < width / 2 ? index + 5 : index + 10;

        if (type === 'click') {
            handleRatingChange(newHoverRating);
        } else if (type === 'mousemove') {
            setHoverRating(newHoverRating);
        } else if (type === 'mouseleave') {
            setHoverRating(0);
        }
    };


    return (
        <>
            <div className="star-rating">
                {[0, 10, 20, 30, 40].map((index) => {
                    let starImage;
                    const effectiveRating = (currentUserRating?.rating || hoverRating || rating);

                    if (effectiveRating >= index + 10) {
                        starImage = starFull;
                    } else if (effectiveRating >= index + 5) {
                        starImage = starHalf;
                    } else {
                        starImage = starEmpty;
                    }

                    return (
                        <img
                            key={index}
                            src={starImage}
                            alt={`${index + 1} star`}
                            onClick={(event) => handleMouseEvents(index, event, 'click')}
                            onMouseMove={(event) => handleMouseEvents(index, event, 'mousemove')}
                            onMouseLeave={(event) => handleMouseEvents(index, event, 'mouseleave')}
                            style={{ cursor: isUserAllowedToRate ? 'pointer' : 'default', width: '24px', height: '24px' }}
                        />
                    );
                })}
                <p id="star2">사용자 평점: {((currentUserRating?.rating >= 0 ? currentUserRating.rating : hoverRating || 0) / 10).toFixed(1)} / 5.0</p>
            </div>
            <p id="star">평균 평점: {(averageRating / 10).toFixed(1)} / 5.0</p>
        </>
    );
};

export default StarRating;
