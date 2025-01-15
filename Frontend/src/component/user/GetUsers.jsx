import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';
import Cookies from 'js-cookie';

import { serverUrl } from '../../server';
import { toast } from "react-toastify";

const modalStyles = {
  content: {
    width: '400px', // Adjust the width as needed
    height: '200px', // Adjust the height as needed
    margin: 'auto',
  },
};

export default function GetUsers() {
  Modal.setAppElement('#root'); // Replace '#root' with the ID of your root element
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const deleteUser = (id) => {
    const token = Cookies.get('jwt')
    axios.delete(`${serverUrl}/api/user/deleteuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }
    })
      .then(response => {
        if (response.data.success) {
          const token = Cookies.get('jwt')
          toast.success('Utilisateur supprimé avec succès');
          // Refresh the list of users after deletion
          axios.get(`${serverUrl}/api/user/getusers`,{
            headers: {
              Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
            }
          })
            .then(response => {
              setUsers(response.data.users);
            })
            .catch(error => {
              console.error(error);
            });
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Erreur lors de la suppression de l\'utilisateur');
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };


  useEffect(() => {
    const token = Cookies.get('jwt')
    axios.get(`${serverUrl}/api/user/getusers`, {
      headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }
    }) // Assuming the server is running on the same host
      .then(response => {
        setUsers(response.data.users);
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
              <TableCell>Nom</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{user.nom}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(user)}><EditIcon /></Button>
                  <Button onClick={() => openModal(user)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedUser && (
          <>
            <h2>Confirmation</h2>
            <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
            <Button onClick={() => deleteUser(selectedUser.id)}>Confirmer</Button>
            <Button onClick={closeModal}>Annuler</Button>
          </>
        )}
      </Modal>
    </>
 

 );

}