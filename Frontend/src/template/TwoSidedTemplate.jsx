import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const TwoSidedTemplate = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div>
            {/* Left Side - Menu */}
            <Typography variant="h5" gutterBottom>
              Menu
            </Typography>
            {/* Add your menu items here */}
          </div>
        </Grid>
        <Grid item xs={12} md={9}>
          <div>
            {/* Right Side - Content */}
            <Typography variant="h4" gutterBottom>
              Welcome to My App
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                type="password"
              />
              <Button variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TwoSidedTemplate;
