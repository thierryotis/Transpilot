import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../../server";
import { getChauffeurs } from "../chauffeur/chauffeur";
import { getProduits } from "../produit/produit";
import { getProprios } from "../proprios/proprio";
import DatePicker from "react-datepicker";
import Cookies from "js-cookie";
import {  getTracteurByPrestataire,  getBennesByPrestataire} from "../camion/camion";
import { getLieux } from "../lieu/lieu";
import "react-datepicker/dist/react-datepicker.css";

const defaultTheme = createTheme();

const AddChargement = () => {
  const [numeroChargement, setNumeroChargement] = useState("");
  const [numeroBordereau, setNumeroBordereau] = useState("");
  const [numeroBonCommande, setNumeroBonCommande] = useState("0");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [lieuxOptions, setLieuxOptions] = useState([]);
  const [poidsCamionCharge, setPoidsCamionCharge] = useState("");
  const [poidsCamionVide, setPoidsCamionVide] = useState("");
  const [prestataire, setPrestataire] = useState("");
  const [prestataireOptions, setPrestataireOptions] = useState([]);
  const [immatTracteur, setImmatTracteur] = useState("");
  const [tracteurOptions, setTracteurOptions] = useState([]);
  const [immatBenne, setImmatBenne] = useState("");
  const [benneOptions, setBenneOptions] = useState([]);
  const [chauffeurId, setChauffeurId] = useState("");
  const [chauffeurOptions, setChauffeurOptions] = useState([]);
  const [poidsChargement, setPoidsChargement] = useState("");
  const [typeProduitOptions, setTypeProduitOptions] = useState([
    { id: "id", nom: "nom", type: "type" },
  ]);
  const [typeProduitId, setTypeProduitId] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  //const lieux = ['Kribi', 'Foumban']

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      numero_chargement: numeroChargement,
      numero_bordereau: numeroBordereau,
      numero_bon_commande: numeroBonCommande,
      date: date,
      lieu: lieu,
      poids_camion_vide: poidsCamionVide,
      poids_camion_charge: poidsCamionCharge,
      prestataire_id: prestataire, // Add the prestataire field
      immatTracteur: immatTracteur, // Add the immatTracteur field
      immatBenne: immatBenne, // Add the immatBenne field
      chauffeur_id: chauffeurId,
      type_produit_id: typeProduitId,
      client_id: 1,
    };
    const token = Cookies.get("jwt");
    axios
      .post(`${serverUrl}/api/chargement/addchargement`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization de la requête
        },
      })
      .then((response) => {
        console.log(response.data); // Server response
        toast.success("Chargement added successfully");
        setNumeroBordereau("");
        setNumeroBonCommande("0");
        setDate("");
        setLieu("");
        setPoidsCamionCharge("");
        setPoidsCamionVide("");
        setPrestataire("");
        setImmatTracteur("");
        setImmatBenne("");
        setChauffeurId("");
        setTypeProduitId("");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };
  useEffect(() => {
    // Fetch chauffeur data from the server
    const fetchChauffeurs = async () => {
      await getChauffeurs()
        .then((el) => {
          setChauffeurOptions(el);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if needed
        });
    };
    fetchChauffeurs();
  }, [prestataire]);
  useEffect(() => {
    // Fetch prestataires (proprios)
    getProprios()
      .then((el) => {
        setPrestataireOptions(el);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let fetchData = async () => {
      console.log("gettings tracteurs");
      if (prestataire !== "") {
        try {
          const tracteurData = await getTracteurByPrestataire(prestataire);
          setTracteurOptions(tracteurData);
        } catch (error) {
          console.error(error);
          // Handle error if needed
        }
      }
    };

    fetchData();
  }, [prestataire]);

  useEffect(() => {
    let fetchData = async () => {
      if (prestataire !== "") {
        try {
          const benneData = await getBennesByPrestataire(prestataire);
          setBenneOptions(benneData);

          const tracteurData = await getTracteurByPrestataire(prestataire);
          setTracteurOptions(tracteurData);
        } catch (error) {
          console.error(error);
          // Handle error if needed
        }
      }
    };

    fetchData();
  }, [prestataire]);

  //calcul poids du chargement
  useEffect(() => {
    setPoidsChargement(poidsCamionCharge - poidsCamionVide);
  }, [poidsCamionCharge, poidsCamionVide]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produitsData = await getProduits();
        setTypeProduitOptions(produitsData);

        const lieuxData = await getLieux();
        setLieuxOptions(lieuxData);
      } catch (error) {
        console.error(error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

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
          Ajouter un Chargement
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputLabel id="prestataire-label">Prestataire</InputLabel>
          <Select
            labelId="prestataire-label"
            id="prestataire"
            value={prestataire}
            onChange={(e) => setPrestataire(e.target.value)}
            fullWidth
          >
            {prestataireOptions.map((prestataire) => (
              <MenuItem key={prestataire.id} value={prestataire.id}>
                {prestataire.nom}
              </MenuItem>
            ))}
          </Select>
          {/* <TextField
            margin="normal"
            fullWidth
            id="numero_chargement"
            label="Numero du Chargement"
            name="numero_chargement"
            autoFocus
            value={numeroChargement}
            onChange={(e) => setNumeroChargement(e.target.value)}
          /> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="numero_bordereau"
            label="Numero Bordereau"
            name="numero_bordereau"
            autoFocus
            value={numeroBordereau}
            onChange={(e) => setNumeroBordereau(e.target.value)}
          />
          <InputLabel id="immatTracteur-label">
            Immatriculation Tracteur
          </InputLabel>
          <Select
            labelId="immatTracteur-label"
            id="immatTracteur"
            value={immatTracteur}
            onChange={(e) => {
              setImmatTracteur(e.target.value);
            }}
            fullWidth
          >
            {tracteurOptions.map((t) => (
              <MenuItem key={t.id} value={t.immat}>
                {t.immat}
              </MenuItem>
            ))}
          </Select>
          {/*<TextField
            margin="normal"
            required
            fullWidth
            name="immatBenne"
            label="Immatriculation de la Benne"
            id="immatBenne"
            value={immatBenne}
            InputProps={{
              readOnly: true,
            }}
            onChange={(e) => setImmatBenne(e.target.value)}
          />*/}
          <InputLabel id="immatBenne-label">Immatriculation benne</InputLabel>
          <Select
            labelId="immatBenne-label"
            id="immatTracteur"
            value={immatBenne}
            onChange={(e) => {
              setImmatBenne(e.target.value);
            }}
            fullWidth
          >
            {benneOptions.map((b) => (
              <MenuItem key={b.id} value={b.immat}>
                {b.immat}
              </MenuItem>
            ))}
          </Select>
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
                placeholderText="Date"
                inline
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleDatePickerClick}
              >
                Selectionner
              </Button>
            )}
          </div>
          <InputLabel id="lieuId-label">Lieu</InputLabel>
          <Select
            labelId="LieuId-label"
            id="lieuId"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
            fullWidth
          >
            {lieuxOptions.map((l) => (
              <MenuItem key={l.id} value={l.id}>
                {l.nom}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_vide"
            label="Poids Camion pesée à vide"
            id="poids_camion_vide"
            value={poidsCamionVide}
            onChange={(e) => setPoidsCamionVide(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_charge"
            label="Poids Camion pesé à plein"
            id="poids_camion_charge"
            value={poidsCamionCharge}
            onChange={(e) => setPoidsCamionCharge(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_chargement"
            label="Poids du chargement"
            id="poids chargement"
            value={poidsChargement > 0 ? poidsChargement : ""}
            InputProps={{
              readOnly: true,
              style: {
                color: poidsChargement > 45 ? "red" : "inherit",
              },
            }}
            onChange={(e) => setPoidsChargement(e.target.value)}
          />

          <Autocomplete
            id="chauffeurId"
            options={chauffeurOptions}
            getOptionLabel={(option) => option.nom}
            onChange={(event, newValue) => {
              setChauffeurId(newValue.id); // Définir la valeur de chauffeurId avec l'objet option complet
              console.log(newValue.id);
            }}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Chauffeur" />
            )}
          />

          <InputLabel id="typeProduitId-label">Type Produit</InputLabel>

          {typeProduitOptions ? (
            <Select
              labelId="typeProduitId-label"
              id="typeProduitId"
              value={typeProduitId}
              onChange={(e) => setTypeProduitId(e.target.value)}
              fullWidth
            >
              {typeProduitOptions.map((typeProduit) => (
                <MenuItem key={typeProduit.id} value={typeProduit.id}>
                  {typeProduit.nom}
                </MenuItem>
              ))}
            </Select>
          ) : null}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddChargement;
