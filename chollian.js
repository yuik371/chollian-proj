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

// 화면 중앙에 텍스트를 표시하는 박스 생성
const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '100%',
    height: '100%',
    content: '', // 초기 텍스트
    tags: true,
    border: {
        type: 'line'
    },
    style: {
        fg: '#FFFFFF', // 흰색 글자
        bg: '#000080', // 진한 파랑 배경
        border: {
            fg: '#FFFFFF' // 흰색 테두리
        }
    }
});

// 박스를 화면에 추가
screen.append(box);

// 인트로 로고 화면 (30초 대기)
const showIntroLogo = () => {
    box.setContent('');
    
    box.setLine(1, ' {red-fg}DA{/red-fg}{cyan-fg}COM{/cyan-fg}');
    
    box.setLine(5, '{cyan-fg}       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{/cyan-fg}');
    box.setLine(7, '                                              {cyan-fg}      __{/cyan-fg}');
    box.setLine(8, '                                              {cyan-fg}   _ /  \\{/cyan-fg}');
    box.setLine(9, '                        첨단정보통신서비스    {cyan-fg}  _ _/   /{/cyan-fg}');
    box.setLine(10, '                   {bold}{cyan-fg}  _____  _      __{/cyan-fg}     {cyan-fg} _/_/    /{/cyan-fg}');
    box.setLine(11, '                   {bold}{cyan-fg} |_   _|| |    |  |{/cyan-fg}    {cyan-fg}/_/      /{/cyan-fg}');
    box.setLine(12, '                   {bold}{cyan-fg}   | |  | |__  |  |{/cyan-fg}    {cyan-fg}       _/{/cyan-fg}');
    box.setLine(13, '                   {bold}{cyan-fg}   |_|  |____| |__|{/cyan-fg}    {cyan-fg}     _/{/cyan-fg}');
    box.setLine(14, '                   {bold}{cyan-fg}    천  리  안   {/cyan-fg}     {cyan-fg}  __/{/cyan-fg}');
    box.setLine(16, '                          C H O L L I A N');
    
    box.setLine(20, ' DL2 Ver 3.0                                  {blink}아무키나 누르세요...{/blink}');
    box.setLine(22, '{center}{yellow-fg}[ 30초 후 자동으로 연결이 시작됩니다 ]{/yellow-fg}{/center}');

    box.setLine(30, '{center}Copyright 1994 DACOM Corp.{/center}');
    box.setLine(32, '{center}Copyright 2026 Dev@Yuik Corp.{/center}');
    
    screen.render();

    // 이미 다음 단계로 넘어 갔는지 확인하는 변수
    let movedNext = false;

    const goNext = () => {
        if (!movedNext) {
            movedNext = true; // 다음 단계로 이동했음을 표시
            clearTimeout(autoTimer); // 자동 타이머 취소
            screen.removeListener('keypress', onKeyPress); // 키 입력 리스너 제거
            box.setContent('');
            showRegistrationMenu(); // 가입 안내 화면으로 이동
        }
    };

    // 30초 후 자동으로 다음 단계로 이동하는 타이머
    const autoTimer = setTimeout(goNext, 30000);

    // 키 입력 리스너 (아무키나 누르면 다음 단계로 이동)
    const onKeyPress = (ch, key) => {
        goNext();
    };

    setTimeout(() => {
        screen.on('keypress', onKeyPress);
    }, 500); // 약간의 지연 후 키 입력 리스너 등록 (인트로가 완전히 렌더링된 후)
}
