import React, {useState} from 'react';
import "./purchaseReceipts.css"
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography
} from '@mui/material';

import {exampleReceipts} from "./data";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {getComparator, stableSort} from "./functions";
import Row from "./components/Row";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function PurchaseReceipts({dark = false}) {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (<div className="purchase-receipts-container">
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">
                                    <TableSortLabel
                                        active={orderBy === 'receiptNumber'}
                                        direction={orderBy === 'receiptNumber' ? order : 'asc'}
                                        onClick={handleRequestSort('receiptNumber')}
                                    >
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Fiş Numarası
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'cart.length'}
                                        direction={orderBy === 'cart.length' ? order : 'asc'}
                                        onClick={handleRequestSort('cart.length')}
                                    >
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Ürün Sayısı
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'total'}
                                        direction={orderBy === 'total' ? order : 'asc'}
                                        onClick={handleRequestSort('total')}
                                    >
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Toplam Tutar
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={orderBy === 'date'}
                                        direction={orderBy === 'date' ? order : 'asc'}
                                        onClick={handleRequestSort('date')}
                                    >
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Tarih
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(exampleReceipts, getComparator(order, orderBy)).map((row, index) => (
                                <Row key={row.receiptNumber} row={row} order={order} orderBy={orderBy}/>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </div>);
}

export default PurchaseReceipts;