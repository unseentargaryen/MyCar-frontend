import {Modal, Button} from "react-bootstrap";

const AddToCartModal = ({handleClose,isModalOpen, selectedData}) => {

    return (
        <Modal show={isModalOpen} onHide={handleClose} style={{top:"30%"}}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Acquista lezione</Modal.Title>
            </Modal.Header>
            <Modal.Body><h5 className={"text-center"}>{selectedData}</h5><p>Vuoi prenotare questa lezione?<br/>Verrai reindirizzato alla pagina di pagamento</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
                <Button variant="success" onClick={handleClose}>
                    Procedi
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddToCartModal;