import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import "./index.css"
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography
} from '@mui/material';

import {getComparator, stableSort} from "./functions";
import Row from "./components/Row";
import AppDataContext from "../../shared/states/AppData/context";

function PurchaseReceipts() {
    const {t} = useTranslation();
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const {receipts, fetchReceipts} = useContext(AppDataContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReceipts()
            .then(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRequestSort = (property) => () => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div className="purchase-receipts-container">
            <div style={{position: 'relative'}}>
                {loading && (
                    <div className="loading-overlay">
                        <CircularProgress/>
                    </div>
                )}
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
                                            {t('receiptNumber')}
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
                                            {t('productCount')}
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
                                            {t('totalAmount')}
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
                                            {t('date')}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(receipts, getComparator(order, orderBy)).map((row) => (
                                <Row key={row.receiptNumber} row={row} order={order} orderBy={orderBy}/>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default PurchaseReceipts;
