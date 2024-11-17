import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Paper
} from "@mui/material"
import { useMemo, useState, useEffect } from "react";
import { useToDoContext } from "../../hooks/useToDoContext";

const ToDoesTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { todoes } = useToDoContext()
    const [rows, setRows] = useState([])

    const visibleRows = useMemo(
        () =>
            [...rows]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage, rows],
    );

    useEffect(() => {

        const r = todoes.map((elem) => {
            return elem.data
        })

        setRows(r)

    }, [todoes])

    const headCells = [
        {
            id: 'title',
            label: 'Titulo',
        },
        {
            id: 'expired',
            label: 'Fecha de expiración',
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
        <Paper sx={{marginTop: '20px'}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align="center"
                                >

                                    {headCell.label}

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => {

                            return (
                                <TableRow
                                    hover

                                    tabIndex={-1}
                                    key={index}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell
                                        component="th"
                                        id={index}
                                        scope="row"
                                        align="center"
                                    >
                                        {row.title}
                                    </TableCell>
                                    <TableCell align="center">{row.expired}</TableCell>
                                </TableRow>
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
    )

}

export default ToDoesTable