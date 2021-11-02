import Formulario from './Formulario';
import Dialog from '@material-ui/core/Dialog';

const ModalEditar = ({open, cerrar, usuario} ) => {


    return (
        <Dialog open={open} onClose={cerrar}>
            <Formulario cerrarFormulario = {cerrar} usuarioEditado={usuario}/>
        </Dialog>
    )
}

export default ModalEditar;