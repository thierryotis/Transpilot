import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { serverUrl } from "../../server";
import Cookies from "js-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import { RoleContext } from "../../RoleContext";

const modalStyles = {
  content: {
    width: "400px",
    height: "200px",
    margin: "auto",
  },
};

const GetChargements = () => {
  Modal.setAppElement("#root");
  const userRole = useContext(RoleContext);
  const [chargements, setChargements] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChargement, setSelectedChargement] = useState(null);
  const [loadingInProgress, setLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = (chargement) => {
    setSelectedChargement(chargement);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedChargement(null);
    setModalOpen(false);
  };

  const deleteChargement = (id) => {
    const token = Cookies.get("jwt");
    axios
      .delete(`${serverUrl}/api/chargement/deletechargement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Chargement deleted successfully");
          const token = Cookies.get("jwt");
          axios
            .get(`${serverUrl}/api/chargement/getchargements`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setChargements(response.data.chargements);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error("Error deleting the chargement");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while deleting the chargement");
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = Cookies.get("jwt");
      try {
        const response = await axios.get(
          `${serverUrl}/api/chargement/getchargements?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChargements(response.data.chargements);
        setTotal(response.data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, limit]); // Déclenche fetchData à chaque changement de `page` ou `limit`

  return (
    <>
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
                <TableCell>Date</TableCell>
                <TableCell>Lieu</TableCell>
                <TableCell>Poids</TableCell>
                <TableCell>Tracteur</TableCell>
                <TableCell>Benne</TableCell>
                <TableCell>Chauffeur</TableCell>
                <TableCell>Pdt</TableCell>
                <TableCell>Prestataire</TableCell>
                {userRole === "admin" && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {chargements.map((chargement, index) => (
                <TableRow key={chargement.id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{chargement.numero_bordereau}</TableCell>
                  <TableCell>{chargement.date}</TableCell>
                  <TableCell>{chargement.lieu_nom}</TableCell>
                  <TableCell>{chargement.poids_camion_charge}</TableCell>
                  <TableCell>{chargement.immatTracteur}</TableCell>
                  <TableCell>{chargement.immatBenne}</TableCell>
                  <TableCell>{chargement.chauffeur_nom}</TableCell>
                  <TableCell>{chargement.produit_nom}</TableCell>
                  <TableCell>{chargement.prestataire_nom}</TableCell>
                  {userRole === "admin" && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          Cookies.set("chargement", JSON.stringify(chargement));
                          navigate("/dashboard/updatechargement");
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button onClick={() => openModal(chargement)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
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
              onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)))}
              disabled={page === Math.ceil(total / limit)}
            >
              Next
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
        {selectedChargement && (
          <>
            <h2>Confirmation</h2>
            <p>Supprimer le chargement?</p>
            <Button onClick={() => deleteChargement(selectedChargement.id)}>
              Confirm
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};
export default GetChargements;