import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddDechargement from '../component/dechargement/Adddechargement';
import { Link } from 'react-router-dom';

export default function AjoutDechargementPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un Déchargement</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un Déchargement
          </Typography>
          <Button component={Link} to="/dashboard/dechargement" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddDechargement />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
