import {Outlet} from "react-router-dom";
import {
    Button, Col, Container,
    DropdownButton,
    DropdownItem,
    Nav, Row
} from 'react-bootstrap';
import './Layout.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";




function SpreadBtn() {
    return (
    <DropdownButton className="spread-button" drop="down" title={
        <FontAwesomeIcon icon={faBars}/>
    }>

        <DropdownItem>홈페이지</DropdownItem>
        <DropdownItem>게시판</DropdownItem>
        <DropdownItem>일정관리</DropdownItem>
    </DropdownButton>
    );
}


export default function Layout() {
    return (
        <Container fluid>
            <Row>
                <Col xs={12}>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center header-custom">
                        <SpreadBtn className="justify-content-start"/>
                        <div className="logo justify-content-center">
                            <img src="http://lonelyplanet.co.kr/upload/moduleBasic/e36b45e8-f88f-45eb-9240-88d7bee2ddac.jpg" alt="LOGO" className="logo-image"/>
                        </div>
                        <Nav className="justify-content-end gap-2 nav-custom">
                            <Button>로그인</Button>
                            <Button>회원가입</Button>
                            <Button>내정보</Button>
                            <Button>로그아웃</Button>
                        </Nav>
                    </div>
                    <hr/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>

                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Outlet />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <footer>
                        <p>@COPYLEFT</p>
                    </footer>
                </Col>
            </Row>
        </Container>
    )
}