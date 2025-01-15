import React from 'react';
import { Helmet } from 'react-helmet-async';
import {  Card,  Stack,  Button,  Container,  Typography,} from '@mui/material';
import { Link } from 'react-router-dom';
import Iconify from '../component/iconify';
import Scrollbar from '../component/scrollbar';
import GetOperateur from '../component/operateur/GetOperateur';

export default function OperateurPage() {
  return (
    <>
      <Helmet>
        <title>Operateurs</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Operateurs
          </Typography>
          <Button component={Link} to="/dashboard/ajoutoperateur" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetOperateur />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
