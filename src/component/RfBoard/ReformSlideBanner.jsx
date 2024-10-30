import {useEffect, useState} from "react";
import "/src/css/RfBoard/ReformSlideBanner.css"

const images = [
    "Banner-1.png",
    "Banner-2.png",
    "Banner-3.png"
];

export default function ReformSlideBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500);

        return () => clearInterval(intervalId);
    }, [currentIndex]);

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
        <div className="slider slider-container">
            <button className="prev" onClick={goToPrevious}>
                &#10094;
            </button>
            <div className="slide-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
                        <img src={`/upload/imgBanner/${image}`} alt={`slide-${index}`} />
                    </div>
                ))}
            </div>
            <button className="next" onClick={goToNext}>
                &#10095;
            </button>
            <div className="banner-list-container">
                <ul className="banner-list">
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