import { Form } from "react-bootstrap";

function ReformFormFields({ title, setTitle, category, setCategory, isPrivate, setIsPrivate, content, setContent, allowedExtensions, handleFileChange, filePreviews }) {
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
                <Form.Label>첨부 파일 (허용된 파일: {allowedExtensions.join(", ")})</Form.Label>
                <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*" // 이미지 파일만 선택 가능
                />
                <div className="mt-3">
                    {filePreviews.length > 0 && (
                        <div>
                            <h5>이미지 미리보기</h5>
                            {filePreviews.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt="미리보기"
                                    style={{ maxWidth: "200px", marginRight: "10px" }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Form.Group>
        </>
    );
}

export default ReformFormFields;
