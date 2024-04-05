import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslation } from "react-i18next";

const ScheduleTable = ({ schedule }) => {
    const { t } = useTranslation();
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <TableContainer component={Paper}>
            <Table aria-label="schedule table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color:"red" }}>{t('day')}</TableCell>
                        <TableCell style={{ color:"red" }} align="right">{t('startTime')}</TableCell>
                        <TableCell style={{ color:"red" }} align="right">{t('endTime')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {daysOfWeek.map((day) => (
                        <TableRow key={day}>
                            <TableCell component="th" scope="row">{t(day)}</TableCell>
                            <TableCell align="right">{schedule[day] ? schedule[day].start : t('closed')}</TableCell>
                            <TableCell align="right">{schedule[day] ? schedule[day].end : t('closed')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ScheduleTable;