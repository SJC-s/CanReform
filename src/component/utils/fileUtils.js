// 허용할 확장자 목록
export const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

// 확장자 확인 함수
export const isValidExtension = (filename) => {
    const extension = filename.split('.').pop().toLowerCase(); // 파일 확장자 추출
    return allowedExtensions.includes(extension);
};

// 파일 필터링 함수
export const filterValidFiles = (files) => {
    const validFiles = files.filter((file) => isValidExtension(file.name));

    if (validFiles.length !== files.length) {
        alert("허용된 확장자 파일만 업로드할 수 있습니다: " + allowedExtensions.join(", "));
    }
    return validFiles;
};
