import React, {useState, useEffect} from 'react'
import { Button, TextField, Typography, Container, Select, MenuItem, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../server';
import { getChauffeurs } from '../chauffeur/chauffeur';
import { getCamions } from '../camion/camion';
import { getProduits } from '../produit/produit';
import { getProprios } from '../proprios/proprio';
import DatePicker from 'react-datepicker';
import Cookies from 'js-cookie';

import 'react-datepicker/dist/react-datepicker.css';

const defaultTheme = createTheme();

const UpdateChargement = () => {
    const [numeroBordereau, setNumeroBordereau] = useState('');
    const [numeroBonCommande, setNumeroBonCommande] = useState('');
    const [date, setDate] = useState('');
    const [lieu, setLieu] = useState('');
    const [poidsCamionCharge, setPoidsCamionCharge] = useState('');
    const [poidsCamionVide, setPoidsCamionVide] = useState('');
    const [prestataire, setPrestataire] = useState('');
    const [prestataireOptions, setPrestataireOptions] = useState([]);
    const [immatTracteur, setImmatTracteur] = useState('');
    const [tracteurOptions, setTracteurOptions] = useState([]);
    const [immatBenne, setImmatBenne] = useState('');
    const [chauffeurId, setChauffeurId] = useState('');
    const [chauffeurOptions, setChauffeurOptions] = useState([]);
    const [camionOptions, setCamionOptions] = useState([]);
    const [camionId, setCamionId] = useState('');
    const [typeProduitId, setTypeProduitId] = useState('');
    const [poidsChargement, setPoidsChargement] = useState('');
    const [typeProduitOptions, setTypeProduitOptions] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const lieux = ['Kribi', 'Foumban']


    //set data from cookies
    useEffect(()=>{
        setLieu(Cookies.get(chargement.lieu))
    }, [])

  return (
    <div>updateChargement</div>
  )
} 

export default UpdateChargement