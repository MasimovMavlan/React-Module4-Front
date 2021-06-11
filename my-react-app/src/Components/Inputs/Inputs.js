import axios from "axios";
import React, { useState } from "react";

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

  // const removeAllTasks = async () => {
  //   await axios.delete("http://localhost:8000/deleteAllTasks").then((res) => {
  //     setNote(res.data.data);
  //   });
  // };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const doctorChange = (e) => {
    setDoctor(e.target.value);
  };

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const vineChange = (e) => {
    setVine(e.target.value);
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
      <input type="text" onChange={nameChange} value={patient} />
      <select value={doctor} onChange={doctorChange}>
        <option hidden defaultValue>
          Выберете врача
        </option>
        <option>Педрони Эмилио</option>
        <option>Хуанито Петрунио</option>
      </select>
      <input type="date" onChange={dateChange} value={date} />
      <input type="text" onChange={vineChange} value={vine} />
      <button disabled={isDisabled} onClick={clickSubmit}>
        Добавить
      </button>
    </div>
  );
};

export default Inputs;
