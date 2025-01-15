import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import GetProduits from '../component/produit/GetProduits';

export default function ProduitPage() {
  return (
    <>
      <Helmet>
        <title>Produits</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Produits
          </Typography>
          <Button component={Link} to="/dashboard/ajoutproduit" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetProduits />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
