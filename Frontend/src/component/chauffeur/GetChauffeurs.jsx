import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import Cookie from 'js-cookie';
import {  useNavigate } from "react-router-dom";
import { serverUrl } from '../../server';
import { toast } from "react-toastify";
import Cookies from 'js-cookie'

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

export default function GetChauffeurs() {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [chauffeurs, setChauffeurs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChauffeur, setSelectedChauffeur] = useState(null);
  const navigate = useNavigate();

  const openModal = (chauffeur) => {
    setSelectedChauffeur(chauffeur);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedChauffeur(null);
    setModalOpen(false);
  };

  const deleteChauffeur = (id) => {
    const token = Cookie.get('jwt');
    axios.delete(`${serverUrl}/api/chauffeur/deletechauffeur/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true})
      .then(response => {
        if (response.data.success) {
          toast.success('Chauffeur supprimé avec succès');
          // Refresh the list of chauffeurs after deletion
          axios.get(`${serverUrl}/api/chauffeur/getchauffeurs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true})
            .then(response => {
              setChauffeurs(response.data.chauffeurs);
            })
            .catch(error => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Erreur lors de la suppression du chauffeur');
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Une erreur s\'est produite lors de la suppression du chauffeur');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };


  useEffect(() => {
    const token = Cookie.get('jwt');
    axios.get(`${serverUrl}/api/chauffeur/getchauffeurs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true}) // Assuming the server is running on the same host
      .then(response => {
        setChauffeurs(response.data.chauffeurs);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>CNI</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Prestataire</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chauffeurs.map((chauffeur, index) => (
              <TableRow key={chauffeur.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{chauffeur.nom}</TableCell>
                <TableCell>{chauffeur.CNI}</TableCell>
                <TableCell>{chauffeur.phone}</TableCell>
                <TableCell>{chauffeur.proprio_nom}</TableCell>
                <TableCell>
                <Button onClick={() => {
                    Cookies.set('chauffeur', JSON.stringify(chauffeur));
                    navigate('/dashboard/updatechauffeur');
                }}>
                    <EditIcon />
                </Button>
                  <Button onClick={() => openModal(chauffeur)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedChauffeur && (
          <>
            <h2>Confirmation</h2>
            <p>Voulez-vous vraiment supprimer ce chauffeur ?</p>
            <Button onClick={() => deleteChauffeur(selectedChauffeur.id)}>Confirmer</Button>
            <Button onClick={closeModal}>Annuler</Button>
          </>
        )}
      </Modal>
    </>
  );

}
