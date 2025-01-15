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
import GetChargements from '../component/chargement/GetChargements';

export default function ChargementPage() {
  return (
    <>
      <Helmet>
        <title>Chargements</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chargements
          </Typography>
          <Button component={Link} to="/dashboard/ajoutchargement" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetChargements />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
