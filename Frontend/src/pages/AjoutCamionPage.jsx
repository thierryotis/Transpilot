import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddCamion from '../component/camion/AddCamion';
import { Link } from 'react-router-dom';

export default function AjoutCamionPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un Véhicule</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un véhicule
          </Typography>
          <Button component={Link} to="/dashboard/camion" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddCamion />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
