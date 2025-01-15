import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddChauffeur from '../component/chauffeur/AddChauffeur';
import { Link } from 'react-router-dom';

export default function AjoutChauffeurPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un Chauffeur</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un Chauffeur
          </Typography>
          <Button component={Link} to="/dashboard/chauffeur" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddChauffeur />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
