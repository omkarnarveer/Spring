import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
    console.log('regeister');

    const [error, setError] = useState({
        status: false, msg: "", type: ""
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log('submit was clikerd');
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const actualData = {
            teacherName: data.get('name'),
            teacherId: data.get('teacherID'),
            password: data.get('password'),
            matchingPassword: data.get('password_confirmation'),
            role: "ROLE_TEACHER"
        }
        console.log("after data")
        if (actualData.teacherName &&
            actualData.teacherId &&
            actualData.password &&
            actualData.matchingPassword) {
            if (actualData['password'] !== actualData['matchingPassword']) {
                console.log('not matching');
                setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
            } else {
                axios.post("http://localhost:8080/auth/teacher/signup", actualData,).then((response) => {
                    console.log(response);
                    if (response.status === 201) {
                        document.getElementById('registration-form').reset()
                        setError({ status: true, msg: "Registration Successful, Please LogIn", type: 'success' })

                    }
                    else {
                        setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
                    }
                }).catch(error => {
                    setError({ status: true, msg: "Password and Confirm Password Doesn't Match", type: 'error' })
                    console.log(error)

                })
            }
        }
    }
    return <>
        <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
            <TextField margin='normal' required fullWidth id='teacherID' name='teacherID' label='TeacherID' />
            <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
            <TextField margin='normal' required fullWidth id='password_confirmation' name='password_confirmation' label='Confirm Password' type='password' />

            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 4, mb: 2, px: 5 }}>Register</Button>
            </Box>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
        </Box>
    </>;
};
export default Registration;