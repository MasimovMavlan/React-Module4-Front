import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const List = ({ note, setNote }) => {
  // const [temp, setTemp] = useState("");
  // const [indexEdit, setIndexEdit] = useState(-1);
  const user = localStorage.getItem("user");

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

  // const doneElement = async (index) => {
  //   if (temp) {
  //     note[index].text = temp;
  //     const { _id, text } = note[index];
  //     await axios
  //       .patch(`http://localhost:8000/updateTask`, {
  //         _id,
  //         text,
  //       })
  //       .then((res) => {
  //         setNote(res.data.data);
  //       });
  //     setTemp("");
  //   }
  //   setIndexEdit(-1);
  // };

  const removeNote = async (index) => {
    await axios
      .post(`http://localhost:5000/deleteNote?_id=${note[index]._id}`, {
        user: user,
      })
      .then((res) => {
        setNote(res.data.data);
      });
  };

  // const changeTempEdit = (e) => {
  //   if (e.target.value) {
  //     setTemp(e.target.value);
  //   }
  // };

  // const cancelElement = () => {
  //   setIndexEdit(-1);
  // };

  // const tempEditEnter = (e, index) => {
  //   if (e.key === "Enter") {
  //     doneElement(index);
  //   }
  // };

  // const editElement = (index) => {
  //   setIndexEdit(index);
  //   setTemp(todos[index].text);
  // };

  // note.sort((a, b) =>
  //   a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0
  // );

  return (
    <div className="">
      {note?.map((list, index) => (
        <div key={`task-${index}`} className="">
          <p>{list.patient}</p>
          <p>{list.doctor}</p>
          <p>{list.date}</p>
          <p>{list.vine}</p>
          <div className="buttons">
            <Button variant="contained" onClick={() => removeNote(index)}>
              Удалить
            </Button>
            <Button
              variant="contained"
              // onClick={() => editElement(index)}
            >
              Изменить
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
