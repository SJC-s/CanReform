import {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import '/src/css/RfBoard/ReportFormModal.css';

const ReportFormModal = ({ show, handleClose, handleSubmit, postId, userId }) => {
    const [reportContent, setReportContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');    // 에러메세지 초기화
        const reportData = {
            reason : reportContent,
            postId : postId,
            userId : userId,
        };
        try {
            // handleSubmit 함수는 성공 시 true를 반환하도록 처리
            const success = await handleSubmit({ reportData });

            if (success) {
                handleClose(); // 성공하면 모달을 닫음
                setReportContent('')
                alert('성공적으로 제출했습니다.')
            } else {
                setErrorMessage('신고 제출 중 오류가 발생했습니다.');
            }
        } catch (error) {
            setErrorMessage(`신고 제출 중 오류가 발생했습니다. 에러 내용 : ` + error);
        }
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
                    {errorMessage && <p>{errorMessage}</p>} {/* 에러 메시지 표시 */}
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
