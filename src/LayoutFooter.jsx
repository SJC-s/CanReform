import { Outlet } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import './Layout.css';


export default function LayoutFooter() {
    return (
        <>
            <Row>
                <Col xs={12}>
                    {/* 페이지별 콘텐츠가 여기 Outlet에 렌더링됨 */}
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
        </>
    );
}