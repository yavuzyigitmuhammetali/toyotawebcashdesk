import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ScheduleTable = ({ schedule }) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return (
        <TableContainer component={Paper}>
            <Table aria-label="schedule table">
                <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {daysOfWeek.map((day) => (
                        <TableRow key={day}>
                            <TableCell component="th" scope="row">{day}</TableCell>
                            <TableCell align="right">{schedule[day] ? schedule[day].start : 'Closed'}</TableCell>
                            <TableCell align="right">{schedule[day] ? schedule[day].end : 'Closed'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ScheduleTable;