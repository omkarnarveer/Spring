import { Grid, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Registration from './Registration';
import LogIn from './LogIn';
import teachauth from '../../images/teachauth.png';

const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
        <div role='tabpanel' hidden={value !== index}>
            {
                value === index && (
                    <Box>{children}</Box>
                )
            }
        </div>
    )
}

const TeacherSignIn = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Navbar />
            <Grid container sx={{ p: 4, height: '90%' }} className='bg-white'>
                <Grid item lg={6} sm={8} sx={{
                    backgroundImage: `url(${teachauth})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { xs: 'none', sm: 'block' }
                }}>
                </Grid>
                <Grid item lg={6} sm={8} xs={12} >
                    <Box sx={{ mx: 4, height:'90vh' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label='Login' sx={{ textTransform: 'none', fontSize: 'large', fontWeight: 'bold' }}></Tab>
                                <Tab label='Registration' sx={{ textTransform: 'none', fontSize: 'large', fontWeight: 'bold' }}></Tab>
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <LogIn />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Registration />
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default TeacherSignIn