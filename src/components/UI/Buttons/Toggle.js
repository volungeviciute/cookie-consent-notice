import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { FormControlLabel, Typography } from '@mui/material';
import { useConsentContext } from '../../../store/ConsentContext';

// checks if the current toggle should be enabled or not
const isToggleChecked = (id, collection) => {
  if (Array.isArray(id)) {
    return id.some((x) => collection.includes(x));
  }
  return collection.includes(id);
};

function Toggle(props) {
  const { state, dispatch } = useConsentContext();
  const [checked, setCheckedState] = useState(isToggleChecked(props.id, state));

  const toggleChecked = () => {
    setCheckedState((prev) => {
      if (!props.id) return !prev;
      if (!prev) {
        // means that the current change is going to be checked (true), so update the state
        dispatch({
          type: 'add',
          id: props.id,
        });
      } else {
        // else, means that the toggle is unchecked, so remove id from state
        dispatch({
          type: 'remove',
          id: props.id,
        });
      }
      return !prev;
    });
  };

  useEffect(() => {
    setCheckedState(isToggleChecked(props.id, state));
  }, [state, checked, props]);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName='.Mui-focusVisible'
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#4C9D49',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor:'#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));
  return (
    <FormControlLabel
      label={
        <Typography
          color={checked ? '#4C9D49' : 'common.black'}
          sx={{ fontSize: 10 }}
        >
          {checked ? 'ĮJUNGTA' : 'IŠJUNGTA'}
        </Typography>
      }
      labelPlacement='bottom'
      control={
        <IOSSwitch sx={{ mx: 1 }} checked={checked} onChange={toggleChecked} />
      }
    />
  );
}

export default Toggle;
