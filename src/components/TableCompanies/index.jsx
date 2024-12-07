import {
    Box,
    Table,
    TableBody,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Paper
} from "@mui/material"
import { useMemo, useState, useEffect } from "react";
import { useCompaniesContext } from "../../hooks/useCompanyContext";
import { ToDoesTableCell, ToDoesTableRow } from "../styledComponents";


const TableCompanies = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { companies } = useCompaniesContext()
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


    ];



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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