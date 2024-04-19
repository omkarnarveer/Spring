import { TextField, Grid } from '@mui/material';
import { useState,useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TeacherContext from '../home/TeacherContext';


const Create = (props) => {
const location=useNavigate()
const {updateStudent}=useContext(TeacherContext)


useEffect(() => {
console.log('create')

    if(location.pathname==='/teacher/dashboard/update-student'){
console.log(location.pathname==='/teacher/dashboard/update-student')
    if(updateStudent?.studentId!==undefined){
console.log("inside create element")
        props.pass.setStudentID(updateStudent?.studentId?updateStudent.studentId:'')
        props.pass.setStudentEmail(updateStudent?.email?updateStudent.email:'')
        props.pass.setStudentName(updateStudent?.studentName?updateStudent.studentName:"")

    }}
}, [Object.values(updateStudent)]);
  return (
    <div className="new grid grid-cols-6 gap-4 bg-card rounded-lg" style={props.st}>
      <div className="col-start-1 col-span-6 text-[#4169E1] ">Student Credentials</div>
      <div className="col-start-1 col-span-6 " component="form" >
      
      <Grid container  spacing={2}>      
      <Grid item lg={4} md={12}  xs={12} >
      <TextField margin='normal' fullWidth required  id='studentID' name='studentID' 
      label='Student ID' type='text' value={props.pass.studentID}  onChange={(e) => props.pass.setStudentID(e.target.value)} />
      </Grid>

      <Grid item lg={4} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required  id='studentName' name='studentName' 
      label='Student Name' type='text' value={props.pass.studentName} onChange={(e) => props.pass.setStudentName(e.target.value)} />
      </Grid>

      <Grid item lg={4} md={12}  xs={12}>
      <TextField margin='normal' fullWidth required  id='studentEmail' name='studentEmail' 
      label='Student Email' type='email' value={props.pass.studentEmail} onChange={(e) => props.pass.setStudentEmail(e.target.value)} />
      </Grid>
      </Grid>
    </div>
  </div>
  );
};

export default Create;
