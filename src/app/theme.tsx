import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    // 기본 폰트
    fontFamily:  'Galmuri14, DNFBitBitv2',
    body1: {
      fontSize: '13px',
    },
  },
  palette: {
    // 테마 색상 팔레트: primary / secondary / error 등
    // main 값은 컴포넌트에서 기본적으로 사용하는 색상입니다.
    primary: {
      main: '#ffffffde',
      // contrastText: "#fff" // 필요 시 대비 텍스트 색 지정
    },
    secondary: {
      main: '#B0E501',
      // contrastText: "#FAFDFF"
    },
    error: {
      // 에러(오류) 색상
      main: '#b60f0fff',
    },
    background: {
      // 전역 배경 색상 (default), Paper 컴포넌트 배경 색상
      default: '#F1D4E3',
      paper: '#e0abc6ff',
    },
    text: {
      primary: '#050505',
      secondary: '#FAFDFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face{
          font-family:'DNFBitBitv2';
          src:url('//cdn.df.nexon.com/img/common/font/DNFBitBitv2.otf')format('opentype');
          font-style:normal;
          font-weight:400;
        }
        @font-face {
          font-family: 'Galmuri14';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri14.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#86B4EB',
          color: '#FAFDFF',
          fontFamily: 'Galmuri14',
          letterSpacing: '0.025em',
          /*
            기본 버튼 스타일
          */
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#7358B1',
            boxShadow: 'none',
          },
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          backgroundColor: '#93CAC8',
          color: '#FAFDFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#7358B1',
          },
        },
        containedError: {
          // 에러
          backgroundColor: '#FF1010',
          color: '#FAFDFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#d11818',
          },
        },
        sizeLarge: {
          padding: '8px 32px',
          fontWeight: 700,
          fontSize: '16px',
        },
      },
    },
    //탭
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: '700',
          '&:focus': {
            outline: 'none',
          },
        },
        textColorPrimary: {
          color: 'rgba(5, 5, 5, 0.6)',
        },
      },
    },
    //체크박스
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(5,5,5,0.5)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 24,
          border: '3px solid #000',
          borderRadius: 12,
          '& .MuiLinearProgress-bar': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

export default theme;