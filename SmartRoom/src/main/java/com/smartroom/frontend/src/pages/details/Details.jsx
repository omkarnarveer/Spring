import { TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState,useContext } from "react";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import TeacherContext from '../home/TeacherContext';
const Details = (props) => {
const[alert,setAlert]=useState(false);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(e);
//     const actualData = {
//             standard: document.getElementById('standard').value,
//             batch: document.getElementById('batch').value,
//             dob: document.getElementById('dob').value,
//             fullAddress: document.getElementById('fullAddress').value,
//             phone: document.getElementById('phone').value,
//             motherName: document.getElementById('motherName').value,
//             fatherName: document.getElementById('fatherName').value,
//             sex: document.getElementById('sex').value,
//             age: document.getElementById('age').value,
//             address: document.getElementById('address').value,
//             motherEducation: document.getElementById('motherEducation').value,
//             motherJob: document.getElementById('motherJob').value,
//             fatherEducation: document.getElementById('fatherEducation').value,
//             fatherJob: document.getElementById('fatherJob').value,
//             familySize: document.getElementById('familySize').value,
//             parentStatus: document.getElementById('parentStatus').value,
//             familySupport:  document.getElementById('familySupport').value,
//             familyRelationship: document.getElementById('familyRelationship').value,
//             extraEducationSupport: document.getElementById('extraEducationSupport').value,
//             extraPaidClasses: document.getElementById('extraPaidClasses').value,
//             extraCurricular: document.getElementById('extraCurricular').value,
//             nurseryEducation: document.getElementById('nurseryEducation').value, 
//             higherEducation: document.getElementById('higherEducation').value,
//             freeTime: document.getElementById('freeTime').value,
//             travelTime: document.getElementById('travelTime').value,
//             studyTime: document.getElementById('studyTime').value,
//             failures: document.getElementById('failures').value,
//             internet: document.getElementById('internet').value,
//             health: document.getElementById('health').value,
//             absences: document.getElementById('absences').value,

//         }
  
//   }


  return (
    <div className="new grid grid-cols-6 gap-4 bg-card rounded-lg" style={props.st}> 
    <div className="col-start-1 col-span-6 text-[#4169E1] ">Student Information</div>  
        <div className="col-start-1 col-span-6" component="form">
        <Grid container spacing={2} >
        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='standard' 
        name='standard' 
        label='Class' 
        type='text' 
        value={props.pass.standard}
        onChange={(e)=>props.pass.setStandard(e.target.value)} />
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='batch' 
        name='batch' 
        label='Batch' 
        type='text' 
        value={props.pass.batch}
        onChange={(e)=>props.pass.setBatch(e.target.value)} />
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='dob' 
        name='dob' 
        label='Date of Birth' 
        type='text' 
        value={props.pass.dob}
        onChange={(e)=>props.pass.setDOB(e.target.value)} />
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='age' 
        name='age' 
        label='Student Age' 
        type='text' 
        value={props.pass.age}
        onChange={(e)=>props.pass.setAge(e.target.value)} />
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Gender</InputLabel>
        <Select
          id='sex' 
          name='sex' 
          label='Gender' 
          value={props.pass.sex}
          onChange={(e)=>props.pass.setSex(e.target.value)}
        >
          <MenuItem value={"M"}>M</MenuItem>
          <MenuItem value={"F"}>F</MenuItem>
        </Select>
        </FormControl>
        </Grid>


        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Address</InputLabel>
        <Select
          id='address' 
          name='address' 
          label='Address' 
          value={props.pass.address}
          onChange={(e)=>props.pass.setAddress(e.target.value)}
        >
          <MenuItem value={"U"}>Urban</MenuItem>
          <MenuItem value={"R"}>Rural</MenuItem>
        </Select>
        </FormControl>
        </Grid>

        <Grid item lg={4} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='fullAddress' 
        name='fullAddress' 
        label='Full Address' 
        type='text' 
        value={props.pass.fullAddress}
        onChange={(e)=>props.pass.setFullAddress(e.target.value)} />
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='phone' 
        name='phone' 
        label='Phone No' 
        type='text' 
        value={props.pass.phone}
        onChange={(e)=>props.pass.setPhone(e.target.value)} />
        </Grid>

        <Grid item lg={3} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='motherName' 
        name='motherName' 
        label='Mother Name' 
        type='text' 
        value={props.pass.motherName}
        onChange={(e)=>props.pass.setMotherName(e.target.value)} />
        </Grid>

        <Grid item lg={3} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Mother Education</InputLabel>
        <Select
        id='motherEducation'  
        label='Mother Education'
        name='motherEducation'   
        value={props.pass.motherEducation}
        onChange={(e)=>props.pass.setMotherEducation(e.target.value)}
        >
          <MenuItem value={0}>No Education</MenuItem>
          <MenuItem value={1}>Primary Education </MenuItem>
          <MenuItem value={2}>More Than Primary Education</MenuItem>
          <MenuItem value={3}>Secondary Education</MenuItem>
          <MenuItem value={4}>Higher Education</MenuItem>
        </Select>
        </FormControl>  
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Mother Job</InputLabel>
        <Select
        id='motherJob'  
        label='Mother Job'
        name='motherJob'   
        value={props.pass.motherJob}
        onChange={(e)=>props.pass.setMotherJob(e.target.value)}
        >
          <MenuItem value={"at_home"}>At Home</MenuItem>
          <MenuItem value={"health"}>Health Care</MenuItem>
          <MenuItem value={"services"}>Services</MenuItem>
          <MenuItem value={"teacher"}>Teacher</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
        </FormControl>  
        </Grid>


        <Grid item lg={3} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='fatherName' 
        name='fatherName' 
        label='Father Name' 
        type='text' 
        value={props.pass.fatherName}
        onChange={(e)=>props.pass.setFatherName(e.target.value)} />
        </Grid>

        
        <Grid item lg={3} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Father Education</InputLabel>
        <Select
        id='fatherEducation'  
        label='Father Education'
        name='fatherEducation'   
        value={props.pass.fatherEducation}
        onChange={(e)=>props.pass.setFatherEducation(e.target.value)}
        >
          <MenuItem value={0}>No Education</MenuItem>
          <MenuItem value={1}>Primary Education </MenuItem>
          <MenuItem value={2}>More Than Primary Education</MenuItem>
          <MenuItem value={3}>Secondary Education</MenuItem>
          <MenuItem value={4}>Higher Education</MenuItem>
        </Select>
        </FormControl>  
        </Grid>


        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Father Job</InputLabel>
        <Select
        id='fatherJob'  
        label='Father Job'
        name='fatherJob'   
        value={props.pass.fatherJob}
        onChange={(e)=>props.pass.setFatherJob(e.target.value)}
        >
          <MenuItem value={"at_home"}>At Home</MenuItem>
          <MenuItem value={"health"}>Health Care</MenuItem>
          <MenuItem value={"services"}>Services</MenuItem>
          <MenuItem value={"teacher"}>Teacher</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Family Size</InputLabel>
        <Select
        id='familySize'  
        label='Family Size'
        name='familySize'   
        value={props.pass.familySize}
        onChange={(e)=>props.pass.setFamilySize(e.target.value)}
        >
          <MenuItem value={"LE3"}>Less Than 3</MenuItem>
          <MenuItem value={"GT3"}>More Than 3</MenuItem>
        </Select>
        </FormControl>  
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Parent Status</InputLabel>
        <Select
        id='parentStatus'  
        label='parentStatus'
        name='parentStatus'   
        value={props.pass.parentStatus}
        onChange={(e)=>props.pass.setParentStatus(e.target.value)}
        >
          <MenuItem value={"T"}>Joint Family</MenuItem>
          <MenuItem value={"A"}>Nuclear Family</MenuItem>
        </Select>
        </FormControl>  
        </Grid>


        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel> Family Support</InputLabel>
        <Select
        id='familySupport'  
        label='Family Support'
        name='familySupport'   
        value={props.pass.familySupport}
        onChange={(e)=>props.pass.setFamilySupport(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel> Family Relations</InputLabel>
        <Select
        id='familyRelationship'  
        label='familyRelationship'
        name='familyRelationship'   
        value={props.pass.familyRelationship}
        onChange={(e)=>props.pass.setFamilyRelationship(e.target.value)}
        >
          <MenuItem value={1}>Very Bad</MenuItem>
          <MenuItem value={2}>Bad</MenuItem>
          <MenuItem value={3}>Okay</MenuItem>
          <MenuItem value={4}>Good</MenuItem>
          <MenuItem value={5}>Very Good</MenuItem>
          </Select>
        </FormControl>  
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Extra Classes</InputLabel>
        <Select
        id='extraEducationSupport'  
        label='Extra Education Support'
        name='extraEducationSupport'   
        value={props.pass.extraEducationSupport}
        onChange={(e)=>props.pass.setExtraEducationSupport(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 
 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel> Coaching</InputLabel>
        <Select
        id='extraPaidClasses'  
        label='extraPaidClasses'
        name='extraPaidClasses'   
        value={props.pass.extraPaidClasses}
        onChange={(e)=>props.pass.setExtraPaidClasses(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Extra Curricular</InputLabel>
        <Select
        id='extraCurricular'  
        label='Extra Curricular'
        name='extraCurricular'   
        value={props.pass.extraCurricular}
        onChange={(e)=>props.pass.setExtraCurricular(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Nursery</InputLabel>
        <Select
        id='nurseryEducation'  
        label='nurseryEducation'
        name='nurseryEducation'   
        value={props.pass.nurseryEducation}
        onChange={(e)=>props.pass.setNurseryEducation(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Higher Studies</InputLabel>
        <Select
        id='higherEducation'  
        label='higherEducation'
        name='higherEducation'   
        value={props.pass.higherEducation}
        onChange={(e)=>props.pass.setHigherEducation(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Free Time</InputLabel>
        <Select
        id='freeTime'  
        label='freeTime'
        name='freeTime'   
        value={props.pass.freeTime}
        onChange={(e)=>props.pass.setFreeTime(e.target.value)}
        >
          <MenuItem value={1}>Very Less</MenuItem>
          <MenuItem value={2}>Less</MenuItem>
          <MenuItem value={3}>Okay</MenuItem>
          <MenuItem value={4}>Much</MenuItem>
          <MenuItem value={5}>Very Much</MenuItem>
          </Select>
        </FormControl>  
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Travel Time</InputLabel>
        <Select
        id='travelTime'  
        label='travelTime'
        name='travelTime'   
        value={props.pass.travelTime}
        onChange={(e)=>props.pass.setTravelTime(e.target.value)}
        >
          <MenuItem value={1}>15 min</MenuItem>
          <MenuItem value={2}>15 min - 30 min</MenuItem>
          <MenuItem value={3}>30 min</MenuItem>
          <MenuItem value={4}>30 min - 1 hour</MenuItem>
          <MenuItem value={5}>1 hour</MenuItem>
          </Select>
        </FormControl>  
        </Grid>

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Study Time</InputLabel>
        <Select
        id='studyTime'  
        label='studyTime'
        name='studyTime'   
        value={props.pass.studyTime}
        onChange={(e)=>props.pass.setStudyTime(e.target.value)}
        >
          <MenuItem value={1}>2 hours</MenuItem>
          <MenuItem value={2}>2 hours - 5 hours</MenuItem>
          <MenuItem value={3}>5 hours - 10 hours</MenuItem>
          <MenuItem value={4}>10 hours</MenuItem>
          </Select>
        </FormControl>  
        </Grid>

        
        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='failures' 
        name='Failures' 
        label='Failures' 
        type='text' 
        value={props.pass.failures}
        onChange={(e)=>props.pass.setFailures(e.target.value)} 
        />
        </Grid>
        
        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel>Internet</InputLabel>
        <Select
        id='internet'  
        label='internet'
        name='internet'   
        value={props.pass.internet}
        onChange={(e)=>props.pass.setInternet(e.target.value)}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <FormControl fullWidth required margin='normal' >
        <InputLabel> Health </InputLabel>
        <Select
        id='health'  
        label='health'
        name='health'   
        value={props.pass.health}
        onChange={(e)=>props.pass.setHealth(e.target.value)}
        >
          <MenuItem value={1}>Very Bad</MenuItem>
          <MenuItem value={2}>Bad</MenuItem>
          <MenuItem value={3}>Okay</MenuItem>
          <MenuItem value={4}>Good</MenuItem>
          <MenuItem value={5}>Very Good</MenuItem>
          </Select>
        </FormControl>  
        </Grid> 

        <Grid item lg={2} md={12}  xs={12}>
        <TextField margin='normal' fullWidth required 
        id='absences' 
        name='Absences' 
        label='Absences' 
        type='text' 
        value={props.pass.absences}
        onChange={(e)=>props.pass.setAbsences(e.target.value)} 
        />
        </Grid>
      </Grid>
      </div>
    </div>
  );
};

export default Details;
