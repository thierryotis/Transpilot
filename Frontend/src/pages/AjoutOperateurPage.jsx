import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddOperateur from '../component/operateur/AddOperateur';
import { Link } from 'react-router-dom';

export default function AjoutOperateurPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un Operateur</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un Operateur
          </Typography>
          <Button component={Link} to="/dashboard/operateur" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddOperateur />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
