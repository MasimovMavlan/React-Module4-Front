import React, { useState } from "react";
import ModalEdit from "../ModalEdit/ModalEdit";
import ModalRemove from "../ModalRemove/ModalRemove";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import "./List.scss";

const List = ({ props, note }) => {
  const { setNoteTemp } = props;
  const [indexEdit, setIndexEdit] = useState(-1);
  const [indexRemove, setIndexRemove] = useState(-1);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const editElement = (index) => {
    handleOpenEdit();
    setIndexEdit(index);
  };

  const removeElement = (index) => {
    handleOpenRemove();
    setIndexRemove(index);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  return (
    <div className="list">
      {openEdit && (
        <ModalEdit
          props={props}
          note={note}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          indexEdit={indexEdit}
          setNoteTemp={setNoteTemp}
        />
      )}
      {openRemove && (
        <ModalRemove
          props={props}
          noteRemove={note[indexRemove]}
          openRemove={openRemove}
          setOpenRemove={setOpenRemove}
          setNoteTemp={setNoteTemp}
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
                Дата
              </TableCell>
              <TableCell className="table-40 table-grey" align="center">
                Жалоба
              </TableCell>
              <TableCell
                className="table-10 table-grey"
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {note.map((list, index) => (
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
                      onClick={() => removeElement(index)}
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
