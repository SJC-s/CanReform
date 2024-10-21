import {Route, Routes} from "react-router-dom";
import MainScroll from "./MainScroll.jsx";
import MainFade from "./MainFade.jsx";
import MainSlide from "./MainSlide.jsx";


export default function MainPage () {
    return (
/*        <Routes>
            <Route path="/2" element={<MainFade/>} /> {/!* 메인 페이지 *!/}
            <Route path="/" element={*/
                <>
                    <MainSlide /> {/* 메인 페이지 첫 부분 */}
                    <MainScroll /> {/* 메인 페이지 두 번째 부분 */}
                </>
/*            }/>
        </Routes>*/
    )
}