import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useContext } from 'react';
import { RoleContext } from '../../RoleContext';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const userRole = useContext(RoleContext);

  const updatedData = data.map((item) => {
    let visibility = false;

    if ((item.title === "Chargements" ) && (userRole === "chargeur" )) {
      visibility = true;
    } else if (
      (item.title === "Produits" ||
        item.title === "Camions" ||
        item.title === "Proprios"||
        item.title === "Chauffeurs") &&
        userRole === "secretaire"
    ) {
      visibility = true;
    } else if (userRole === "admin") {
      visibility = true;
    }

    return { ...item, visibility };
  });

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {updatedData.map((item) => (
          item.visibility && <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
