import React from 'react';
import starEmpty from '../assets/star1.png'; // 빈 별
import starHalf from '../assets/star2.png';  // 반 별
import starFull from '../assets/star3.png';  // 꽉 찬 별
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
    const handleClick = (index) => {
        const newRating = (rating === index + 1) ? // 이미 꽉 찬 별이면
            index + 0.5 :
            (index + 1); // 반별 또는 꽉 찬 별로 설정
        onRatingChange(newRating > 5 ? 5 : newRating); // 최대 5로 제한
    };

    return (
        <div className="star-rating">
            {[0, 1, 2, 3, 4].map((index) => {
                let starImage;

                if (rating >= index + 1) {
                    starImage = starFull; // 꽉 찬 별
                } else if (rating >= index + 0.5) {
                    starImage = starHalf; // 반 별
                } else {
                    starImage = starEmpty; // 빈 별
                }

                return (
                    <img
                        key={index}
                        src={starImage}
                        alt={`${index + 1} star`}
                        onClick={() => handleClick(index)}
                        style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                    />
                );
            })}
            <p>평점: {rating} / 5</p>
        </div>
    );
};

export default StarRating;
