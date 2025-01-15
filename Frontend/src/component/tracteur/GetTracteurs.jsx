import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import {  useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { serverUrl } from "../../server";
import Cookies from "js-cookie";
import { RoleContext } from "../../RoleContext";


import Modal from "react-modal";
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

const modalStyles = {
  content: {
    width: "400px", // Adjust the width as needed
    height: "200px", // Adjust the height as needed
    margin: "auto",
  },
};

const GetTracteurs = () => {
  Modal.setAppElement("#root"); // Replace '#root' with the ID of your root element
  const userRole = useContext(RoleContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTracteur, setSelectedTracteur] = useState(null);
  const [tracteurs, setTracteurs] = useState([]);
  const token = Cookies.get("jwt");
  const navigate = useNavigate();

  const openModal = (tracteur) => {
    setSelectedTracteur(tracteur);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTracteur(null);
    setModalOpen(false);
  };

  const deleteTracteur = (id) => {
    const token = Cookies.get("jwt");
    axios
      .delete(`${serverUrl}/api/tracteur/deletetracteur/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Tracteur deleted successfully");
          // Refresh the list of tracteurs after deletion
          axios
            .get(`${serverUrl}/api/tracteur/gettracteurs`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setTracteurs(response.data.tracteurs);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error("Error deleting the tracteur");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while deleting the tracteur");
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    const fetchTracteurs = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/tracteur/gettracteurs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTracteurs(response.data.tracteurs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTracteurs();
  }, [token]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <Typography component="h1" variant="h5">
          List of Tracteurs
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Immatriculation</TableCell>
                {userRole === "admin" && <TableCell>Actions</TableCell>}
                {/* Add more table headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {tracteurs.map((tracteur) => (
                <TableRow key={tracteur.id}>
                  <TableCell>{tracteur.id}</TableCell>
                  <TableCell>{tracteur.immat}</TableCell>
                  {userRole === "admin" && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          Cookies.set("tracteur", JSON.stringify(tracteur));
                          // Replace the next line with your navigation logic
                          // Example: navigate("/dashboard/updatetracteur");
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button onClick={() => openModal(tracteur)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  )}
                  {/* Add more table cells for additional tracteur data */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
          {selectedTracteur && (
            <>
              <h2>Confirmation</h2>
              <p>Supprimer le tracteur?</p>
              <Button onClick={() => deleteTracteur(selectedTracteur.id)}>Confirmer</Button>
              <Button onClick={closeModal}>Annuler</Button>
            </>
          )}
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default GetTracteurs;
