import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import AddProduit from '../component/produit/AddProduit';
import { Link } from 'react-router-dom';

export default function AjoutProduitPage() {
  return (
    <>
      <Helmet>
        <title>Ajout d'un Produit</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ajout d'un Produit
          </Typography>
          <Button component={Link} to="/dashboard/produit" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Liste
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <AddProduit />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
