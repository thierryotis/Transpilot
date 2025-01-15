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
import GetBennes from '../component/benne/GetBennes';

export default function BennePage() {
  return (
    <>
      <Helmet>
        <title>Bennes</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bennes
          </Typography>
          <Button component={Link} to="/dashboard/ajoutbenne" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <GetBennes />
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
