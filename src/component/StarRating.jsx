import React, { useState } from 'react';
import starEmpty from '../assets/star1.png'; // 빈 별
import starHalf from '../assets/star2.png';  // 반 별
import starFull from '../assets/star3.png';  // 꽉 찬 별
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (newRating) => {
        onRatingChange(newRating > 5 ? 5 : newRating);
    };

    const handleMouseMove = (index, event) => {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const mouseX = event.clientX - left;
        const newHoverRating = mouseX < width / 2 ? index + 0.5 : index + 1;
        setHoverRating(newHoverRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div className="star-rating">
            {[0, 1, 2, 3, 4].map((index) => {
                let starImage;
                const effectiveRating = hoverRating || rating;

                if (effectiveRating >= index + 1) {
                    starImage = starFull;
                } else if (effectiveRating >= index + 0.5) {
                    starImage = starHalf;
                } else {
                    starImage = starEmpty;
                }

                return (
                    <img
                        key={index}
                        src={starImage}
                        alt={`${index + 1} star`}
                        onClick={() => handleClick(effectiveRating)}
                        onMouseMove={(event) => handleMouseMove(index, event)}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                    />
                );
            })}
            <p id="star2">평점: {rating} / 5</p>
        </div>
    );
};

export default StarRating;
