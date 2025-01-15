import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';
import { RoleContext } from '../../RoleContext'; 



const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

const GetDechargements = () => {
  Modal.setAppElement('#root'); 
  const userRole = useContext(RoleContext);
  const [dechargements, setDechargements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDechargement, setSelectedDechargement] = useState(null);
  const navigate = useNavigate();
  const openModal = (dechargement) => {
    setSelectedDechargement(dechargement);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDechargement(null);
    setModalOpen(false);
  };

  const deleteDechargement = (id) => {
    const token = Cookies.get('jwt')
    axios
      .delete(`${serverUrl}/api/dechargement/deletedechargement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      })
      .then((response) => {
        if (response.data.success) {
          const token = Cookies.get('jwt')
          toast.success('Dechargement supprimé avec success');
          // Refresh the list of dechargements after deletion
          axios
            .get(`${serverUrl}/api/dechargement/getdechargements`, {headers: {
              Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
            }})
            .then((response) => {
              setDechargements(response.data.dechargements);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Error deleting the dechargement');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while deleting the dechargement');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    const token = Cookies.get('jwt')
    axios
      .get(`${serverUrl}/api/dechargement/getdechargements`,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      }) // Assuming the server is running on the same host
      .then((response) => {
        setDechargements(response.data.dechargements);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° </TableCell>
              <TableCell>Bord.</TableCell>
              <TableCell>Etat Camion</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Lieu </TableCell>
              <TableCell>Pds Camion - Pesée à plein</TableCell>
              <TableCell>Poids Camion - Pesée à vide</TableCell>
              <TableCell>Poids Chargement</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {dechargements.map((dechargement, i) => (
              <TableRow key={dechargement.id}>
                <TableCell>{i+1} </TableCell>
                <TableCell>{dechargement.numero_bordereau}</TableCell>
                <TableCell>{dechargement.etat_camion}</TableCell>
                <TableCell>{dechargement.date}</TableCell>
                <TableCell>{dechargement.lieu_nom}</TableCell>
                <TableCell>{dechargement.poids_camion_decharge}</TableCell>
                <TableCell>{dechargement.poids_camion_apres_chargement}</TableCell>
                <TableCell>{dechargement.poids_camion_decharge - dechargement.poids_camion_apres_chargement}</TableCell>
                {(userRole == 'admin') && (<TableCell>
                <Button onClick={() => {
                    Cookies.set('dechargement', JSON.stringify(dechargement));
                    navigate('/dashboard/modifydechargement');
                }}>
                    <EditIcon />
                </Button>
                  <Button onClick={() => openModal(dechargement)}>
                    <DeleteIcon />
                  </Button>
                </TableCell> )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedDechargement && (
          <>
            <h2>Confirmation</h2>
            <p>Do you really want to delete this dechargement?</p>
            <Button onClick={() => deleteDechargement(selectedDechargement.id)}>Confirm</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default GetDechargements;
