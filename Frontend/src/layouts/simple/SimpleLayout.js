import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// component
import Logo from '../../component/logo';

// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(2, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 4, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Logo />
      </StyledHeader>

      <Outlet />
    </>
  );
}