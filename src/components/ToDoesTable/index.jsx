import {
    Table,
    TableBody,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Paper
} from "@mui/material"
import { useMemo, useState } from "react";
import { ToDoesTableCell, ToDoesTableRow } from "./styled";

const ToDoesTable = ({ rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const visibleRows = useMemo(
        () =>
            [...rows]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, rows],
    );



    const headCells = [
        {
            id: 'title',
            label: 'Titulo',
        },
        {
            id: 'expired',
            label: 'Fecha de expiración',
        },
        {
            id: 'employer',
            label: 'Empleado',
        },
        {
            id: 'company',
            label: 'Cliente',
        },
        {
            id: 'project',
            label: 'Proyecto',
        },
        {
            id: 'status',
            label: 'Estado',
        }

    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ marginTop: '20px' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <ToDoesTableCell
                                    key={headCell.id}
                                    align="center"
                                >

                                    {headCell.label}

                                </ToDoesTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.length > 0 &&
                            (<>
                                {visibleRows.map((row, index) => (
                                    <ToDoesTableRow key={index}>
                                        <ToDoesTableCell
                                            component="th"
                                            id={index}
                                            scope="row"
                                            align="center"
                                        >
                                            {row.title}
                                        </ToDoesTableCell>

                                        <ToDoesTableCell align="center">{row.expired}</ToDoesTableCell>

                                        <ToDoesTableCell align="center" >{row.employerName}</ToDoesTableCell>

                                        <ToDoesTableCell align="center" >{row.companyName}</ToDoesTableCell>

                                        <ToDoesTableCell align="center" >{row.projectName}</ToDoesTableCell>

                                        <ToDoesTableCell align="center" className={row.statusClass} >{row.statusName}</ToDoesTableCell>
                                    </ToDoesTableRow>
                                )
                                )}
                            </>)}
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
    )

}

export default ToDoesTable