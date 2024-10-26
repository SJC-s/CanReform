import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css'
import MainPage from "./component/RfMain/MainPage.jsx";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import LayoutHeader from "./component/RfLayout/LayoutHeader.jsx";
import LayoutFooter from "./component/RfLayout/LayoutFooter.jsx";
import {QueryClient, QueryClientProvider} from "react-query";
import ReformPage from "./component/RfBoard/ReformPage.jsx";
import Signup from "./component/RfAuthorization/Signup.jsx";
import Login from "./component/RfAuthorization/Login.jsx";
import {useEffect, useState} from "react";
import {GoogleOAuthProvider} from "@react-oauth/google"; // 게시판 컴포넌트
import {jwtDecode} from "jwt-decode";
import ReformReport from "./component/RfBoard/ReformReport.jsx";
import ReformReportDetail from "./component/RfBoard/ReformReportDetail.jsx"; // 게시판 컴포넌트

const queryClient = new QueryClient();
export default function App () {
    const [isLoggedInId, setIsLoggedInId] = useState(''); // id가 있으면 로그인으로 가정

    useEffect(() => {
        // 로그인 여부 확인 (예: 로컬 스토리지에 토큰이 있는지 확인)
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            setIsLoggedInId(decoded.sub); // 백엔드에서 JWT에 userId를 클레임으로 포함시켰다고 가정
        }

    }, []);


    return (
        <GoogleOAuthProvider clientId={"548795536953-gjsd2m5vvbrcmtp61vga5r59m8598va5.apps.googleusercontent.com"}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <div className="App">
                  {/* Header 메뉴*/}
                  <LayoutHeader isLoggedInId={isLoggedInId} setIsLoggedInId={setIsLoggedInId} />
                  {/* 페이지 라우팅 설정 */}
                  <Routes>
                      <Route path="/" element={<MainPage/>} /> {/* 메인 페이지 */}
                      <Route path="/posts/*" element={<ReformPage isLoggedInId={isLoggedInId}/>} /> {/* 게시판 페이지 */}
                      <Route path="/signup" element={ isLoggedInId ? <Navigate to="/" replace /> : <Signup />} />
                      <Route path="/login" element={ isLoggedInId ? <Navigate to="/" replace /> : <Login setIsLoggedInId={setIsLoggedInId}/>} />
                      <Route path="/report" element={<ReformReport isLoggedInId={isLoggedInId}/>} /> {/* 신고 처리 페이지 */}
                      <Route path="/report/details/:postId" element={<ReformReportDetail isLoggedInId={isLoggedInId}/>}/>
                  </Routes>
                  {/* footer 메뉴 */}
                  <LayoutFooter/>
              </div>
          </BrowserRouter>
        </QueryClientProvider>
        </GoogleOAuthProvider>
    );
}