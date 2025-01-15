import { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import Cookies from 'js-cookie'
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const [nom, setNom] = useState('')
  useEffect(()=>{
    const n = Cookies.get('nom')
    setNom(n)
  }, [])
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handlePassModify = () => {
    navigate("/modifypassword");
  }

  const handleLogout = ()=>{
    setOpen(null);
    const token = Cookies.get('jwt');
    Cookies.remove('jwt')
    Cookies.remove('nom')
    Cookies.remove('role')
    Cookies.remove('userid')
    navigate("/login");
    window.location.reload(true); 
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {nom}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handlePassModify} sx={{ m: 1 }}>
          Modifier le Mot de passe
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
