import axios from "axios";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const Inputs = ({ setNote }) => {
  const [patient, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [vine, setVine] = useState("");
  const isDisabled = !patient || !doctor || !date || !vine;
  const user = localStorage.getItem("user");

  const addList = async (text) => {
    if (text.trim()) {
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
    }
  };

  const handleChange = (e, changeValue) => {
    changeValue(e.target.value);
  };

  // const inputKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     clickSubmit();
  //   }
  // };

  const clickSubmit = () => {
    addList(patient, doctor, date, vine);
    setName("");
    setDoctor("");
    setDate("");
    setVine("");
  };

  return (
    <div>
      <TextField
        variant="outlined"
        type="text"
        onChange={(e) => handleChange(e, setName)}
        value={patient}
      />
      <FormControl variant="filled" className="">
        <InputLabel id="demo-simple-select-filled-label">
          Выберете врача
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={doctor}
          onChange={(e) => handleChange(e, setDoctor)}
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
        onChange={(e) => handleChange(e, setDate)}
        value={date}
      />
      <TextField
        variant="outlined"
        type="text"
        onChange={(e) => handleChange(e, setVine)}
        value={vine}
      />
      <Button variant="contained" disabled={isDisabled} onClick={clickSubmit}>
        Добавить
      </Button>
    </div>
  );
};

export default Inputs;
