import React, { useState, useEffect } from 'react';
import {  Button,  TextField,  Typography,  Container,InputLabel, Select, MenuItem} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Cookies from 'js-cookie';


const defaultTheme = createTheme();

const ModifyDechargement = () => {
    const initialdechargement = Cookies.get('dechargement') ? JSON.parse(Cookies.get('dechargement')) : {};
    const [numeroBordereau, setNumeroBordereau] = useState(initialdechargement.numero_bordereau);
    const [numeroBonCommande, setNumeroBonCommande] = useState(initialdechargement.numero_bon_commande);
    const [etatCamion, setEtatCamion] = useState(initialdechargement.etat_camion);
    const [date, setDate] = useState(initialdechargement.date);
    const [lieuDechargement, setLieuDechargement] = useState(initialdechargement.lieu_dechargement);
    const [poidsCamionDecharge, setPoidsCamionDecharge] = useState(initialdechargement.poids_camion_decharge);
    const [poidsCamionApresChargement, setPoidsCamionApresChargement] = useState(initialdechargement.poids_camion_apres_chargement);

    const [chargementId, setChargementId] = useState(initialdechargement.id);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [chargements, setChargements] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault();
      const data = {
        numero_bordereau: numeroBordereau,
        numero_bon_commande: numeroBonCommande,
        etat_camion: etatCamion,
        date: date,
        lieu_dechargement: lieuDechargement,
        poids_camion_decharge: poidsCamionDecharge,
        poids_camion_apres_chargement: poidsCamionApresChargement,
        chargement_id: chargementId,
      };
      const token = Cookies.get('jwt')

      const getChargementId = ()=>{

      }
    axios
      .post(`${serverUrl}/api/dechargement/updatedechargement/${chargementId}`,data,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      })
      .then((response) => {
        console.log(response.data); // Server response
        if(response.data.success)
            toast.success('Dechargement mis à jour avec succès');
        else toast.error('Erreur lors de la mise à jour')
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error('Echec lors de la mise à jour');
      });
  };

  useEffect(()=>{
    const token = Cookies.get('jwt')
    axios.get(`${serverUrl}/api/chargement/getchargements`, {
      headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }
    })
      .then(response => setChargements(response.data.chargements))
      .catch(error => {
        console.error(error);
        throw error;
      });
  }, [])

  const resetForm = () => {
    setNumeroBordereau('');
    setNumeroBonCommande('');
    setEtatCamion('');
    setDate('');
    setLieuDechargement('');
    setPoidsCamionDecharge('');
    setPoidsCamionApresChargement('');
    setChargementId('');
  };

  const handleDatePickerClick = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (selectedDate) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Mise à jour Déchargement
        </Typography>
        <form onSubmit={handleSubmit}>
          
          <InputLabel id="proprioId-label">Bordereau chargement</InputLabel>
          <TextField
            margin="normal"
            fullWidth
            name="numero_bon_commande"
            label="Numero Bon Commande"
            id="numero_bon_commande"
            value={numeroBordereau}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="numero_bon_commande"
            label="Numero Bon Commande"
            id="numero_bon_commande"
            value={numeroBonCommande}
            onChange={(e) => setNumeroBonCommande(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="etat_camion"
            label="Etat Camion"
            id="etat_camion"
            value={etatCamion}
            onChange={(e) => setEtatCamion(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="date"
            label="Date"
            id="date"
            value={date}
            InputProps={{
              readOnly: true,
            }}
          />
          <div className="wrapper">
            {showDatePicker ? (
              <DatePicker
                selected={date}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                onChange={handleDatePickerChange}
                inline
              />
            ) : (
              <Button variant="contained" color="primary" onClick={handleDatePickerClick}>
                Selectionner
              </Button>
            )}
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="lieu_dechargement"
            label="Lieu Dechargement"
            id="lieu_dechargement"
            value={lieuDechargement}
            onChange={(e) => setLieuDechargement(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_decharge"
            label="Poids Camion Decharge"
            id="poids_camion_decharge"
            value={poidsCamionDecharge}
            onChange={(e) => setPoidsCamionDecharge(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_apres_chargement"
            label="Poids Camion Apres Chargement"
            id="poids_camion_apres_chargement"
            value={poidsCamionApresChargement}
            onChange={(e) => setPoidsCamionApresChargement(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Mettre à jour
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default ModifyDechargement;
