import { Grid, Tabs, Tab, TextField, Button, Box, Alert } from '@mui/material';
import { useState,useContext,useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import authimg from '../../images/authimg.png'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import StudentCredContext from '../../contextStore/StudentCredentials';

const StudentSignIn = () => {
    const navigate=useNavigate();
    const [flag,setFlag]=useState(false);
    const [actualData,setActualData]=useState()
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const {setUserData,token,setNameCardData}=useContext(StudentCredContext);
    useEffect(()=>{
        console.log("inside useeffect")
        console.log(token)
        const loginTeacher=async()=>{
            console.log(actualData)
            const login=await axios.post("http://localhost:8080/auth/student/login", actualData);
            console.log(login)
            await localStorage.setItem('studenttoken', await JSON.stringify(login.data));
            navigate(`/student/dashboard/${actualData.username}`)

    }
    if(flag===true){
        console.log('called async')
        loginTeacher();
        setFlag(false)        
        console.log('exit if statement')
    }

    },[flag])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(token)
        const data = new FormData(e.currentTarget);
        setActualData({
            username: data.get('studentID'),
            password: data.get('password')
        })
        console.log(actualData)
        setFlag(true);
    }

    return (
        <>
            <Navbar />
            <Grid container sx={{ p: 4, height: '100%' }} className='bg-white'>
                <Grid item lg={6} sm={8} sx={{
                    backgroundImage: `url(${authimg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { xs: 'none', sm: 'block' }
                }}>
                </Grid>
                <Grid item lg={6} sm={8} xs={12}>
                    <Box sx={{ mx: 4, height:'90vh' }} component='form' noValidate id='login-form' onSubmit={handleSubmit}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs>
                                <Tab label='Login' sx={{ textTransform: 'none', fontSize: 'large', fontWeight: 'bold' }}></Tab>
                            </Tabs>
                        </Box>
                        <TextField margin='normal' required fullWidth id='studentID' name='studentID' label='Student ID' type='text' />
                        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />

                        <Box textAlign='center'>
                            <Button type='submit' variant='contained' sx={{ mt: 4, mb: 2, px: 5 }}>Login</Button>
                        </Box>
                        {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default StudentSignIn