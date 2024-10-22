import { Outlet } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import '../../css/RfLayout/Layout.css';


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

                        <div className="copyrignt tail">
                            <table className="tail-table">
                                <thead>

                                </thead>
                                <tbody>
                                <tr>
                                    <td>(주)하이미디어멀티캠퍼스</td>
                                    <td><span className="slash">|</span>서울 구로구 경인로 557 삼영빌딩 4층 ((주)하이미디어멀티캠퍼스)</td>
                                    <td colSpan="2"><span className="slash">|</span>대표자 : 허미라</td>
                                </tr>
                                <tr>
                                    <td>사업자등록번호 : 113-81-80177</td>
                                    <td><span className="slash">|</span>기관명칭 : 하이미디어멀티캠퍼스</td>
                                    <td><span className="slash">|</span>통신판매업신고 : 제4312호</td>
                                    <td><span className="slash">|</span>기관등록번호 : 제2520호</td>
                                </tr>
                                <tr>
                                    <td colSpan="4">copyright ⓒHimedia Academy, All Rights Reserved.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </footer>
                </Col>
            </Row>
        </>
    );
}