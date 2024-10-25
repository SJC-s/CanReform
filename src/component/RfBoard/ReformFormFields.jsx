import {Button, CloseButton, Col, Form, Row} from "react-bootstrap";
import {FaX} from "react-icons/fa6";

function ReformFormFields({ title, setTitle, category, setCategory, isPrivate, setIsPrivate, content,
                              setContent, allowedExtensions, handleFileChange, filePreviews, setFilePreviews, filenames, setFilenames }) {

    // 이미지 삭제 함수
    const handleImageDelete = (filenameToDelete) => {
        const updatedPreviews = filePreviews.filter((filename) => filename !== filenameToDelete);
        setFilePreviews(updatedPreviews);

        // 파일 이름도 업데이트
        const updatedFilenames = filenames.filter((filename) => !filenameToDelete.includes(filename));
        setFilenames(updatedFilenames);
    };

    return (
        <>
            <Form.Group controlId="postTitle">
                <Form.Label>제목</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="postCategory" className="mt-3">
                <Form.Label>카테고리</Form.Label>
                <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Inquiry">문의</option>
                    <option value="request">의뢰</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="postPrivate" className="mt-3">
                <Form.Check
                    type="checkbox"
                    label="공개 여부"
                    checked={isPrivate === "Y"}
                    onChange={(e) => setIsPrivate(e.target.checked ? "Y" : "N")}
                />
            </Form.Group>

            <Form.Group controlId="postContent" className="mt-3">
                <Form.Label>내용</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>사진 첨부 (최대 10MB, 허용되는 파일: {allowedExtensions.join(", ")})</Form.Label>
                <Col md={5}>
                <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*" // 이미지 파일만 선택 가능
                />
                </Col>
                <div className="mt-3">
                    {filePreviews.length > 0 && (
                        <div>
                            <h5>첨부파일 이미지 미리보기</h5>
                            <Row>
                                {filePreviews.map((preview, index) => (
                                    <Col key={index} md={2} className="mb-3 position-relative">
                                        <div style={{position: "relative"}}>
                                            <img
                                                key={index}
                                                src={preview}
                                                alt="미리보기"
                                                style={{maxWidth: "200px", marginRight: "10px", borderRadius: "4px"}}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                style={{position: 'absolute', top: '0px', right: '0px'}}
                                                onClick={() => handleImageDelete(preview)}
                                            >
                                                <CloseButton/>
                                            </Button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </div>
            </Form.Group>
        </>
    );
}

export default ReformFormFields;
