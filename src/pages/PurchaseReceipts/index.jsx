import React, {useState} from 'react';
import "./purchaseReceipts.css"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Paper,
    IconButton, Collapse, Box, Typography, Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {exampleReceipts} from "./data";
import SendIcon from '@mui/icons-material/Send';
import {createTheme, ThemeProvider} from "@mui/material/styles";
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

function descendingComparator(a, b, orderBy) {
    if (orderBy === 'cart.length') {
        if (b.cart.length < a.cart.length) {
            return -1;
        }
        if (b.cart.length > a.cart.length) {
            return 1;
        }
        return 0;
    }

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function Row({row,order,orderBy}) {
    const [open, setOpen] = useState(false);

    const handleClickView = () => {
        console.log('Fiş Numarası:', row.receiptNumber);
        console.log('Ürün Sayısı:', row.cart.length);
    };

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.receiptNumber}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.receiptNumber}</TableCell>
                <TableCell align="right">{row.cart.length}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                    <Button aria-label="view receipt" size="large" onClick={handleClickView} endIcon={<SendIcon />}>
                        Fişi Gör
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="subtitle1" fontWeight="bold">Ürün İsmi</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1" fontWeight="bold">Adet</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Ödenen Tutar</Typography> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.cart.map((product,index) => (
                                        <React.Fragment key={index}>
                                            <TableRow key={product.date}>
                                                <TableCell component="th" scope="row">
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>{product.quantity}</TableCell>
                                                <TableCell align="right">
                                                    {product.discountedPrice ? (product.discountedPrice * product.quantity) : (product.price * product.quantity)}
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>

                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}



function PurchaseReceipts({dark = false}) {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');

    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div className="purchase-receipts-container">
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <TableContainer component={Paper}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell />
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
                                <Row key={row.receiptNumber} row={row} order={order} orderBy={orderBy} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </div>
    );
}

export default PurchaseReceipts;