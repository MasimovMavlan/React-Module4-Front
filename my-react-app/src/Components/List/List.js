import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./List.scss";

const List = ({ note, setNote }) => {
  const [tempPatient, setTempPatient] = useState("");
  const [tempDoctor, setTempDoctor] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempVine, setTempVine] = useState("");
  const [indexEdit, setIndexEdit] = useState(-1);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const isDisabled = !tempPatient || !tempDoctor || !tempDate || !tempVine;

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/getNote", {
          headers: { authorization: token },
        })
        .then((res) => {
          setNote(res.data.data);
        });
    };

    fetchData();
  }, [setNote, token]);

  const doneElement = async (index) => {
    note[index].patient = tempPatient;
    note[index].doctor = tempDoctor;
    note[index].date = tempDate;
    note[index].vine = tempVine;
    const { _id, patient, doctor, date, vine } = note[index];

    await axios
      .patch(
        `http://localhost:5000/editNote`,
        {
          _id,
          patient,
          doctor,
          date,
          vine,
        },
        { headers: { authorization: token } }
      )
      .then((res) => {
        setNote(res.data.data);
      });

    setTempPatient("");
    setTempDoctor("");
    setTempDate("");
    setTempVine("");
    handleClose();
    setIndexEdit(-1);
  };

  const removeNote = async (index) => {
    await axios
      .delete(`http://localhost:5000/deleteNote?_id=${note[index]._id}`, {
        headers: { authorization: token },
      })
      .then((res) => {
        setNote(res.data.data);
      });
  };

  const editElement = (index) => {
    handleOpen();
    setIndexEdit(index);
    setTempPatient(note[index].patient);
    setTempDoctor(note[index].doctor);
    setTempDate(note[index].date);
    setTempVine(note[index].vine);
  };

  const changeTempEdit = (e, setTemp) => {
    setTemp(e.target.value);
  };

  const cancelElement = () => {
    handleClose();
    setIndexEdit(-1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // note.sort((a, b) =>
  //   a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0
  // );

  return (
    <div className="list">
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
              onClick={() => doneElement(indexEdit)}
            >
              Сохранить
            </Button>
            <Button
              variant="contained"
              onClick={() => cancelElement(indexEdit)}
            >
              Отменить
            </Button>
          </div>
        </div>
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="table-20 table-grey" align="center">
                Имя
              </TableCell>
              <TableCell className="table-20 table-grey" align="center">
                Врач
              </TableCell>
              <TableCell className="table-10 table-grey" align="center">
                Дата(g)
              </TableCell>
              <TableCell className="table-30 table-grey" align="center">
                Жалоба
              </TableCell>
              <TableCell
                className="table-10 table-grey"
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {note?.map((list, index) => (
              <TableRow key={`list-${index}`}>
                <TableCell className="table-20 table-border" align="center">
                  {list.patient}
                </TableCell>
                <TableCell className="table-20 table-border" align="center">
                  {list.doctor}
                </TableCell>
                <TableCell className="table-10 table-border" align="center">
                  {list.date}
                </TableCell>
                <TableCell className="table-40 table-border" align="center">
                  {list.vine}
                </TableCell>
                <TableCell className="table-10 table-border" align="center">
                  <div className="buttons">
                    <Button
                      className="button-list"
                      variant="contained"
                      onClick={() => removeNote(index)}
                    >
                      Удалить
                    </Button>
                    <Button
                      className="button-list"
                      variant="contained"
                      onClick={() => editElement(index)}
                    >
                      Изменить
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
