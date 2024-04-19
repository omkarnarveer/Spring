import { Grid, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import Registration from './Registration';
import LogIn from './LogIn';
import authimg from '../../images/authimg.png'

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

const SignIn = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
    setValue(newValue);
    }
  
    return (
  
      <Grid container sx={{ p:4, height: '100%' }}>
      <Grid item lg={6} md={4} sm={4} sx={{
        backgroundImage: `url(${authimg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', sm: 'block' }
      }}>
      </Grid>
      <Grid item lg={6} sm={8} xs={12}>
          <Box  sx={{ mx: 4, height: 500}}>
            <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange}>
                <Tab label='Login' sx={{ textTransform: 'none', fontSize:'large', fontWeight: 'bold' }}></Tab>
                <Tab label='Registration' sx={{ textTransform: 'none',  fontSize:'large', fontWeight: 'bold' }}></Tab>
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
  );
}

export default SignIn