import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddTracteur from '../component/tracteur/AddTracteur';
import { Link } from 'react-router-dom';

export default function AjoutTracteurPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'une tracteur</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un tracteur
          </Typography>
          <Button component={Link} to="/dashboard/tracteur" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddTracteur />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
