import React, { useState, useEffect } from "react";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
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
  Paper, Button 
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { toast } from 'react-toastify';
import { serverUrl } from "../../server";
import Cookies from "js-cookie";
import { RoleContext } from "../../RoleContext";
import Modal from 'react-modal';

const defaultTheme = createTheme();

const modalStyles = {
  content: {
    width: "400px", // Adjust the width as needed
    height: "200px", // Adjust the height as needed
    margin: "auto",
  },
};

const GetBennes = () => {
  Modal.setAppElement("#root"); // Replace '#root' with the ID of your root element
  const userRole = useContext(RoleContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingInProgress, setLoading] = useState(false);
  const token = Cookies.get("jwt");
  const [bennes, setBennes] = useState([]);
  const [selectedBenne, setSelectedBenne] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false); // Add a state to track if data is loaded
  const navigate = useNavigate();

  const openModal = (benne) => {
    setSelectedBenne(benne);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBenne(null);
    setModalOpen(false);
  };

  const deleteBenne = (id) => {
    const token = Cookies.get('jwt');
    axios
      .delete(`${serverUrl}/api/benne/deletebenne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header of the request
        }
      })
      .then((response) => {
        if (response.data.success) {
          toast.success('Benne deleted successfully');
          // Refresh the list of bennes after deletion
          const token = Cookies.get('jwt');
          axios
            .get(`${serverUrl}/api/benne/getbennes`, {
              headers: {
                Authorization: `Bearer ${token}` // Add the token in the Authorization header of the request
              }
            })
            .then((response) => {
              setBennes(response.data.bennes);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Error deleting the benne');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while deleting the debenne');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    const fetchBennes = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/benne/getbennes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBennes(response.data.bennes);
        setDataLoaded(true); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchBennes();
  }, [token]);

  return (
    <>
      
      {dataLoaded ? ( // Check if data is loaded before rendering
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell>Immatriculation</TableCell>
                <TableCell>Prestataire</TableCell>
                {userRole == "admin" && <TableCell>Actions</TableCell>}
                {/* Add more table headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bennes.map((benne, index) => (
                <TableRow key={benne.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{benne.immat}</TableCell>
                  <TableCell>{benne.proprio_nom}</TableCell>
                  {userRole == "admin" && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          Cookies.set("benne", JSON.stringify(benne));
                          navigate("/dashboard/updatebenne");
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button onClick={() => openModal(benne)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  )}
                  {/* Add more table cells for additional benne data */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Loading...</p>
      )}
      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedBenne && (
          <>
            <h2>Confirmation</h2>
            <p>Supprimer le chargement?</p>
            <Button onClick={() => deleteBenne(selectedBenne.id)}>Confirmer</Button>
            <Button onClick={closeModal}>Annuler</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default GetBennes;
