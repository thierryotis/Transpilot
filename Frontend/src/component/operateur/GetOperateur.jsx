import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import Cookie from 'js-cookie';

import { serverUrl } from '../../server';
import { toast } from "react-toastify";

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

export default function GetOperateurs() {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [operateurs, setOperateurs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOperateur, setSelectedOperateur] = useState(null);

  const openModal = (operateur) => {
    setSelectedOperateur(operateur);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOperateur(null);
    setModalOpen(false);
  };

  const deleteOperateur = (id) => {
    axios.delete(`${serverUrl}/api/operateur/deleteoperateur/${id}`)
      .then(response => {
        if (response.data.success) {
          toast.success('Operateur supprimé avec succès');
          // Refresh the list of operateurs after deletion
          axios.get(`${serverUrl}/api/operateur/getoperateurs`)
            .then(response => {
              setOperateurs(response.data.operateurs);
            })
            .catch(error => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Erreur lors de la suppression du operateur');
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Une erreur s\'est produite lors de la suppression du operateur');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };


  useEffect(() => {
    const token = Cookie.get('jwt');
    axios.get(`${serverUrl}/api/operateur/getoperateurs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true}) // Assuming the server is running on the same host
      .then(response => {
        setOperateurs(response.data.operateurs);
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
              <TableCell>Number</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>CNI</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operateurs.map((operateur, index) => (
              <TableRow key={operateur.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{operateur.nom}</TableCell>
                <TableCell>{operateur.CNI}</TableCell>
                <TableCell>{operateur.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(operateur)}><EditIcon /></Button>
                  <Button onClick={() => openModal(operateur)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false}>
        {selectedOperateur && (
          <>
            <h2>Confirmation</h2>
            <p>Voulez-vous vraiment supprimer ce operateur ?</p>
            <Button onClick={() => deleteOperateur(selectedOperateur.id)}>Confirmer</Button>
            <Button onClick={closeModal}>Annuler</Button>
          </>
        )}
      </Modal>
    </>
  );

}
