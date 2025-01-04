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
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useToDoContext } from "../../hooks/useToDoContext";
import { ToDoesTableCell, ToDoesTableRow } from "../styledComponents";
import { getToDoes, getCompanies } from "../../api";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const TableCompanies = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { companies, dispatchCompanies } = useCompaniesContext()
    const { dispatch } = useToDoContext()
    const { user } = useAuthContext()
    const [rows, setRows] = useState([])

    const visibleRows = useMemo(
        () =>
            [...rows]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, rows],
    );



    useEffect(() => {

        const r = companies.map((elem) => {
            return {
                'id_user': elem.id_user,
                'nit': elem.nit,
                'name': elem.name_company,
                'phone': elem.phone
            }
        })

        setRows(r)

    }, [companies])

    const headCells = [
        {
            id: 'nit',
            label: 'NIT',
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

    const deleteCompany = async (id) => {

        const apiUrl = import.meta.env.VITE_API_URL

        try {
            const response = await axios({
                method: 'delete',
                url: `${apiUrl}/companies/delete/${id}`,
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.status === 200) {
                getCompanies(user, dispatchCompanies)
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
                                            {row.nit}
                                        </ToDoesTableCell>
                                        <ToDoesTableCell align="center">{row.name}</ToDoesTableCell>
                                        <ToDoesTableCell align="center">{row.phone}</ToDoesTableCell>
                                        <ToDoesTableCell align="center"  >
                                            <IconButton onClick={() => deleteCompany(row.id_user)} >
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

export default TableCompanies