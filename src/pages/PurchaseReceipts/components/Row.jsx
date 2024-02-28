import React, {useState} from "react";
import {
    Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";

export default function Row({row, order, orderBy}) {
    const [open, setOpen] = useState(false);

    const handleClickView = () => {
        console.log('Fiş Numarası:', row.receiptNumber);
        console.log('Ürün Sayısı:', row.cart.length);
    };

    return (<>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.receiptNumber}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.receiptNumber}</TableCell>
                <TableCell align="right">{row.cart.length}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                    <Button aria-label="view receipt" size="large" onClick={handleClickView} endIcon={<SendIcon/>}>
                        Fişi Gör
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography variant="subtitle1" fontWeight="bold">Ürün
                                            İsmi</Typography></TableCell>
                                        <TableCell><Typography variant="subtitle1"
                                                               fontWeight="bold">Adet</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="subtitle1" fontWeight="bold">Ödenen
                                            Tutar</Typography> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.cart.map((product, index) => (<React.Fragment key={index}>
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
        </>);
}