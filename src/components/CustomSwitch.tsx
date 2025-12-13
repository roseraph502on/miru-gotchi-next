import { styled, Switch } from '@mui/material';

const CustomSwitch = styled(Switch)(() => ({
  width: 72,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 3,
    transform: 'translateX(3px)',
    '&.Mui-checked': {
      transform: 'translateX(39px)',
      color: '#fff',
      '& .MuiSwitch-thumb': {
        backgroundColor: '#86B4EB',
      },
      '& + .MuiSwitch-track': {
        backgroundColor: '#86b4ebe1',
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#cccccc',
    },
    '& + .MuiSwitch-track': {
      backgroundColor: '#e0e0e0',
    },
  },
  '& .MuiSwitch-thumb': {
    width: 26,
    height: 26,
  },
  '& .MuiSwitch-track': {
    borderRadius: 16,
    opacity: 1,
    boxSizing: 'border-box',
  },
}));

export default CustomSwitch;
