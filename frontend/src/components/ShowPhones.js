import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Delete } from '@material-ui/icons';
import { Button, NativeSelect, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
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
        transform: 'translate(-50%, -50%)',
    },
    iconos: {
        cursor: 'pointer',
    },
    inputMaterial: {
        width: '100%',
    },
    tableCell: {
        fontWeight: 'bold',
    },
}));

const ShowPhones = ({ abrirCerrarModalTelefono, empleadoId, nombre }) => {
    const styles = useStyles();

    const [phone, setPhone] = useState('');
    const [indica, setIndica] = useState('');
    const [type, setType] = useState('');
    const [phoneList, setPhoneList] = useState([]);

    useEffect(() => {
        const loadPhones = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/employees/phones/?empleadoId=${empleadoId}`);
                setPhoneList(response.data);
            } catch (error) {
                console.error('Error loading phones:', error);
            }
        };
        loadPhones();
    }, [empleadoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'type':
                setType(value);
                break;
            case 'indica':
                setIndica(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            default:
                break;
        }
    };

    const handleAddPhone = async () => {
        try {
            if (!type || !indica || !phone) {
                alert("Please fill all fields.");
                return;
            }
            const response = await axios.post('http://localhost:8000/employees/phones/', {
                type,
                number: phone,
                indicative: indica,
                empleadoId,
            });
            setPhoneList([...phoneList, response.data]);
            setPhone('');
            setIndica('');
            setType('');
        } catch (error) {
            console.error('Error adding phone:', error);
        }
    };

    const handleDeletePhone = async (id) => {
        try {
            console.log({id});
            await axios.delete(`http://localhost:8000/employees/phones/${id}`);
            const updatedPhoneList = phoneList.filter((phone) => phone.id !== id);
            setPhoneList(updatedPhoneList);
        } catch (error) {
            console.error('Error deleting phone:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <h2>Phones from employee {nombre}</h2>
            <NativeSelect name="type" className={styles.inputMaterial} value={type} onChange={handleChange}>
                <option value="">Type</option>
                <option value="cell">Cell</option>
                <option value="tel">Tel</option>
            </NativeSelect>
            <TextField name="indica" label="Indicative" fullWidth type="number" margin="normal" value={indica} onChange={handleChange} />
            <TextField name="phone" label="Phone" fullWidth type="number" margin="normal" value={phone} onChange={handleChange} />
            <Button color="primary" onClick={handleAddPhone}>
                Add
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.tableCell}>Type</TableCell>
                            <TableCell className={styles.tableCell}>Indicative</TableCell>
                            <TableCell className={styles.tableCell}>Phone</TableCell>
                            <TableCell className={styles.tableCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {phoneList.map((phone, index) => (
                            <TableRow key={phone.id}>
                                <TableCell>{phone.type}</TableCell>
                                <TableCell>{phone.indicative}</TableCell>
                                <TableCell>{phone.number}</TableCell>
                                <TableCell>
                                    <Delete className={styles.iconos} onClick={() => handleDeletePhone(phone.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={abrirCerrarModalTelefono}>Cancel</Button>
        </div>
    );
};

export default ShowPhones;

