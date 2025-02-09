import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { serverUrl } from "../../server";
import Cookies from "js-cookie";
import { RoleContext } from "../../RoleContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from "@mui/system";

const modalStyles = {
  content: {
    width: "400px",
    height: "200px",
    margin: "auto",
  },
};

const GetDechargements = () => {
  Modal.setAppElement("#root");
  const userRole = useContext(RoleContext);
  const [dechargements, setDechargements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDechargement, setSelectedDechargement] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingInProgress, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("jwt");

  const openModal = (dechargement) => {
    setSelectedDechargement(dechargement);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDechargement(null);
    setModalOpen(false);
  };

  const deleteDechargement = (id) => {
    const token = Cookies.get("jwt");
    axios
      .delete(`${serverUrl}/api/dechargement/deletedechargement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Déchargement supprimé avec succès");
          fetchDechargements(page);
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error("Erreur lors de la suppression du déchargement");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "Une erreur est survenue lors de la suppression du déchargement"
        );
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  const fetchByBordereau = async () => {
    if (searchQuery === "") {
      toast.error("Le champs de recherche ne doit pas être vide");
    } else {
      try {
        const response = await axios.get(
          `${serverUrl}/api/dechargement/getdechargementbordereau/${searchQuery}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          setDechargements(
            Array.isArray(response.data.dechargements)
              ? response.data.dechargements
              : [response.data.dechargements]
          );
          setTotal(1);
        } else {
          setDechargements([]); // Vide la liste si rien n'est trouvé
          toast.error("Déchargement non trouvé");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchDechargements = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverUrl}/api/dechargement/getdechargements?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDechargements(response.data.dechargements);
      setTotal(response.data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDechargements(page);
  }, [page, limit]);

  return (
    <>
      <Container sx={{ mt: 3}}>
        <Box display="flex" alignItems="center" gap={2} width="50%" sx={{ mb: 3}}>
          <TextField
            label="Rechercher par numéro de bordereau"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={fetchByBordereau}
            variant="contained"
            color="primary"
          >
            Rechercher
          </Button>
        </Box>

        {loadingInProgress ? (
          <div className="loader-container">
            <ClipLoader color={"#fff"} size={150} />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N°</TableCell>
                  <TableCell>Bord.</TableCell>
                  <TableCell>Etat Camion</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Lieu</TableCell>
                  <TableCell>Pds Camion - Pesée à plein</TableCell>
                  <TableCell>Poids Camion - Pesée à vide</TableCell>
                  <TableCell>Poids Chargement</TableCell>
                  {userRole === "admin" && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {dechargements.map((dechargement, i) => (
                  <TableRow key={dechargement.id}>
                    <TableCell>{(page - 1) * limit + i + 1}</TableCell>
                    <TableCell>{dechargement.numero_bordereau}</TableCell>
                    <TableCell>{dechargement.etat_camion}</TableCell>
                    <TableCell>{dechargement.date}</TableCell>
                    <TableCell>{dechargement.lieu_nom}</TableCell>
                    <TableCell>{dechargement.poids_camion_decharge}</TableCell>
                    <TableCell>
                      {dechargement.poids_camion_apres_chargement}
                    </TableCell>
                    <TableCell>
                      {dechargement.poids_camion_decharge -
                        dechargement.poids_camion_apres_chargement}
                    </TableCell>
                    {userRole === "admin" && (
                      <TableCell>
                        <Button
                          onClick={() => {
                            Cookies.set(
                              "dechargement",
                              JSON.stringify(dechargement)
                            );
                            navigate("/dashboard/modifydechargement");
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button onClick={() => openModal(dechargement)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
              >
                Précédent
              </Button>
              {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  disabled={page === i + 1}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                onClick={() =>
                  setPage(Math.min(page + 1, Math.ceil(total / limit)))
                }
                disabled={page === Math.ceil(total / limit)}
              >
                Suivant
              </Button>
            </div>
          </TableContainer>
        )}
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          style={modalStyles}
        >
          {selectedDechargement && (
            <>
              <h2>Confirmation</h2>
              <p>Voulez-vous vraiment supprimer ce déchargement ?</p>
              <Button
                onClick={() => deleteDechargement(selectedDechargement.id)}
              >
                Confirmer
              </Button>
              <Button onClick={closeModal}>Annuler</Button>
            </>
          )}
        </Modal>
      </Container>
    </>
  );
};

export default GetDechargements;
