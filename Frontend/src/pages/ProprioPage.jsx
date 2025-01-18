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
  import GetProprios from '../component/proprios/getProprios';




  export default function ProprioPage() {
    return (
      <>
        <Helmet>
          <title>Prestataires</title>
        </Helmet>

        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            Prestataires
            </Typography>
            <Button component={Link} to="/dashboard/ajoutproprio" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Nouveau
            </Button>
          </Stack>

          <Card>
            <Scrollbar>
            <GetProprios />
            </Scrollbar>
          </Card>
        </Container>
      </>
    );
  }
