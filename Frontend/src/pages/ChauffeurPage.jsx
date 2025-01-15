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
import GetChauffeurs from '../component/chauffeur/GetChauffeurs';

export default function ChauffeurPage() {
  return (
    <>
      <Helmet>
        <title>Chauffeurs</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Chauffeurs
          </Typography>
          <Button component={Link} to="/dashboard/ajoutchauffeur" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetChauffeurs />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
