import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';


import {serverUrl} from '../../server';
import { toast } from "react-toastify";

const modalStyles = {
    content: {
      width: '400px', // Adjust the width as needed
      height: '200px', // Adjust the height as needed
      margin: 'auto',
    },
  };

export default function GetProprios() {
    Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [proprios, setProprios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProprio, setSelectedProprio] = useState(null);

  const openModal = (proprio) => {
    setSelectedProprio(proprio);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setSelectedProprio(null);
    setModalOpen(false);
  };

  const deleteProprio = (id) => {
    axios.delete(`${serverUrl}/api/proprio/deleteproprio/${id}`)
      .then(response => {
        if (response.data.success) {
          toast.success('Propriétaire supprimé avec succès');
          // Refresh the list of proprios after deletion
          axios.get(`${serverUrl}/api/proprio/getproprios`)
            .then(response => {
              setProprios(response.data.proprios);
            })
            .catch(error => {
              console.error(error);
            });
            setTimeout(() => {
                closeModal();
              }, 1000);
        } else {
          toast.error('Erreur lors de la suppression du Prestataire');
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Une erreur s\'est produite lors de la suppression du Prestataire');
        setTimeout(() => {
            closeModal();
          }, 1000);
      });
  };
  

  useEffect(() => {
    axios.get(`${serverUrl}/api/proprio/getproprios`) // Assuming the server is running on the same host
      .then(response => {
        setProprios(response.data.proprios);
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
              <TableCell>RCC</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proprios.map((proprio, index) => (
              <TableRow key={proprio.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{proprio.nom}</TableCell>
                <TableCell>{proprio.cni}</TableCell>
                <TableCell>{proprio.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(proprio)}><EditIcon /></Button>
                  <Button onClick={() => openModal(proprio)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedProprio && (
          <>
            <h2>Confirmation</h2>
            <p>Voulez-vous vraiment supprimer ce prestataire ?</p>
            <Button onClick={() => deleteProprio(selectedProprio.id)}>Confirmer</Button>
            <Button onClick={closeModal}>Annuler</Button>
          </>
        )}
      </Modal>
    </>
  );
  
}
