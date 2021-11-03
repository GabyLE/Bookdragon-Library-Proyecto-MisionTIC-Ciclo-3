import { Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton, Typography, Button } from "@material-ui/core";
import { Close } from '@material-ui/icons';

const Confirmacion = ({open, titulo, mensaje, cerrar, aceptar}) => {

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>
                {titulo}
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton onClick={cerrar}>
                    <Close />
                </IconButton>

            </Box>

            <DialogContent>
                <Typography>
                    {mensaje}
                </Typography>

            </DialogContent>

            <DialogActions>
                <Button onClick={cerrar} variant="contained" color="primary">
                    No
                </Button>
                <Button variant="contained" color="secundary"
                    onClick = {() => {
                        if (aceptar){ aceptar(); }
                        cerrar();
                    }}
                >
                    Sí
                </Button>
            </DialogActions>

        </Dialog>
    )

}

export default Confirmacion;