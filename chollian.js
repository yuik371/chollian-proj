const blessed = require('blessed');

// 환경 변수 강제 설정 (한글 깨짐 방지)
process.env.LANG = 'ko_KR.UTF-8';

// 화면 백그라운드 색상 설정
const screen = blessed.screen({
    smartCSR: true, // 최적화된 화면 렌더링
    title: 'Hitel/Chollian', // 타이틀
    backgroundColor: '#000080', // 진한 파랑 배경
    fullUnicode: true, // UTF-8 지원
    dockBorders: true, // 테두리 도킹 모드 활성화
    width: '80%', // 화면 너비 80%
    height: '35%' // 화면 높이 35%
});

