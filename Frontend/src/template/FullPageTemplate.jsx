import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import Login from "../component/Login"

const FullPageTemplate = () => {
  return (
    <Container maxWidth="sm">
      <Login />
    </Container>
  );
};

export default FullPageTemplate;
