import { useState, useEffect } from 'react';
import '../../../public/css/MainSlide.css';

const images = [
    "imgSlide01.jpg",
    "imgSlide02.jpg",
    "imgSlide03.jpg",
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

    function goToSlide(index) {
        setCurrentIndex(index);
    }

    return (
        <div className="container">
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
                <ul className="banner-list gap-3">
                    {images.map((image, index) => (
                    <div key={index}>
                        <button
                            className={index === currentIndex ? "active" : ""}
                            onClick={()=> goToSlide(index)}>
                        </button>
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
