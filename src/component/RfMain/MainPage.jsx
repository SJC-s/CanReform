import MainSlide from "./MainSlide.jsx";
import MainScroll from "./MainScroll.jsx";
import '../../css/MainPage.css';
import MainCoop from "./MainCoop.jsx";

export default function MainPage() {

    return (
        <>
            <div className='logoimg'>
                <img src={`/upload/logo.svg`} alt='logo' onClick={()=>{window.location.href='/'}}/>
            </div>
            <MainSlide/>
            <MainScroll/>
            <MainCoop/>
        </>
    )
}