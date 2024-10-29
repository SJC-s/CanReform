import { useEffect, useState } from 'react';
import proverbs from '../../proverbs.json';
import '/src/css/RfLayout/Layout.css';

export default function RotatingProverb () {
    // 현재 시간에 따라 시작 인덱스를 설정
    const currentHour = new Date().getHours();
    const initialIndex = currentHour % proverbs.length;
    const [currentProverbIndex, setCurrentProverbIndex] = useState(initialIndex);
    const [fadeState, setFadeState] = useState('fade-in');

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeState('fade-out');
            setTimeout(() => {
                setCurrentProverbIndex((prevIndex) => (prevIndex + 1) % proverbs.length);
                setFadeState('fade-in');
            }, 1000); // 1초 동안 fade-out 후 속담 변경
        }, 5000); // 5초마다 속담 변경

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rotating-proverb">
            <div className={`proverb-banner ${fadeState}`} style={{ padding: '10px', textAlign: 'center', fontStyle: 'italic' }}>
                <span className="proverb-text" style={{transform:  fadeState === 'fade-in' ? 'scale(1)' : 'scale(0.5)'}}>
                    {proverbs[currentProverbIndex].proverb}
                </span>
            </div>
        </div>
    );
};
