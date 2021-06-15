import axios from "axios";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Inputs.scss";

const Inputs = ({ setNote }) => {
  let today = new Date();
  let day = `0${today.getDate()}`.slice(-2);
  let month = `0${today.getMonth() + 1}`.slice(-2);
  let dat = `${today.getFullYear()}-${month}-${day}`;

  const [patient, setName] = useState("");
  const [doctor, setDoctor] = useState("Педрони Эмилио");
  const [vine, setVine] = useState("");
  const user = localStorage.getItem("user");
  const [date, setDate] = useState(dat);
  const isDisabled = !patient || !doctor || !date || !vine;

  const addList = async (text) => {
    if (patient.trim() && vine.trim()) {
      await axios
        .post("http://localhost:5000/createNote", {
          patient: patient,
          doctor: doctor,
          date: date,
          vine: vine,
          user: user,
        })
        .then((res) => {
          setNote(res.data.data);
        });
    } else {
      alert("Заполните все поля");
    }
  };

  const handleChange = (e, changeValue) => {
    changeValue(e.target.value);
  };

  const inputKeyPress = (e) => {
    if (e.key === "Enter") {
      clickSubmit();
    }
  };

  const clickSubmit = () => {
    addList(patient, doctor, date, vine);
    setName("");
    setDoctor("Педрони Эмилио");
    setDate(dat);
    setVine("");
  };

  return (
    <div className="inputs">
      <TextField
        className="input-textfield"
        label="Имя"
        variant="outlined"
        type="text"
        onChange={(e) => handleChange(e, setName)}
        onKeyDown={(e) => {
          inputKeyPress(e);
        }}
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
        onKeyDown={(e) => {
          inputKeyPress(e);
        }}
      />
      <TextField
        value={vine}
        className="input-textfield"
        label="Жалоба"
        variant="outlined"
        type="text"
        onChange={(e) => handleChange(e, setVine)}
        onKeyDown={(e) => {
          inputKeyPress(e);
        }}
      />
      <Button variant="contained" disabled={isDisabled} onClick={clickSubmit}>
        Добавить
      </Button>
    </div>
  );
};

export default Inputs;
