import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainScroll from "./commponent/RfMain/MainScroll.jsx";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LayoutHeader from "./LayoutHeader.jsx";
import LayoutFooter from "./LayoutFooter.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import ReformPage from "./commponent/RfBoard/ReformPage.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import {useEffect, useState} from "react"; // 게시판 컴포넌트
import MainFade from "./commponent/RfMain/MainFade.jsx";
import MainSlide from "./commponent/RfMain/MainSlide.jsx"; // 게시판 컴포넌트




const queryClient = new QueryClient();
export default function App () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 여부 확인 (예: 로컬 스토리지에 토큰이 있는지 확인)
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 간주
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <div className="App">
                {/* Header 메뉴*/}
                <LayoutHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                {/* 페이지 라우팅 설정 */}
                <Routes>
                    <Route path="/1" element={<MainScroll/>} /> {/* 메인 페이지 */}
                    <Route path="/2" element={<MainFade/>} /> {/* 메인 페이지 */}
                    <Route path="/3" element={<MainSlide/>} /> {/* 메인 페이지 */}
                    <Route path="/posts/*" element={<ReformPage />} /> {/* 게시판 페이지 */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
                </Routes>
                {/* footer 메뉴 */}
                <LayoutFooter/>
            </div>
        </BrowserRouter>
        </QueryClientProvider>
    );
}