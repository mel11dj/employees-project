import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Delete } from '@material-ui/icons'
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    iconos: {
        cursor: 'pointer'
    },
    inputMaterial: {
        width: '100%'
    },
    tableCell: {
        fontWeight: 'bold',
    
    },
}));

const ShowEmails = ({ abrirCerrarModalCorreoElectronico, empleadoId, nombre }) => {
    const styles = useStyles();

    const [email, setEmail] = useState('');
    const [emailList, setEmailList] = useState([]);
    const [mostrarCampoEmail, setMostrarCampoEmail] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/employees/emails/?empleadoId=${empleadoId}`);
                setEmailList(response.data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };

        if (empleadoId) {
            fetchEmails();
        }
    }, [empleadoId]);

    const handleAddEmail = async () => {
        try {
            const response = await axios.post('http://localhost:8000/employees/emails/', { email, empleadoId });
            setEmailList([...emailList, response.data]);
            setEmail('');
        } catch (error) {
            console.error('Error adding email:', error);
        }
    };

    const handleDeleteEmail = async (id, index) => {
        try {
            await axios.delete(`http://localhost:8000/employees/emails/${id}`);
            const updatedEmailList = emailList.filter((_, i) => i !== index);
            setEmailList(updatedEmailList);
        } catch (error) {
            console.error('Error deleting email:', error);
        }
    };

    
    return (
        <div className="App">
            <div className={styles.modal}>
                <h2 id="modal-title">Emails from employee {nombre}</h2>
                <div style={{ display: 'flex'}}>
                    {mostrarCampoEmail && (
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}
                    {mostrarCampoEmail && (
                        <Button color="primary" onClick={handleAddEmail}>Add</Button>
                    )}
                </div>
                <br />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableCell}>Emails</TableCell>
                                <TableCell className={styles.tableCell} sortDirection="asc">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {emailList.map((email, index) => (
                                <TableRow key={index}>
                                    <TableCell>{email.email}</TableCell>
                                    <TableCell>
                                        <Delete className={styles.iconos} onClick={() => handleDeleteEmail(email.id, index)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <div>
                    <Button onClick={abrirCerrarModalCorreoElectronico}>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default ShowEmails
