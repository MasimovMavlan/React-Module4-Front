import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import "./Inputs.scss";

const Inputs = ({ props }) => {
  const {
    setNoteTemp,
    sort,
    sortDirection,
    filterSort,
    filterEnd,
    filterStart,
  } = props;
  const today = new Date();
  const day = `0${today.getDate()}`.slice(-2);
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const dat = `${today.getFullYear()}-${month}-${day}`;

  const [patient, setName] = useState("");
  const [doctor, setDoctor] = useState("Педрони Эмилио");
  const [vine, setVine] = useState("");
  const [date, setDate] = useState(dat);
  const isDisabled = !patient || !doctor || !date || !vine;
  const token = localStorage.getItem("token");
  const history = useHistory();

  const addList = async () => {
    if (patient.trim() && vine.trim() && date) {
      try {
        await axios
          .post(
            "http://localhost:5000/createNote",
            {
              patient: patient.trim(),
              doctor: doctor,
              date: date,
              vine: vine.trim(),
            },
            { headers: { authorization: token } }
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
            setName("");
            setDoctor("Педрони Эмилио");
            setDate(dat);
            setVine("");
          });
      } catch (e) {
        if (e.response.status === 403) {
          localStorage.clear();
          history.push("/login");
        }
      }
    } else {
      alert("Заполните все поля");
    }
  };

  const handleChange = (e, changeValue) => {
    changeValue(e.target.value);
  };

  const inputKeyPress = (e) => {
    if (e.key === "Enter") {
      addList();
    }
  };

  return (
    <div className="inputs">
      <TextField
        className="input-textfield"
        label="Имя"
        variant="outlined"
        type="text"
        onChange={(e) => handleChange(e, setName)}
        onKeyDown={(e) => inputKeyPress(e)}
        value={patient}
      />
      <FormControl variant="filled" className="input-textfield">
        <InputLabel>Выберете врача</InputLabel>
        <Select value={doctor} onChange={(e) => handleChange(e, setDoctor)}>
          <MenuItem value="Педрони Эмилио">Педрони Эмилио</MenuItem>
          <MenuItem value="Хуанито Петрунио">Хуанито Петрунио</MenuItem>
          <MenuItem value="Эбанито Фернандес">Эбанито Фернандес</MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={date}
        className="input-textfield"
        variant="outlined"
        type="date"
        onChange={(e) => handleChange(e, setDate)}
        onKeyDown={(e) => inputKeyPress(e)}
      />
      <TextField
        value={vine}
        className="input-textfield"
        label="Жалоба"
        variant="outlined"
        type="text"
        onChange={(e) => handleChange(e, setVine)}
        onKeyDown={(e) => inputKeyPress(e)}
      />
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={() => addList()}
      >
        Добавить
      </Button>
    </div>
  );
};

export default Inputs;
