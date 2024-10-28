import React from 'react';
import '../../css/RfMain/MainService.css';

export default function ServiceInfo() {
    return (
        <div className="service-info">
            <h1>안내글</h1>

            <h2>CanReform에 오신 것을 환영합니다!</h2>
            <p>
                <span className="highlight">CanReform</span>은 개인 맞춤형 옷 리폼 서비스를 제공하는 온라인 플랫폼입니다. 여러분의 소중한 옷을 새로운 스타일로 변신시켜 드리기 위해, 문의 게시글과 의뢰 게시글을 통한 사진 첨부와 댓글을 통해 원하는 옷의 리폼 형태를 정밀하게 파악합니다.
            </p>

            <h2>우리의 미션</h2>
            <p>
                <span className="highlight">CanReform</span>의 목표는 각 고객의 독특한 요구사항을 충족시키는 것입니다. 우리는 단순한 옷 리폼 서비스를 넘어, 고객이 자신만의 개성을 표현할 수 있는 하나뿐인 옷을 제작할 수 있도록 돕습니다.
            </p>

            <h2>제공하는 서비스</h2>
            <ul>
                <li><strong>문의 게시글:</strong> 리폼에 대한 아이디어나 요청 사항을 자유롭게 게시하고 의견을 나눌 수 있습니다.</li>
                <li><strong>의뢰 게시글:</strong> 구체적인 리폼 의뢰를 진행하고 사진과 설명을 첨부하여 정확한 요구 사항을 전달할 수 있습니다.</li>
                <li><strong>댓글로 의견 교류:</strong> 게시글에 댓글을 달아 의뢰 내용을 더욱 세밀하게 조정하고, 완성된 리폼의 품질을 함께 평가합니다.</li>
                <li><strong>평점 기능:</strong> 우수한 리폼 결과물을 공유하고 평가할 수 있는 기능으로, 우수한 리폼업체와 작업물을 확인할 수 있습니다.</li>
            </ul>

            <h2>CanReform의 장점</h2>
            <ul>
                <li><span className="hlt1">고객 맞춤 디자인:</span> 각 고객의 선호와 스타일에 맞춘 개인화된 리폼 서비스를 제공합니다.</li>
                <li><span className="hlt2">품질과 신뢰:</span> 철저한 검증 과정을 거친 리폼 전문가들이 최고 품질의 서비스를 보장합니다.</li>
                <li><span className="hlt3">사용자 친화적 플랫폼:</span> 사용하기 쉬운 인터페이스와 효과적인 커뮤니케이션 도구로, 모든 과정이 간편하고 투명합니다.</li>
            </ul>

            <h2>고객의 목소리</h2>
            <p>
                귀하의 의견은 CanReform에게 매우 중요합니다. 언제든지 <a href="mailto:customer@canreform.com">고객 서비스 이메일</a>로 의견을 보내주시거나, 웹사이트 내 피드백 섹션에서 직접 피드백을 남겨주세요.
            </p>

            <div className="cta">
                <a href="/signup">회원 가입</a>
                <span> 또는 </span>
                <a href="/service">서비스 페이지 탐색</a>
            </div>
        </div>
    );
}
