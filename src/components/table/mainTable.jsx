import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Box,
  LinearProgress,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TableSortLabel,
  Grid,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Edit, Delete } from "@mui/icons-material";
import { fetchAllMaterials, getLoanerByMaterial, deleteLoans } from "../../service";
import { Snack } from "../snackbars";
import { UpdateModal, DeleteModal, LoanersModal } from "../modals";
import Pagination from "./Pagination";
import TableDataAsync from "./TableDataAsync";

const TCell = styled(TableCell)(({ theme }) => ({
  // tablehead cells only
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

const useStyles = makeStyles({
  root: {
    "&$active": {
      color: "white",
    },
  },
  active: {},
  icon: {
    color: "inherit !important",
  },
});

function compare(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
}

function MainTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editMaterial, seteditMaterial] = useState();
  const [delMaterial, setDelMaterial] = useState();
  const [createLoaners, setLoaner] = useState();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("");
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Nom");

  const {
    isLoading,
    isFetching,
    data: materials,
  } = useQuery("allMaterials", fetchAllMaterials, { placeholderData: [] });


  const rowHeight = document.getElementsByTagName("tr").item(1)?.offsetHeight;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - materials.length) : 0;

  const handleChangePage = (event, newPage) => setPage(newPage);

  const [currentId, setCurrentId] = useState("");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const notify = (type, message) => {
    setOpen(true);
    setType(type);
    setMessage(message);
  };

  const setLoaners = (loaners,id) => {
    setLoaner(loaners);
    setCurrentId(id)
    setModalCreate(true);
  };

  const onUpdate = (material) => {
    seteditMaterial(material);
    setModalUpdate(true);
  };

  const onDelete = (material) => {
    setDelMaterial(material);
    setModalDelete(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ width: "70%", mx: "auto", mb: "50px" }}
      >
        <Grid item>
          <Table stickyHeader sx={{ boxShadow: 1 }}>
            <TableHead
              sx={{
                boxShadow:
                  "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              }}
            >
              <TableRow>
                <TCell sortDirection={orderBy === "Nom" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "Nom"}
                    direction={orderBy === "Nom" ? order : "desc"}
                    onClick={(e) => handleRequestSort(e, "Nom")}
                    classes={{
                      root: classes.root,
                      active: classes.active,
                      icon: classes.icon,
                    }}
                  >
                    Nom
                    {orderBy === "Nom" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TCell>
                <TCell>type</TCell>                
                <TCell>Emprunteur</TCell>
                <TCell>date d'emprunt</TCell>
                <TCell>date de retour </TCell>
                <TCell>Loué</TCell>
                <TCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isFetching ? (
                <TableRow>
                  <TableCell colSpan="4" sx={{ width: "100%" }}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {(rowsPerPage > 0
                    ? order === "asc"
                      ? materials
                          .sort(compare)
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                      : materials
                          .sort(compare)
                          .reverse()
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                    : materials
                  ).map((material, loaners) => (
                    <TableRow
                      hover
                      key={material._id}
                    >
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell><TableDataAsync _id = {material._id} getFunction = {getLoanerByMaterial} property = "name"/></TableCell>
                      <TableCell><TableDataAsync _id = {material._id} getFunction = {getLoanerByMaterial} property = "createdAt"/></TableCell>
                      <TableCell><TableDataAsync _id = {material._id} getFunction = {getLoanerByMaterial} property = "returnDate"/></TableCell>
                      <TableCell>{material.isLoaned ? "oui" : "non"}</TableCell>
                      <TableCell align="right">
                      <IconButton color="success" onClick={() => {if (material.isLoaned){ deleteLoans(loaners._id)} else{setLoaners(loaners,material._id)}}}>
                          {material.isLoaned ? "Rendre" : "Louer"}
                        </IconButton>
                        <IconButton color="info" onClick={() => onUpdate(material)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => onDelete(material)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: rowHeight * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Toutes", value: -1 },
                  ]}
                  colSpan={4}
                  count={materials.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Nombre de lignes par page"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} sur ${count}`
                  }
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
      </Grid>



      {/* {editMaterial !== undefined && ( */}
      <UpdateModal
        open={modalUpdate}
        setOpen={setModalUpdate}
        editMaterial={editMaterial}
        notify={notify}
      />
      {/* )} */}

      <DeleteModal
        open={modalDelete}
        setOpen={setModalDelete}
        delMaterial={delMaterial}
        notify={notify}
      />

      <LoanersModal
        open={modalCreate}
        setOpen={setModalCreate}
        createLoaners={createLoaners}
        notify={notify}
        materialId={currentId}
      />

      <Snack open={open} setOpen={setOpen} type={type} message={message} />
    </>
  );
}

export default MainTable;
