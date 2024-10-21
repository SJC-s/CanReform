import MainSlide from "./MainSlide.jsx";
import MainScroll from "./MainScroll.jsx";
import '../../../public/css/MainPage.css';

export default function MainPage() {

    return (
        <>
            <div className='logoimg'>
                <img src={`/upload/logo_sample.svg`} alt='logo' onClick={()=>{window.location.href='/'}}/>
            </div>
            <MainSlide/>
            <MainScroll/>
        </>
    )
}