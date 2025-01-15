import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddChargement from '../component/chargement/AddChargement';
import { Link } from 'react-router-dom';

export default function AjoutChargementPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un Chargement</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un Chargement
          </Typography>
          <Button component={Link} to="/dashboard/chargement" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddChargement />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
