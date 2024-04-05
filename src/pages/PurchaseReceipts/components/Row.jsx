import React, {useCallback, useState} from "react";
import {
    Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function Row({row, order, orderBy}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {t} = useTranslation();

    const onClickReceipt = useCallback(() => {
        navigate('/receipt/'+row.receiptNumber, {
            replace: true,
            state: { 
                receipt: row, 
                warningMessage: row.active ? "" : t("returnProcessed")
            }
        });
    }, [row, navigate, t]);

    return (
        <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.receiptNumber}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell style={row.active ? {} : {color: "red"}} component="th" scope="row">
                    {row.receiptNumber}{row.active ? "" : t("returnProcessed")}
                </TableCell>
                <TableCell style={row.cart.length ? {} : {color: "red"}} align="right">{row.cart.length}</TableCell>
                <TableCell style={row.total ? {} : {color: "red"}} align="right">{row.total}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                    <Button
                        onClick={onClickReceipt}
                        aria-label={t("viewReceipt")}
                        size="large"
                        endIcon={<SendIcon/>}
                    >
                        {t("viewReceipt")}
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                {t("cart")}
                            </Typography>
                            <Table size="small" aria-label="history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle1" fontWeight="bold">{t("productName")}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle1" fontWeight="bold">{t("unit")}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="subtitle1" fontWeight="bold">{t("amountPaid")}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.cart.map((product, index) => (
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