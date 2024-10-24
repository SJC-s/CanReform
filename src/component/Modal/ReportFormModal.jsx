import React, {useState} from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import '/src/css/RfBoard/ReportFormModal.css';

const ReportFormModal = ({ show, handleClose, handleSubmit, postId }) => {
    const [reportContent, setReportContent] = useState('');

    const handleSubmitForm = (e) => {
        e.preventDefault();
        handleSubmit({ reportContent }); // 데이터 제출
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>신고하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitForm}>
                    <div className="mb-3">
                        <label htmlFor="reportTitle" className="form-label">제목 </label><br/>
                        <input type={"text"} className={"reportTitle"} />
                        <br/>
                        <br/>
                        <label htmlFor="reportContent" className="form-label">내용</label>
                        <textarea
                            id="reportContent"
                            className="form-control reportContent"
                            rows={10}
                            value={reportContent}
                            onChange={(e) => setReportContent(e.target.value)}
                            required
                        />
                    </div>
                    <div  className="btnModal">
                        <Button variant="primary" type="submit">제출</Button>
                        <Button variant="danger" onClick={handleClose}>닫기</Button>
                    </div>

                </form>
            </Modal.Body>
        </Modal>
    );
};

export default ReportFormModal;
