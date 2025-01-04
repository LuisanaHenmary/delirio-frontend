import {
    Box,
    Table,
    TableBody,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Paper,
    IconButton
} from "@mui/material"
import { useMemo, useState, useEffect } from "react";
import { useEmployersContext } from "../../hooks/useEmployersContext";
import { useToDoContext } from "../../hooks/useToDoContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getToDoes, getEmployers } from "../../api";
import { ToDoesTableCell, ToDoesTableRow } from "../styledComponents";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const TableEmployers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { employers, dispatchEmployers } = useEmployersContext();
    const { dispatch } = useToDoContext();
    const { user } = useAuthContext();
    const [rows, setRows] = useState([]);

    const visibleRows = useMemo(
        () =>
            [...rows]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, rows],
    );



    useEffect(() => {

        const r = employers.map((elem) => {
            return {
                'id_user': elem.id_user,
                'ci': elem.ci,
                'name': elem.name_employer,
                'phone': elem.phone
            }
        })

        setRows(r)

    }, [employers])

    const headCells = [
        {
            id: 'ci',
            label: 'C.I',
        },
        {
            id: 'name',
            label: 'Nombre',
        },
        {
            id: 'phone',
            label: 'Numero de telefono',
        },
        {
            id: 'actions',
            label: 'Acciones',
        },

    ];



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteEmployer = async (id) => {


        const apiUrl = import.meta.env.VITE_API_URL

        try {
            const response = await axios({
                method: 'delete',
                url: `${apiUrl}/employers/delete/${id}`,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.status === 200) {
                getEmployers(user, dispatchEmployers)
                getToDoes(user, dispatch)
            }
        } catch (e) {
            console.log(e)
        }
        finally {
            setPage(0)
        }

    }

    return (
        <Box>
            <Paper>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <ToDoesTableCell
                                        align="center"
                                        key={headCell.id}
                                    >

                                        {headCell.label}

                                    </ToDoesTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((row, index) => {

                                return (
                                    <ToDoesTableRow
                                        hover

                                        tabIndex={-1}
                                        key={index}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <ToDoesTableCell
                                            component="th"
                                            id={index}
                                            scope="row"
                                            align="center"
                                        >
                                            {row.ci}
                                        </ToDoesTableCell>
                                        <ToDoesTableCell align="center">{row.name}</ToDoesTableCell>
                                        <ToDoesTableCell align="center">{row.phone}</ToDoesTableCell>
                                        <ToDoesTableCell align="center"  >
                                            <IconButton onClick={() => deleteEmployer(row.id_user)} >
                                                <DeleteIcon sx={{ color: "#81041c" }} />
                                            </IconButton>
                                        </ToDoesTableCell>
                                    </ToDoesTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    )

}

export default TableEmployers