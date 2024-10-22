import { Outlet } from "react-router-dom";
import '../../css/RfLayout/Layout.css';
import LayoutHeader from "./LayoutHeader.jsx";
import LayoutFooter from "./LayoutFooter.jsx";
import {Col, Container} from 'react-bootstrap';


export default function Layout() {
    return (
        <Container fluid className="container">
            <LayoutHeader/>
                <Col xs={12}>
                    {/* 페이지별 콘텐츠가 여기 Outlet에 렌더링됨 */}
                    <Outlet />
                </Col>
            <LayoutFooter/>
        </Container>
    );
}
