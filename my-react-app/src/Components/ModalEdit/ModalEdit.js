import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const ModalEdit = ({ setIndexEdit, note, setNote, open, setOpen }) => {
  const [tempPatient, setTempPatient] = useState("");
  const [tempDoctor, setTempDoctor] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempVine, setTempVine] = useState("");
  const isDisabled = !tempPatient || !tempDoctor || !tempDate || !tempVine;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const onModalOpen = async () => {
      setTempPatient(note.patient);
      setTempDoctor(note.doctor);
      setTempDate(note.date);
      setTempVine(note.vine);
    };

    onModalOpen();
  }, [note]);

  const doneElement = async () => {
    const { _id } = note;
    await axios
      .patch(
        `http://localhost:5000/editNote`,
        {
          _id,
          patient: tempPatient,
          doctor: tempDoctor,
          date: tempDate,
          vine: tempVine,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setNote(res.data.data);
      });
    handleClose();
    setIndexEdit(-1);
  };

  const changeTempEdit = (e, setTemp) => {
    setTemp(e.target.value);
  };

  const cancelElement = () => {
    handleClose();
    setIndexEdit(-1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modalEdit">
        <span>Имя:</span>
        <TextField
          variant="outlined"
          type="text"
          onChange={(e) => {
            changeTempEdit(e, setTempPatient);
          }}
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
          onChange={(e) => {
            changeTempEdit(e, setTempDate);
          }}
          value={tempDate}
        />
        <span>Жалоба:</span>
        <TextareaAutosize
          variant="outlined"
          type="text"
          onChange={(e) => {
            changeTempEdit(e, setTempVine);
          }}
          value={tempVine}
        />
        <div className="buttons">
          <Button
            className="buttons"
            variant="contained"
            disabled={isDisabled}
            onClick={() => doneElement()}
          >
            Сохранить
          </Button>
          <Button variant="contained" onClick={() => cancelElement()}>
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEdit;
