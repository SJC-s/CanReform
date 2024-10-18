import { Button, Col, DropdownButton, DropdownItem, Nav, Row } from 'react-bootstrap';
import './Layout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import logo_sample from '../public/upload/logo_sample.svg';

function SpreadBtn() {
    return (
        <DropdownButton className="spread-button" drop="down" title={<FontAwesomeIcon icon={faBars} />}>
            <DropdownItem><Link to="/" className=""><div>홈페이지</div></Link></DropdownItem>
            <DropdownItem><Link to="/posts" className=""><div>게시판</div></Link></DropdownItem>
            <DropdownItem><Link to="#" className="">일정관리</Link></DropdownItem>
        </DropdownButton>
    );
}

export default function LayoutHeader() {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="d-flex justify-content-between align-items-center header-custom">
                        <SpreadBtn />
                        <div className="logo justify-content-center">
                            <img src={logo_sample} alt="LOGO" className="logo-image" />
                        </div>
                        <Nav className="justify-content-end gap-2 nav-custom">
                            <Button><a href="http://192.168.0.25:8080/login" className="text-reset">로그인</a></Button>
                            <Button><a href="/signup" className="text-reset">회원가입</a></Button>
                            <Button><a href="/mypage" className="text-reset">내정보</a></Button>
                            <Button><a href="http://192.168.0.25:8080/logout" className="text-reset">로그아웃</a></Button>
                        </Nav>
                    </div>
                </Col>
            </Row>
        </>
    );
}