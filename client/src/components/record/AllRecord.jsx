import React, { useState, useEffect, useContext} from 'react';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { getAllRecords, deleteRecord } from '../../service/api';
import { DataContext} from '../../context/DataProvider';

const EditButton = styled(Button)`
    background-color: green;
    color: white;
    margin-right: 8px; 
    &:hover {
        background-color: white;
        color: green;
    }
`;

// Styled button for Delete
const DeleteButton = styled(Button)`
    background-color: red;
    color: white;
    &:hover {
        background-color: white;
        color: red;
    }
`;

// Styled table header cell
const StyledTableCell = styled(TableCell)`
    background-color: orange;
    color: white;
`;

const AllRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { account } = useContext(DataContext);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await getAllRecords(account);
                setRecords(response); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching all records:', error);
                setLoading(false);
            }
        };
        fetchRecords();
    }, [account]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this record permanently?');
        if (confirmDelete) {
            try {
                await deleteRecord(id);
              
                setRecords(records.filter(record => record._id !== id));
                
            } catch (error) {
                console.error('Error deleting record:', error);
                alert('Error deleting record. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2 style={{ marginLeft: '50px' }}>All Records</h2>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress />
                </div>
            ) : records && records.length > 0 ? (
                <TableContainer component={Paper} sx={{ maxWidth: '90%', margin: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Entry No.</StyledTableCell>
                                <StyledTableCell>Street Address</StyledTableCell>
                                <StyledTableCell>Country</StyledTableCell>
                                <StyledTableCell>State</StyledTableCell>
                                <StyledTableCell>City</StyledTableCell>
                                <StyledTableCell>Zip Code</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record, index) => (
                                <TableRow key={record._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{record.streetAddress}</TableCell>
                                    <TableCell>{record.country}</TableCell>
                                    <TableCell>{record.state}</TableCell>
                                    <TableCell>{record.city}</TableCell>
                                    <TableCell>{record.zipCode}</TableCell>
                                    <TableCell>
                                        <Link to={`/update/${record._id}`}>
                                             <EditButton startIcon={<EditIcon />} variant="contained">Edit</EditButton>
                                        </Link>
                                        <DeleteButton startIcon={<DeleteIcon />} variant="contained" onClick={() => handleDelete(record._id)}>Delete</DeleteButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <p>No records found</p>
            )}
        </div>
    );
};

export default AllRecords;
