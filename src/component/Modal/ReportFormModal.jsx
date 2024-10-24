import {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import '/src/css/RfBoard/ReportFormModal.css';

const ReportFormModal = ({ show, handleClose, handleSubmit, postId, userId }) => {
    const [reportContent, setReportContent] = useState('');

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(userId);
        console.log(postId)
        const reportData = {
            reason : reportContent,
            postId : postId,
            userId : userId,
        };
        handleSubmit({reportData}) // 데이터 제출
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>신고하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitForm}>
                    <div className="mb-3">
                        <label htmlFor="reportContent" className="form-label">신고 내용</label>
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
