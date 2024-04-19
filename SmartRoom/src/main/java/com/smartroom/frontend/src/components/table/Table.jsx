import { useNavigate } from "react-router-dom";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect,useContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import TeacherContext from "../../pages/home/TeacherContext";
let tokenfromstorage = localStorage.length!==0?JSON.parse(localStorage.getItem('teachertoken')):null;
let token;
if(tokenfromstorage){
  token=tokenfromstorage.token;
}


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const Subjects = () => {
const navigate = useNavigate();
const {students,setStudents,setUpdateStudent,setPredStudent}=useContext(TeacherContext) 

useEffect(()=>{
  axios.get('http://localhost:8080/auth/student/fetch/all').then(response=>{
console.log(response.data)
  setStudents(response.data)
})
   

},[])
   



function handleDelete(id){
    const tempStudents=students.filter((ele)=>ele.studentId!==id)
    console.log(tempStudents)
    setStudents(tempStudents)
}
function handleUpdate(id){
    const temp=students.find(element=>element.studentId===id)
    console.log(temp);
    setUpdateStudent(temp);
navigate('/teacher/dashboard/update-student')
}
function handleView(id){
    const temp=students.find(element=>element.studentId===id)
    console.log(temp);
    setPredStudent(temp);
    navigate('/teacher/dashboard/student-dashboard')
}

  return (
    <div className="flex w-full">
<div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">          
            </div>
 <ThemeProvider theme={darkTheme}>
    <TableContainer 
    sx={{p:2,m:2, 
    background:'#171717', boxShadow:'2px 2px 8px rgba(0,0,0,1), -2px -2px 4px rgba(255,255,255,.1)'}} 
    component={Paper} className="table">
      <Table sx={{ minWidth: 650 }}>
        <TableHead >
          <TableRow >
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:16}}>SNo</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:16}}>ID</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:16}}>Name</TableCell>
            <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:16}}>Email</TableCell>
            <TableCell className="tableCell" align='center' sx={{ fontWeight: 'bold', fontSize:16}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row,index) => (
            <TableRow key={row.studentId}>
              <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:15}}>{index+1}</TableCell>
              <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:15}}>{row.studentId}</TableCell>
              <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:15}}>{row.studentName}</TableCell>
              <TableCell className="tableCell" sx={{ fontWeight: 'bold', fontSize:15}}>{row.email}</TableCell>
              <TableCell className="tableCell">
              <Stack spacing={2} alignItems="center" direction="row">  
              <Button variant="contained" onClick={()=>handleView(row.studentId)} color="success" startIcon={<VisibilityIcon />  }>View</Button>
              <Button variant="contained" onClick={()=>handleUpdate(row.studentId)} startIcon={<EditIcon />}>Update</Button>
              <Button onClick={()=>handleDelete(row.studentId)} variant="contained" color="error" startIcon={<DeleteIcon />}>Delete</Button>
              </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</ThemeProvider>
    </div>
  );
};

export default Subjects;
