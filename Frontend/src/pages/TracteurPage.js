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
import GetTracteurs from '../component/tracteur/GetTracteurs';

export default function TracteurPage() {
  return (
    <>
      <Helmet>
        <title>Tracteurs</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tracteurs
          </Typography>
          <Button component={Link} to="/dashboard/ajouttracteur" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetTracteurs />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
