import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
  const [page, setPage] = useState(1); 
  const [limit, setLimit] = useState(25); 
  const [total, setTotal] = useState(0); 
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
    const token = Cookies.get('jwt');
    axios
      .delete(`${serverUrl}/api/dechargement/deletedechargement/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success('Dechargement supprimé avec succès');
          fetchDechargements(page); // Rafraîchir la liste après suppression
          setTimeout(() => {
            closeModal();
          }, 1000);
        } else {
          toast.error('Erreur lors de la suppression du déchargement');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Une erreur est survenue lors de la suppression du déchargement');
        setTimeout(() => {
          closeModal();
        }, 1000);
      });
  };

  const fetchDechargements = (page) => {
    const token = Cookies.get('jwt');
    axios
      .get(`${serverUrl}/api/dechargement/getdechargements?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDechargements(response.data.dechargements);
        setTotal(response.data.total); // Mettre à jour le nombre total d'éléments
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDechargements(page); // Charger les données de la page actuelle
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
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
              {userRole === 'admin' && <TableCell>Actions</TableCell>}
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
                <TableCell>{dechargement.poids_camion_apres_chargement}</TableCell>
                <TableCell>{dechargement.poids_camion_decharge - dechargement.poids_camion_apres_chargement}</TableCell>
                {userRole === 'admin' && (
                  <TableCell>
                    <Button
                      onClick={() => {
                        Cookies.set('dechargement', JSON.stringify(dechargement));
                        navigate('/dashboard/modifydechargement');
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
      </TableContainer>

      {/* Pagination */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Précédent
        </Button>
        <span style={{ margin: '0 10px' }}>
          Page {page} sur {Math.ceil(total / limit)}
        </span>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(total / limit)}
        >
          Suivant
        </Button>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false} style={modalStyles}>
        {selectedDechargement && (
          <>
            <h2>Confirmation</h2>
            <p>Voulez-vous vraiment supprimer ce déchargement ?</p>
            <Button onClick={() => deleteDechargement(selectedDechargement.id)}>Confirmer</Button>
            <Button onClick={closeModal}>Annuler</Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default GetDechargements;