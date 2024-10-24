import {Button, Col, DropdownButton, DropdownItem, Nav, Row} from 'react-bootstrap';
import '../../css/RfLayout/Layout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";

export default function LayoutHeader({ isLoggedInId, setIsLoggedInId }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        // 로그아웃 처리
        localStorage.removeItem("token"); // 토큰 삭제
        setIsLoggedInId(''); // 로그인 상태 변경
        navigate("/"); // 로그아웃 후 메인 페이지로 이동
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center header-custom">
                <div className="logo justify-content-center">
                    <img src="/upload/logo.svg" alt="LOGO" className="logo-image" onClick={()=>navigate('/')}/>
                </div>
                <Nav className="nav-justified gap-5 nav-custom">
                    <Button className="nav-btn" as={Link} to="/">
                        MAIN
                        <span className="dot"></span>
                    </Button>
                    <Button className="nav-btn" as={Link} to="/">
                        SERVICE
                        <span className="dot"></span>
                    </Button>
                    <Button className="nav-btn" as={Link} to="/posts">
                        BOARD
                        <span className="dot"></span>
                    </Button>
                    <Button className="nav-btn" as={Link} to="/posts">
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
                            <DropdownItem variant="outline-secondary" onClick={handleLogout} className="navbtn btn4">로그아웃</DropdownItem>
                        </>
                    )}
                </DropdownButton>
            </div>
        </>
    );
}