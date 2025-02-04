import {useState} from "react";


export default function MainCoop() {
    const imgList = [
        "imgCoop01.png",
        "imgCoop02.png",
    ];
    const [image, setImage] = useState(imgList);
    const [index, setIndex] = useState(0);

     return (
        <>
            <div className="coop">
            <h5>협력업체</h5>
            </div>
            <div className="imgSet">
            {image.map((img, idx) =>
                (<div
                    key={idx}
                    className="coopImg">
                    <img style={{width:200}} src={`/upload/imgCoop/${img}`} alt={img}/>
                </div>))}
            </div>
        </>

)
}