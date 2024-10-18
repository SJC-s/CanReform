import { Button, Col, DropdownButton, DropdownItem, Nav, Row } from 'react-bootstrap';
import './Layout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import logo_sample from '../public/upload/logo_sample.svg';

function SpreadBtn() {
    return (
        <DropdownButton className="spread-button" drop="down" title={<FontAwesomeIcon icon={faBars} />}>
            <DropdownItem as={Link} to="/">
                홈페이지
            </DropdownItem>
            <DropdownItem as={Link} to="/posts">
                게시판
            </DropdownItem>
            <DropdownItem as={Link} to="#">
                일정관리
            </DropdownItem>
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
                            <Button variant="outline-secondary" as={Link} to="http://localhost:8080/login" className="text-reset">로그인</Button>
                            <Button variant="outline-secondary" as={Link} to="/signup" className="text-reset">회원가입</Button>
                            <Button variant="outline-secondary" as={Link} to="/mypage" className="text-reset">내정보</Button>
                            <Button variant="outline-secondary" as={Link} to="http://localhost:8080/logout" className="text-reset">로그아웃</Button>
                        </Nav>
                    </div>
                </Col>
            </Row>
        </>
    );
}