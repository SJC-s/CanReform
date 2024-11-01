import React from 'react';
import '../../css/RfMain/MainAbout.css';


export default function MainAbout() {
    const images = [
        "01.png",
        "02.png",
        "03.png"
    ];


    return (
        <div className="main-about-container">
            <h1>조직도</h1>
            <div>
                <h5>General Manager</h5>
                <h2>SJC-s</h2>
                <p>
                    <img src={`/upload/imgAbout/${images[0]}`} alt={`${images[0]}`}/>
                    <ul>
                        <li>다람쥐 헌 쳇바퀴에 타고파</li>
                        <li>간장공장공장장은강공장장이고된장공장공장장은공공장장이다</li>
                        <li>대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>
                </p>
                <hr/>
                <h5>Assistant Manager</h5>
                <h2>samesamessa</h2>
                <p>
                    <img src={`/upload/imgAbout/${images[1]}`} alt={`${images[1]}`}/>
                    <ul>
                        <li>다람쥐 헌 쳇바퀴에 타고파</li>
                        <li>간장공장공장장은강공장장이고된장공장공장장은공공장장이다</li>
                        <li>대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>
                </p>
                <hr/>
                <h5>Assistant Manager</h5>
                <h2>kyungwook7</h2>
                <p>
                    <img src={`/upload/imgAbout/${images[2]}`} alt={`${images[2]}`}/>
                    <ul>
                        <li>다람쥐 헌 쳇바퀴에 타고파</li>
                        <li>간장공장공장장은강공장장이고된장공장공장장은공공장장이다</li>
                        <li>대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>
                </p>
            </div>

        </div>
    );
}
