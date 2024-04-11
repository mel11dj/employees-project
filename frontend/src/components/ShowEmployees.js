import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, NativeSelect, TableFooter, TablePagination, InputAdornment, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@mui/icons-material/Mail';
import ShowEmails from './ShowEmails'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ShowPhones from './ShowPhones';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 400,
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
    search: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
        zIndex: 1000,
        width: '20%',
        marginTop: '50px',
        marginBottom: '50px',
    },
    tableCell: {
        fontWeight: 'bold',
    
    },
}));

const ShowEmployees = () => {
    const url = 'http://localhost:8000/employees/employees/';

    const styles = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = useState('');


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalCorreoElectronico, setModalCorreoElectronico] = useState(false);
    const [modalTelefono, setModalTelefono] = useState(false);


    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
        names: '',
        lastnames: '',
        typeIdentification: '',
        numberIdentification: '',
        dateIncome: '',
        salaryMonthly: '',
        post: '',
        function: '',
        department: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setEmpleadoSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(empleadoSeleccionado)
    }

    const peticionGet = async () => {

        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const peticionPost = async () => {

        await axios.post(url, empleadoSeleccionado)
            .then(response => {
                setData(data.concat(response.data))
                abrirCerrarModalInsertar()
            })
    }

    const addEmail = async () => {
        if(!Array.isArray(empleadoSeleccionado.emails)) empleadoSeleccionado.emails = [];

        const lastEMail = [...empleadoSeleccionado.emails].reverse()[0];
        if(lastEMail === '') return;
        empleadoSeleccionado.emails.push('');    
    }

    const addPhone = async () => {
        if(!Array.isArray(empleadoSeleccionado.phones)) empleadoSeleccionado.phones = [];

        const lastPhone = [...empleadoSeleccionado.phones].reverse()[0];
        if(lastPhone === '') return;
        empleadoSeleccionado.phones.push('');    
    }

    const changePhone = async (index, text) => {
        if(!Array.isArray(empleadoSeleccionado.phones)) empleadoSeleccionado.phones = [];
        empleadoSeleccionado.phones[index] = text; 
    }

    const changeEmail = async (index, text) => {
        if(!Array.isArray(empleadoSeleccionado.emails)) empleadoSeleccionado.emails = [];
        empleadoSeleccionado.emails[index] = text; 
    }


    const peticionPut = async () => {
        await axios.put(url + empleadoSeleccionado.id + '/', empleadoSeleccionado)
            .then(response => {
                var dataNueva = data;
                dataNueva.map(employee => {
                    if (empleadoSeleccionado && empleadoSeleccionado.id === employee.id) {
                        employee.names = empleadoSeleccionado.names;
                        employee.lastnames = empleadoSeleccionado.lastnames;
                        employee.typeIdentification = empleadoSeleccionado.typeIdentification;
                        employee.numberIdentification = empleadoSeleccionado.numberIdentification;
                        employee.dateIncome = empleadoSeleccionado.dateIncome;
                        employee.salaryMonthly = empleadoSeleccionado.salaryMonthly;
                        employee.post = empleadoSeleccionado.post;
                        employee.function = empleadoSeleccionado.function;
                        employee.department = empleadoSeleccionado.department;
                    }
                })
                setData(dataNueva);
                abrirCerrarModalEditar();
            })
    }

    const peticionDelete = async () => {
        await axios.delete(url + empleadoSeleccionado.id)
            .then(response => {
                setData(data.filter(employee => employee.id !== empleadoSeleccionado.id))
                abrirCerrarModalEliminar();
            })
    }

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const abrirCerrarModalCorreoElectronico = () => {
        setModalCorreoElectronico(!modalCorreoElectronico);
    }

    const abrirCerrarModalTelefono = () => {
        setModalTelefono(!modalTelefono);
    }

    const seleccionarEmpleado = (employee, caso) => {
        setEmpleadoSeleccionado(employee);
        (caso === 'Editar') && setModalEditar(true);
        (caso === 'Eliminar') && abrirCerrarModalEliminar();
        (caso === 'CorreoElectronico') && abrirCerrarModalCorreoElectronico();
        (caso === 'Telefono') && abrirCerrarModalTelefono();
    }
    

    useEffect(() => {
        peticionGet();
    }, [])

    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Add New Employee</h3>
            <TextField name="names" className={styles.inputMaterial} label="Names" onChange={handleChange} />
            <br/>
            <TextField name="lastnames" className={styles.inputMaterial} label="Lasnames" onChange={handleChange} />
            <br/><br />
            <NativeSelect name="typeIdentification" className={styles.inputMaterial}
                value={empleadoSeleccionado.typeIdentification || ''}
                inputProps={{
                    name: 'typeIdentification',
                    id: 'uncontrolled-native',
                }}
                onChange={handleChange}
            >
                <option value="" label="Type Identification"></option>
                <option value="nit">Nit</option>
                <option value="cc">CC</option>
            </NativeSelect>
            <br/>
            <TextField name="numberIdentification" className={styles.inputMaterial} type='number' label="Number Identification" onChange={handleChange} />
            <br/><br />
            <TextField name="dateIncome" className={styles.inputMaterial} type="date" onChange={handleChange} />
            <br/>
            <TextField name="salaryMonthly" className={styles.inputMaterial} type="number" label="Salary Monthly" onChange={handleChange} />
            <br/>
            <TextField name="post" className={styles.inputMaterial} label="Post" onChange={handleChange} />
            <br/>
            <TextField name="function" className={styles.inputMaterial} label="Function" onChange={handleChange} />
            <br/>
            <TextField name="department" className={styles.inputMaterial} label="Department" onChange={handleChange} />
            <br /><br />
            <div>
                <Button color='primary' onClick={() => peticionPost()}>Add</Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Edit New Employee</h3>
            <TextField name="names" className={styles.inputMaterial} label="Names" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.names} />
            <br />
            <TextField name="lastnames" className={styles.inputMaterial} label="Lasnames" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.lastnames} />
            <br /><br />
            <NativeSelect name="typeIdentification" className={styles.inputMaterial}
                defaultValue=""
                inputProps={{
                    name: 'typeIdentification',
                    id: 'uncontrolled-native',
                }}
                onChange={handleChange}
                value={empleadoSeleccionado && empleadoSeleccionado.typeIdentification}
            >
                <option value="" label="Type Identification"></option>
                <option value="nit">Nit</option>
                <option value="cc">CC</option>
            </NativeSelect>
            <br />
            <TextField name="numberIdentification" className={styles.inputMaterial} type="number" label="Number Identification" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.numberIdentification} />
            <br /><br />
            <TextField name="dateIncome" className={styles.inputMaterial} type="date" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.dateIncome} />
            <br />
            <TextField name="salaryMonthly" className={styles.inputMaterial} type="number" label="Salary Monthly" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.salaryMonthly} />
            <br />
            <TextField name="post" className={styles.inputMaterial} label="Post" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.post} />
            <br />
            <TextField name="function" className={styles.inputMaterial} label="Function" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.function} />
            <br />
            <TextField name="department" className={styles.inputMaterial} label="Department" onChange={handleChange} value={empleadoSeleccionado && empleadoSeleccionado.department} />
            <br /><br />
            <div>
                <Button color='primary' onClick={() => peticionPut()}>Edit</Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancel</Button>
            </div>
        </div>
    )

    const bodyEliminar = (
        <div className={styles.modal}>
            <p>Are you sure you want to eliminate the employee <b>{empleadoSeleccionado && empleadoSeleccionado.names}</b> ?</p>
            <div aling="right">
                <Button color='secondary' onClick={() => peticionDelete()}>Yes</Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>

    )

    return (
        <div className="App">
            <h1>Employee Management System</h1>
            <TextField
                className={styles.search}
                placeholder="Search Employee"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
            <Tooltip title="Add Employee" interactive>
                <Button onClick={abrirCerrarModalInsertar}>Add</Button>
            </Tooltip>
            <br /><br />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.tableCell}>#</TableCell>
                            <TableCell className={styles.tableCell} sortDirection="asc">Names</TableCell>
                            <TableCell className={styles.tableCell} sortDirection="asc">Lastnames</TableCell>
                            <TableCell className={styles.tableCell}>Type Identification</TableCell>
                            <TableCell className={styles.tableCell}>Number Identification</TableCell>
                            <TableCell className={styles.tableCell}>Date Income</TableCell>
                            <TableCell className={styles.tableCell}>Salary Monthly</TableCell>
                            <TableCell className={styles.tableCell}>Post</TableCell>
                            <TableCell className={styles.tableCell}>Function</TableCell>
                            <TableCell className={styles.tableCell}>Department</TableCell>
                            <TableCell className={styles.tableCell}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.filter((employee) => {
                            if (searchTerm === "") {
                                return true;
                            } else if (employee.names.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return true;
                            }else {
                                return false;
                            }
                        })
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((employee, i) => (
                            <TableRow key={employee.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{employee.names}</TableCell>
                                <TableCell>{employee.lastnames}</TableCell>
                                <TableCell>{employee.typeIdentification}</TableCell>
                                <TableCell>{employee.numberIdentification}</TableCell>
                                <TableCell>{employee.dateIncome}</TableCell>
                                <TableCell>{employee.salaryMonthly}</TableCell>
                                <TableCell>{employee.post}</TableCell>
                                <TableCell>{employee.function}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit Employee" interactive>
                                        <Edit className={styles.iconos} onClick={() => seleccionarEmpleado(employee, 'Editar')} />
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Delete Employee">
                                        <Delete className={styles.iconos} onClick={() => seleccionarEmpleado(employee, 'Eliminar')} />
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Emails Employee">
                                        <MailIcon className={styles.iconos} onClick={() => seleccionarEmpleado(employee, 'CorreoElectronico')} />
                                    </Tooltip>
                                    &nbsp;&nbsp;&nbsp;
                                    <Tooltip title="Phones Employee">
                                        <LocalPhoneIcon className={styles.iconos} onClick={() => seleccionarEmpleado(employee, 'Telefono')} />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={10}
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>

            <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>

            <Modal
                open={modalCorreoElectronico}
                onClose={abrirCerrarModalCorreoElectronico}
            >
                <ShowEmails abrirCerrarModalCorreoElectronico={abrirCerrarModalCorreoElectronico} empleadoId={empleadoSeleccionado.id} nombre={empleadoSeleccionado.names} />
            </Modal>

            <Modal
                open={modalTelefono}
                onClose={abrirCerrarModalTelefono}
            >
                <ShowPhones abrirCerrarModalTelefono={abrirCerrarModalTelefono} empleadoId={empleadoSeleccionado.id} nombre={empleadoSeleccionado.names} />
            </Modal>
        </div>
    )
}

export default ShowEmployees
