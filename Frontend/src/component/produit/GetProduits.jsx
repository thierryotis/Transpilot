import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

const GetProduits = () => {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const token = Cookies.get('jwt')
  const [produits, setProduits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);

  const openModal = (produit) => {
    setSelectedProduit(produit);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduit(null);
    setModalOpen(false);
  };

  const deleteProduit = (id) => {
    axios
      .delete(`${serverUrl}/api/produit/deleteproduit/${id}`)
      .then((response) => {
        if (response.data.success) {
          toast.success('Produit deleted successfully');
          // Refresh the list of produits after deletion
          axios
            .get(`${serverUrl}/api/produit/getproduits`)
            .then((response) => {
              setProduits(response.data.produits);
            })
            .catch((error) => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Error deleting the product');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while deleting the product');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/produit/getproduits`,{
        headers: {
          Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
        }
      }) // Assuming the server is running on the same host
      .then((response) => {
        setProduits(response.data.produits);
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
              <TableCell>Number</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produits.map((produit, index) => (
              <TableRow key={produit.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{produit.nom}</TableCell>
                <TableCell>{produit.type}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(produit)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openModal(produit)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedProduit && (
          <>
            <h2>Confirmation</h2>
            <p>Do you really want to delete this product?</p>
            <Button onClick={() => deleteProduit(selectedProduit.id)}>Confirm</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default GetProduits;
