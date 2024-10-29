import {Button, DropdownButton, DropdownItem, Nav} from 'react-bootstrap';
import '../../css/RfLayout/Layout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import RotatingProverb from "./RotatingProverb.jsx";
import {checkAdminRole} from "../RfAuthorization/AdminAuth.js";

export default function LayoutHeader({ isLoggedInId, setIsLoggedInId }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState(''); // 활성화된 버튼 상태 관리
    const [isAdmin, setIsAdmin] = useState(null); // 관리자 계정 여부

    useEffect(() => {
        setActiveButton(location.pathname); // URL에 따라 활성화된 버튼 설정
    }, [location.pathname]);

    useEffect(() => {
        if (isLoggedInId) {
            const fetchAdminRole = async () => {
                const result = await checkAdminRole(isLoggedInId, navigate);
                setIsAdmin(result === 1);
            };
            fetchAdminRole();
        }
    }, [isLoggedInId, navigate]);

    const handleLogout = () => {
        // 로그아웃 처리
        localStorage.removeItem("token"); // 토큰 삭제
        setIsLoggedInId(''); // 로그인 상태 변경
        navigate("/"); // 로그아웃 후 메인 페이지로 이동
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); // 활성화된 버튼 설정
        navigate(buttonName); // 해당 버튼에 따라 페이지 이동
    };

    const handleGoReport = async () => {
        if (isAdmin) {
            navigate('/report');
        } else {
            alert("접근 권한이 없습니다.")
            navigate(0);   // 이전 페이지로 이동
        }
    };


    return (
        <>
            <div className="header-custom">
                <div className="d-flex justify-content-between align-items-center header-width-max-custom">
                    <div className="logo justify-content-center">
                        <img src="/upload/logo.svg" alt="LOGO" className="logo-image" onClick={()=>navigate('/')}/>
                    </div>
                    <Nav className="nav-justified gap-5 nav-custom">
                        <Button className={`nav-btn ${activeButton === '/' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/')}>
                            MAIN
                            <span className="dot"></span>
                        </Button>
                        <Button className={`nav-btn ${activeButton === '/service' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/service')}>
                            SERVICE
                            <span className="dot"></span>
                        </Button>
                        <Button className={`nav-btn ${activeButton === '/posts' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/posts')}>
                            BOARD
                            <span className="dot"></span>
                        </Button>
                        <Button className={`nav-btn ${activeButton === '/about' ? 'active' : ''}`}
                                onClick={() => handleButtonClick('/about')}>
                            ABOUT
                            <span className="dot"></span>
                        </Button>
                    </Nav>
                    <DropdownButton className="spread-button" drop="down" title={<FontAwesomeIcon icon={faBars} />}>
                        { !isLoggedInId ? (
                            <>
                                <DropdownItem variant="outline-secondary" as={Link} to="/login" className="navbtn btn1">로그인</DropdownItem>
                                <DropdownItem variant="outline-secondary" as={Link} to="/signup" className="navbtn btn2">회원가입</DropdownItem>
                            </>
                        ) : (
                            <>
                                <DropdownItem variant="outline-secondary" as={Link} to="/mypage" className="navbtn btn3">내정보</DropdownItem>
                                {isLoggedInId && isAdmin ? <DropdownItem variant="outline-secondary" onClick={handleGoReport} className="navbtn btn4">신고 처리</DropdownItem>
                                    : <></>
                                }
                                <DropdownItem variant="outline-secondary" onClick={handleLogout} className="navbtn btn4">로그아웃</DropdownItem>
                            </>
                        )}
                    </DropdownButton>
                </div>
            </div>
            <RotatingProverb/>
        </>
    );
}