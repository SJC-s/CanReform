import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import MainScroll from "./commponent/RfMain/MainScroll.jsx";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ReformBoard from './commponent/RfBoard/ReformBoard.jsx';
import Layout from "./Layout.jsx";
import LayoutHeader from "./LayoutHeader.jsx";
import LayoutFooter from "./LayoutFooter.jsx";
import {QueryClient, QueryClientProvider} from "react-query"; // 게시판 컴포넌트



const queryClient = new QueryClient();
export default function App () {

    return (
        <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <div className="App">
                {/* 헤더 메뉴*/}
                {/*<header>*/}
                {/*    <nav className="navbar">*/}
                {/*        <ul>*/}
                {/*            <li>*/}
                {/*                <Link to="/">메인</Link>  메인 페이지로 이동*/}
                {/*            </li>*/}
                {/*            <li>*/}
                {/*                <Link to="/bulletin-board">게시판</Link>  게시판 페이지로 이동*/}
                {/*            </li>*/}
                {/*        </ul>*/}
                {/*    </nav>*/}
                {/*</header>*/}

                {/* 페이지 라우팅 설정 */}
                <LayoutHeader/>
                <Routes>
                        <Route path="/" element={<MainScroll />} /> {/* 메인 페이지 */}
                        <Route path="/bulletin-board" element={<ReformBoard />} /> {/* 게시판 페이지 */}
                </Routes>
                <LayoutFooter/>
            </div>
        </BrowserRouter>
        </QueryClientProvider>
    );
}