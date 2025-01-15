import React, { lazy, Suspense } from 'react';
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../hooks/useResponsive';
// component
const LoginComponent = lazy(() => import('../component/Login'));

// Styling for the loading container
const LoadingContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // Adjust this as needed
});

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Container maxWidth="sm">
      <Suspense fallback={
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      }>
        <LoginComponent />
      </Suspense>
    </Container>
  );
}
