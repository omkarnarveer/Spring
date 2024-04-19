import { TextField, Button, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useContext } from 'react';
import TeacherCredContext from '../../contextStore/TeacherCreadential';


const Login = () => {
    const { setUserId, setToken, setIsValid } = useContext(TeacherCredContext)
    const [iserror, setIsError] = useState({
        status: false,
        msg: "",
        type: ""
    })

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        const data = new FormData(e.currentTarget);
        console.log(data);
        
        const actualData = {
            username: data.get('teacherid'),
            password: data.get('password')
        }
        localStorage.setItem("teacherId",actualData.username);
        console.log(actualData);
        console.log("after data")

        axios.post("http://localhost:8080/auth/teacher/login", actualData).then((response) => {
            console.log(response);
            let responseToken = response.data
            setIsValid(true)
            console.log(responseToken)
            setUserId(actualData.username);
            setToken(JSON.stringify(responseToken))
            localStorage.setItem('teachertoken', JSON.stringify(responseToken))
            let tokenfromstorage = JSON.parse(localStorage.getItem('teachertoken'))
            console.log(tokenfromstorage)
            setIsError({ status: true, msg: "Login SuccessFul", type: 'success' })
            navigate('/teacher/dashboard')
            setTimeout(() => {
                navigate('/teacher/dashboard')
            }, 2000)

        }).catch((error) => {
            console.log(error)
            setIsError({ status: true, msg: "All Fields are Required", type: 'error' })
        })
    }
    return (
        <Box component='form' noValidate sx={{ mt: 2 }} id='login-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='teacherid' name='teacherid' label='Teacher ID' type='text' />
            <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />

            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 4, mb: 2, px: 5 }}>Login</Button>
            </Box>
            {iserror.status ? <Alert severity={iserror.type} sx={{ mt: 3 }}>{iserror.msg}</Alert> : ''}
        </Box>
    );
}

export default Login