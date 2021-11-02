import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';

// ICONS
import ReceiptIcon from '@mui/icons-material/Receipt';
import HomeIcon from '@mui/icons-material/Home';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const Navegacion = ({ estadoHome, estadoVentas, estadoProductos, estadoUsuarios }) => {

    return (
        
            <List subheader={<ListSubheader>Navegación</ListSubheader>}>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Home"} disabled={estadoHome}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Ventas"} disabled={estadoVentas} >
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ventas" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Productos"} disabled={estadoProductos}>
                        <ListItemIcon>
                            <StoreMallDirectoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Productos" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href={"/Usuarios"} disabled={estadoUsuarios}>
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItemButton>
                </ListItem>

            </List>
       

    );

}

export default Navegacion;