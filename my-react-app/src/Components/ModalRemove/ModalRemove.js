import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";

const ModalRemove = ({ openRemove, setOpenRemove, setNote, note }) => {
  const token = localStorage.getItem("token");

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const removeNote = async () => {
    await axios
      .delete(`http://localhost:5000/deleteNote?_id=${note._id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setNote(res.data.data);
      });
    handleCloseRemove();
  };

  return (
    <Modal open={openRemove} onClose={handleCloseRemove}>
      <div className="buttons">
        <Button
          className="buttons"
          variant="contained"
          onClick={() => removeNote()}
        >
          Сохранить
        </Button>
        <Button variant="contained" onClick={() => handleCloseRemove()}>
          Отменить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalRemove;
