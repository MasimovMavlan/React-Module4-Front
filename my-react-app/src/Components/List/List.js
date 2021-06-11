import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const List = ({ note, setNote }) => {
  const [tempPatient, setTempPatient] = useState("");
  const [tempDoctor, setTempDoctor] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempVine, setTempVine] = useState("");
  const [indexEdit, setIndexEdit] = useState(-1);
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("user");
  const isDisabled = !tempPatient || !tempDoctor || !tempDate || !tempVine;

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("http://localhost:5000/getNote", {
          user: user,
        })
        .then((res) => {
          setNote(res.data.data);
        });
    };
    fetchData();
  }, [setNote, user]);

  const doneElement = async (index) => {
    note[index].patient = tempPatient;
    note[index].doctor = tempDoctor;
    note[index].date = tempDate;
    note[index].vine = tempVine;
    const { _id, patient, doctor, date, vine } = note[index];
    await axios
      .patch(`http://localhost:5000/editNote`, {
        _id,
        patient,
        doctor,
        date,
        vine,
        user: user,
      })
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
      .post(`http://localhost:5000/deleteNote?_id=${note[index]._id}`, {
        user: user,
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
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className="">
          <TextField
            variant="outlined"
            type="text"
            onChange={(e) => {
              changeTempEdit(e, setTempPatient);
            }}
            value={tempPatient}
          />

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
              <MenuItem value={1}>Педрони Эмилио</MenuItem>
              <MenuItem value={2}>Хуанито Петрунио</MenuItem>
              <MenuItem value={3}>Эбанито Фернандес</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            type="date"
            onChange={(e) => {
              changeTempEdit(e, setTempDate);
            }}
            value={tempDate}
          />

          <TextField
            variant="outlined"
            type="text"
            onChange={(e) => {
              changeTempEdit(e, setTempVine);
            }}
            value={tempVine}
          />

          <div className="buttons">
            <Button
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
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">Имя</TableCell>
              <TableCell align="right">Врач</TableCell>
              <TableCell align="right">Дата(g)</TableCell>
              <TableCell align="right">Жалоба</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {note?.map((list, index) => (
              <TableRow key={`list-${index}`}>
                <TableCell align="right">{list.patient}</TableCell>
                <TableCell align="right">{list.doctor}</TableCell>
                <TableCell align="right">{list.date}</TableCell>
                <TableCell align="right">{list.vine}</TableCell>
                <TableCell align="right">
                  <div className="buttons">
                    <Button
                      variant="contained"
                      onClick={() => removeNote(index)}
                    >
                      Удалить
                    </Button>

                    <Button
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
