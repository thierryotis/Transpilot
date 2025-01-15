import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../../server";
import Cookies from "js-cookie";

const defaultTheme = createTheme();

const AddTracteur = () => {
  const token = Cookies.get("jwt");
  const [immat, setImmat] = useState("");
  const [proprioId, setProprioId] = useState("");
  const [propriosOptions, setPropriosOptions] = useState([]);

  const getProprios = async () => {
    await axios
      .get(`${serverUrl}/api/tracteur/getproprios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPropriosOptions(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  useEffect(() => {
    getProprios();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      immat: immat,
      proprio_id: proprioId,
    };
    axios
      .post(`${serverUrl}/api/tracteur/addtracteur`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Tracteur added successfully");
        setImmat("");
        setProprioId("");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Add Tracteur
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="immat"
            label="Immatriculation"
            name="immat"
            autoFocus
            value={immat}
            onChange={(e) => setImmat(e.target.value)}
          />
          <InputLabel id="proprioId-label">Propriétaire</InputLabel>
          <Select
            labelId="proprioId-label"
            id="proprioId"
            value={proprioId}
            onChange={(e) => setProprioId(e.target.value)}
            fullWidth
          >
            {propriosOptions.map((proprio) => (
              <MenuItem key={proprio.id} value={proprio.id}>
                {proprio.nom}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default AddTracteur;
