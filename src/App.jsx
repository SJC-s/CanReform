import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import MainPage from "./component/RfMain/MainPage.jsx";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LayoutHeader from "./component/RfLayout/LayoutHeader.jsx";
import LayoutFooter from "./component/RfLayout/LayoutFooter.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import ReformPage from "./component/RfBoard/ReformPage.jsx";
import Signup from "./component/RfAuthorization/Signup.jsx";
import Login from "./component/RfAuthorization/Login.jsx";
import {useEffect, useState} from "react";





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
                        <Route path="/" element={<MainPage/>} /> {/* 메인 페이지 */}
                        <Route path="/posts/*" element={<ReformPage isLoggedIn={isLoggedIn}/>} /> {/* 게시판 페이지 */}
                        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn}/>} />
                        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                    </Routes>
                    {/* footer 메뉴 */}
                    <LayoutFooter/>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}