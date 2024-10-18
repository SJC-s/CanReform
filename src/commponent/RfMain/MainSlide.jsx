import { useState, useEffect } from 'react';
import '../../MainSlide.css';

const images = [
    "business.jpg",
    "marketing.jpg",
    "socialmedia.jpg",
];

export default function MainSlide() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="container">
            <div className='logoimg'>
                <img src={`/upload/logo_sample.svg`} alt='logo' />
            </div>
            <div className="slider">
                <button className="prev" onClick={goToPrevious}>
                    &#10094;
                </button>
                <div className="slide-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
                            <img src={`/upload/${image}`} alt={`slide-${index}`} />
                        </div>
                    ))}
                </div>
                <button className="next" onClick={goToNext}>
                    &#10095;
                </button>
            </div>
        </div>
    );
}
