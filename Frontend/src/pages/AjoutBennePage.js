import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddBenne from '../component/benne/AddBenne';
import { Link } from 'react-router-dom';

export default function AjoutBennePage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'une benne</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'une benne
          </Typography>
          <Button component={Link} to="/dashboard/benne" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddBenne />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
