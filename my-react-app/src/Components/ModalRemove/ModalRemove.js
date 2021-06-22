import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./ModalRemove.scss";
import { useHistory } from "react-router";

const ModalRemove = ({
  openRemove,
  setOpenRemove,
  noteRemove,
  props,
  setNoteTemp,
}) => {
  const { sort, sortDirection, filterSort, filterEnd, filterStart } = props;
  const token = localStorage.getItem("token");
  const history = useHistory();

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const removeNote = async () => {
    try {
      await axios
        .delete(`http://localhost:5000/deleteNote?_id=${noteRemove._id}`, {
          headers: { authorization: token },
        })
        .then((res) => {
          setNoteTemp(res.data.data);
          filterSort(
            sort,
            sortDirection,
            filterStart,
            filterEnd,
            res.data.data
          );
        });
    } catch (e) {
      if (e.response.status === 403) {
        localStorage.clear();
        history.push("/login");
      }
    }
    handleCloseRemove();
  };

  return (
    <Modal open={openRemove} onClose={handleCloseRemove}>
      <div className="modal-remove">
        <h1>Удалить прием</h1>
        <h2>Вы действительно хотите удалить прием?</h2>
        <div className="buttons">
          <Button variant="outlined" onClick={() => handleCloseRemove()}>
            Отменить
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => removeNote()}
          >
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRemove;
