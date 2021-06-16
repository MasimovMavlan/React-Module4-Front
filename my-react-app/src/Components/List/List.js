import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ModalEdit from "../ModalEdit/ModalEdit";
import "./List.scss";

const List = ({ note, setNote }) => {
  const [indexEdit, setIndexEdit] = useState(-1);
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

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
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // note.sort((a, b) =>
  //   a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0
  // );

  return (
    <div className="list">
      {open && (
        <ModalEdit
          setIndexEdit={setIndexEdit}
          note={note[indexEdit]}
          setNote={setNote}
          open={open}
          setOpen={setOpen}
        />
      )}
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
                <TableCell className="table-30 table-border" align="center">
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
