import Formulario from './Formulario';
import Dialog from '@material-ui/core/Dialog';

const ModalEditar = ({open, cerrar, producto} ) => {


    return (
        <Dialog open={open} onClose={cerrar}>
            <Formulario cerrarFormulario = {cerrar} productoEditado={producto}/>
        </Dialog>
    )
}

export default ModalEditar;