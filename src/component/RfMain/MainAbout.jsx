import '../../css/RfMain/MainAbout.css';


export default function MainAbout() {
    const images = [
        "01.png",
        "02.png",
        "03.png"
    ];


    return (
        <div className="main-about-container">
            <h1 className="main-about-h">조직도</h1>
            <hr/>
            <div className="main-about-div">
                <h5 className="main-about-h">General Manager</h5>
                <h2 className="main-about-h">SJC-s</h2>
                <div>
                    <img className="main-about-img" src={`/upload/imgAbout/${images[0]}`} alt={`${images[0]}`}/>
{/*                    <ul className="main-about-ul">
                        <li>다람쥐 헌 쳇바퀴에 타고파</li>
                        <li>간장공장공장장은강공장장이고된장공장공장장은공공장장이다</li>
                        <li>대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>*/}
                </div>
                <hr className="main-about-hr"/>
                <h5 className="main-about-h">Assistant Manager</h5>
                <h2 className="main-about-h">samesamessa</h2>
                <div>
                    <img className="main-about-img" src={`/upload/imgAbout/${images[1]}`} alt={`${images[1]}`}/>
{/*                    <ul className="main-about-ul">
                        <li>다람쥐 헌 쳇바퀴에 타고파</li>
                        <li>간장공장공장장은강공장장이고된장공장공장장은공공장장이다</li>
                        <li>대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>*/}
                </div>
                <hr/>
                <h5 className="main-about-h">Assistant Manager</h5>
                <h2 className="main-about-h">kyungwook7</h2>
                <div>
                    <img className="main-about-img" src={`/upload/imgAbout/${images[2]}`} alt={`${images[2]}`}/>
{/*                    <ul className="main-about-ul">
                        <li>다람쥐 헌 쳇바퀴에 타고파</li>
                        <li>간장공장공장장은강공장장이고된장공장공장장은공공장장이다</li>
                        <li>대통령은 국회에 출석하여 발언하거나 서한으로 의견을 표시할 수 있다.</li>
                        <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                    </ul>*/}
                </div>
            </div>

        </div>
    );
}
