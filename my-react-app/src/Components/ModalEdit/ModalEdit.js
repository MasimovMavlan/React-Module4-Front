import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import {
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import "./ModalEdit.scss";

const ModalEdit = ({
  props,
  note,
  openEdit,
  setOpenEdit,
  indexEdit,
  setNoteTemp,
}) => {
  const { sort, sortDirection, filterSort, filterEnd, filterStart } = props;
  const [tempPatient, setTempPatient] = useState("");
  const [tempDoctor, setTempDoctor] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempVine, setTempVine] = useState("");
  const isDisabled =
    !tempPatient.trim() || !tempDoctor || !tempDate || !tempVine.trim();
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    const onModalOpen = async () => {
      setTempPatient(note[indexEdit].patient);
      setTempDoctor(note[indexEdit].doctor);
      setTempDate(note[indexEdit].date);
      setTempVine(note[indexEdit].vine);
    };

    onModalOpen();
  }, [indexEdit, note]);

  const handleDoneButton = async () => {
    const { _id } = note[indexEdit];
    if (tempPatient.trim() && tempVine.trim()) {
      try {
        await axios
          .patch(
            `http://localhost:5000/editNote`,
            {
              _id,
              patient: tempPatient.trim(),
              doctor: tempDoctor,
              date: tempDate,
              vine: tempVine.trim(),
            },
            {
              headers: { authorization: token },
            }
          )
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
      handleCloseEdit();
    } else {
      alert("Заполните все поля");
    }
  };

  const changeTempEdit = (e, setTemp) => {
    setTemp(e.target.value);
  };

  const cancelElement = () => {
    handleCloseEdit();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <Modal open={openEdit} onClose={handleCloseEdit}>
      <div className="modal-edit">
        <h1>Изменить прием</h1>
        <div className="modalEditInputs">
          <span>Имя:</span>
          <TextField
            variant="outlined"
            type="text"
            onChange={(e) => changeTempEdit(e, setTempPatient)}
            value={tempPatient}
          />
          <span>Врач:</span>
          <FormControl variant="filled" className="">
            <InputLabel id="demo-simple-select-filled-label">
              Выберете врача
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={tempDoctor}
              onChange={(e) => changeTempEdit(e, setTempDoctor)}
            >
              <MenuItem value="">
                <em>Выберете врача</em>
              </MenuItem>
              <MenuItem value="Педрони Эмилио">Педрони Эмилио</MenuItem>
              <MenuItem value="Хуанито Петрунио">Хуанито Петрунио</MenuItem>
              <MenuItem value="Эбанито Фернандес">Эбанито Фернандес</MenuItem>
            </Select>
          </FormControl>
          <span>Дата:</span>
          <TextField
            variant="outlined"
            type="date"
            onChange={(e) => changeTempEdit(e, setTempDate)}
            value={tempDate}
          />
          <span>Жалоба:</span>
          <TextareaAutosize
            variant="outlined"
            type="text"
            rowsMax={7}
            onChange={(e) => changeTempEdit(e, setTempVine)}
            value={tempVine}
          />
        </div>
        <div className="buttons">
          <Button variant="outlined" onClick={() => cancelElement()}>
            Отменить
          </Button>

          <Button
            variant="contained"
            disabled={isDisabled}
            color="primary"
            onClick={() => handleDoneButton()}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEdit;
