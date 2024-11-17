import {
    Box,
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
import { useCompaniesContext } from "../../hooks/useCompanyContext";


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
                                    <TableCell
                                        align="center"
                                        key={headCell.id}
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
                                            {row.nit}
                                        </TableCell>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.phone}</TableCell>
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
        </Box>
    )

}

export default TableCompanies