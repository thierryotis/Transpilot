import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../../server";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getLieux } from "../lieu/lieu";
import Cookies from "js-cookie";

const defaultTheme = createTheme();

const AddDechargement = () => {
  const [numeroBordereau, setNumeroBordereau] = useState("");
  const [numeroBonCommande, setNumeroBonCommande] = useState(0);
  const [etatCamion, setEtatCamion] = useState("");
  const [date, setDate] = useState("");
  const [lieuDechargement, setLieuDechargement] = useState("Yaoundé");
  const [lieuxOptions, setLieuxOptions] = useState([]);
  const [poidsCamionDecharge, setPoidsCamionDecharge] = useState("");
  const [poidsCamionApresChargement, setPoidsCamionApresChargement] =
    useState("");
  const [chargementId, setChargementId] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chargements, setChargements] = useState([]);
  const [operateurId, setOperateurId] = useState("");

  const token = Cookies.get("jwt");

  // Récupérer tous les chargements non déchargés
  const getUndeChargedChargements = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/chargement/getundechargedchargements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChargements(response.data.chargements);
    } catch (error) {
      console.error(error);
      toast.error(
        "Erreur lors de la récupération des chargements non déchargés"
      );
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      etatCamion === "" ||
      date === "" ||
      poidsCamionDecharge === "" ||
      poidsCamionApresChargement === "" ||
      chargementId === ""
    ) {
      toast.error("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    const data = {
      numero_bordereau: numeroBordereau,
      numero_bon_commande: numeroBonCommande,
      etat_camion: etatCamion,
      date: date,
      lieu_dechargement: lieuDechargement,
      poids_camion_decharge: poidsCamionDecharge,
      poids_camion_apres_chargement: poidsCamionApresChargement,
      chargement_id: chargementId,
      operateur_id: operateurId,
    };

    axios
      .post(`${serverUrl}/api/dechargement/adddechargement`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Déchargement ajouté avec succès");
        getUndeChargedChargements();
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erreur lors de l'ajout du déchargement");
      });
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setNumeroBordereau("");
    setNumeroBonCommande(0);
    setEtatCamion("");
    setDate("");
    setLieuDechargement("Yaoundé");
    setPoidsCamionDecharge("");
    setPoidsCamionApresChargement("");
    setChargementId("");
  };

  // Gérer la sélection de la date
  const handleDatePickerClick = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (selectedDate) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  // Récupérer les lieux et les chargements non déchargés au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lieuxData = await getLieux();
        setLieuxOptions(lieuxData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setOperateurId(Cookies.get("userid"));
    getUndeChargedChargements();
  }, []);

  // Récupérer les détails du chargement sélectionné
  const selectedChargement = chargements.find(
    (c) => c.numero_bordereau === numeroBordereau
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Ajout Déchargement
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputLabel id="proprioId-label">Bordereau chargement</InputLabel>
          <Select
            labelId="bordereauId-label"
            id="bordereauId"
            value={numeroBordereau}
            onChange={(e) => {
              setNumeroBordereau(e.target.value);
              const result = chargements.find(
                (obj) => obj.numero_bordereau === e.target.value
              );
              setChargementId(result.id);
            }}
            fullWidth
          >
            {chargements.map((c) => (
              <MenuItem key={c.id} value={c.numero_bordereau}>
                {c.numero_bordereau}
              </MenuItem>
            ))}
          </Select>

          {/* Afficher les détails du chargement sélectionné */}
          {selectedChargement && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <Typography variant="h6">Informations du Chargement</Typography>
              <Typography>
                <strong>Numéro de Bordereau :</strong>{" "}
                {selectedChargement.numero_bordereau}
              </Typography>
              {/* <Typography>
                <strong>Numéro de Bon de Commande :</strong>{" "}
                {selectedChargement.numero_bon_commande}
              </Typography> */}
              <Typography>
                <strong>Date :</strong>{" "}
                {moment(selectedChargement.date).format("DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography>
                <strong>Lieu :</strong>{" "}
                {lieuxOptions.find(
                  (lieu) => lieu.id === parseInt(selectedChargement.lieu)
                )?.nom || "Inconnu"}
              </Typography>
              {/* <Typography>
                <strong>Poids Camion Vide :</strong>{" "}
                {selectedChargement.poids_camion_vide}
              </Typography>
              <Typography>
                <strong>Poids Camion Chargé :</strong>{" "}
                {selectedChargement.poids_camion_charge}
              </Typography> */}
              <Typography>
                <strong>Chauffeur :</strong> {selectedChargement.chauffeur_nom}
              </Typography>
              <Typography>
                <strong>Tracteur :</strong> {selectedChargement.tracteur_immat}
              </Typography>
              <Typography>
                <strong>Benne :</strong> {selectedChargement.benne_immat}
              </Typography>
              <Typography>
                <strong>Produit :</strong> {selectedChargement.produit_nom}
              </Typography>
              <Typography>
                <strong>Prestataire :</strong>{" "}
                {selectedChargement.prestataire_nom}
              </Typography>
            </div>
          )}

          {/* Autres champs du formulaire */}
          {/* <TextField
            margin="normal"
            fullWidth
            name="numero_bon_commande"
            label="Numero Bon Commande"
            id="numero_bon_commande"
            value={numeroBonCommande}
            onChange={(e) => setNumeroBonCommande(e.target.value)}
          /> */}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleDatePickerClick}
              >
                Sélectionner
              </Button>
            )}
          </div>
          <InputLabel id="lieuId-label">Lieu</InputLabel>
          <Select
            labelId="LieuId-label"
            id="lieuId"
            value={lieuDechargement}
            onChange={(e) => setLieuDechargement(e.target.value)}
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
            name="poids_camion_apres_chargement"
            label="Poids Camion chargé - A l'arrivée"
            id="poids_camion_apres_chargement"
            value={poidsCamionApresChargement}
            onChange={(e) => setPoidsCamionApresChargement(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="poids_camion_decharge"
            label="Poids camion vide - Après déchargement"
            id="poids_camion_decharge"
            value={poidsCamionDecharge}
            onChange={(e) => setPoidsCamionDecharge(e.target.value)}
          />
          <Typography>
            <strong>Poids :</strong>{" "}
            {poidsCamionApresChargement - poidsCamionDecharge}
          </Typography>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Ajouter
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddDechargement;
