import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import "./new.scss";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fragment } from 'react';
import { Box } from '@mui/material';
import { useState,useEffect,useContext } from "react";
import Create from '../create/Create';
import Subjects from '../subjects/Subject';
import Details from '../details/Details';
import TeacherContext, { StudentProvider } from '../home/TeacherContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
let tokenfromstorage = localStorage.length!==0?JSON.parse(localStorage.getItem('teachertoken')):null;
let token;
if(tokenfromstorage){
   token=tokenfromstorage.token;
}
console.log(token)
// Dark Mode
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
function New(){
const navigate = useNavigate();
const location = useLocation();
const{updateStudent,setUpdateStudent}=useContext(TeacherContext);

//Create Student
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');


//Details
 
//Frontend
  const [standard, setStandard] = useState('');
  const [batch, setBatch] = useState('');
  const [dob, setDOB] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [motherName,setMotherName]=useState('');
  const [fatherName,setFatherName]=useState('');

 //AI model
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [parentStatus, setParentStatus] = useState('');
  const [motherJob, setMotherJob] = useState('');
  const [motherEducation, setMotherEducation] = useState('');
  const [fatherEducation, setFatherEducation] = useState('');
  const [fatherJob, setFatherJob] = useState('');
  const [extraEducationSupport, setExtraEducationSupport] = useState('');
  const [familySupport, setFamilySupport] = useState('');
  const [familyRelationship, setFamilyRelationship] = useState('');
  const [extraPaidClasses, setExtraPaidClasses] = useState('');
  const [nurseryEducation, setNurseryEducation] = useState('');
  const [extraCurricular, setExtraCurricular]= useState('');
  const [higherEducation, setHigherEducation] = useState('');
  const [freeTime, setFreeTime] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [failures, setFailures] = useState('');
  const [internet, setInternet] = useState('');
  const [health, setHealth] = useState('');
  const [absences, setAbsences] = useState('');

//Subjects

const[hindi,setHindi]=useState([]);
const[english,setEnglish]=useState([]);
const[math,setMath]=useState([]);
const[science,setScience]=useState([]);
const[socialScience,setSocialScience]=useState([]);

const[newhindi,setNewHindi]=useState([]);
const[newenglish,setNewEnglish]=useState([]);
const[newmath,setNewMath]=useState([]);
const[newscience,setNewScience]=useState([]);
const[newsocialScience,setNewSocialScience]=useState([]);


const createProps={studentID,studentEmail,studentName,setStudentEmail,setStudentName,setStudentID};

const detailsProps={standard,setStandard,batch,setBatch,dob,setDOB,fullAddress,setFullAddress,phone,setPhone,
    motherName,setMotherName,fatherName,setFatherName,sex,setSex,age,setAge,address,setAddress,familySize,setFamilySize,
    parentStatus,setParentStatus,motherJob,setMotherJob,motherEducation,setMotherEducation,fatherEducation,
    setFatherEducation,fatherJob,setFatherJob,extraEducationSupport,setExtraEducationSupport,familySupport,
    setFamilySupport,familyRelationship,setFamilyRelationship,extraPaidClasses,setExtraPaidClasses,nurseryEducation,
    setNurseryEducation,extraCurricular,setExtraCurricular,higherEducation,setHigherEducation,freeTime,setFreeTime,
    travelTime,setTravelTime,studyTime,setStudyTime,failures,setFailures,internet,setInternet,health,setHealth,
    absences,setAbsences};

const subjectProps={hindi,setHindi,english,setEnglish,math,setMath,science,setScience,socialScience,setSocialScience,
    newhindi,setNewHindi,newenglish,setNewEnglish,newmath,setNewMath,newscience,setNewScience,newsocialScience,setNewSocialScience }


useEffect(() => {
  
  if(location.pathname==='/teacher/dashboard/update-student'){
    if(updateStudent?.studentId!==undefined){
console.log('inside update');
            setStudentEmail(updateStudent?.email?updateStudent.email:'');
            setStudentID(updateStudent?.studentId?updateStudent.studentId:"");
            setStudentName(updateStudent?.studentName?updateStudent.studentName:"");
            setStandard(updateStudent?.studentDetails?updateStudent.studentDetails.standard:"");
            setFullAddress(updateStudent?.studentDetails?updateStudent.studentDetails.fullAddress:"");
            setBatch(updateStudent?.studentDetails?updateStudent.studentDetails.batch:"");
            setDOB(updateStudent?.studentDetails?updateStudent.studentDetails.dob:"");
            setPhone(updateStudent?.studentDetails?updateStudent.studentDetails.phone:"");
            setMotherName(updateStudent?.studentDetails?updateStudent.studentDetails.motherName:"");
            setFatherName(updateStudent?.studentDetails?updateStudent.studentDetails.fatherName:"");
            setSex(updateStudent?.studentDetails?updateStudent.studentDetails.sex:"");
            setAge(updateStudent?.studentDetails?updateStudent.studentDetails.age:"");
            setAddress(updateStudent?.studentDetails?updateStudent.studentDetails.address:"");
            setMotherEducation(updateStudent?.studentDetails?updateStudent.studentDetails.motherEducation:"");
            setMotherJob(updateStudent?.studentDetails?updateStudent.studentDetails.motherJob:"");
            setFatherJob(updateStudent?.studentDetails?updateStudent.studentDetails.fatherJob:"");
            setFatherEducation(updateStudent?.studentDetails?updateStudent.studentDetails.fatherEducation:"");
            setFamilySize(updateStudent?.studentDetails?updateStudent.studentDetails.familySize:"");
            setParentStatus(updateStudent?.studentDetails?updateStudent.studentDetails.parentStatus:"");
            setFamilySupport(updateStudent?.studentDetails?updateStudent.studentDetails.familySupport:"");
            setFamilyRelationship(updateStudent?.studentDetails?updateStudent.studentDetails.familyRelationship:"");
            setExtraEducationSupport(updateStudent?.studentDetails?updateStudent.studentDetails.schoolSupport:"");
            setExtraPaidClasses(updateStudent?.studentDetails?updateStudent.studentDetails.extraPaidClasses:"");
            setExtraCurricular(updateStudent?.studentDetails?updateStudent.studentDetails.extraCurricularActivities:"");
            setNurseryEducation(updateStudent?.studentDetails?updateStudent.studentDetails.nurseryEducation:"");
            setHigherEducation(updateStudent?.studentDetails?updateStudent.studentDetails.higherEducation:"");
            setFreeTime(updateStudent?.studentDetails?updateStudent.studentDetails.freeTime:"");
            setTravelTime(updateStudent?.studentDetails?updateStudent.studentDetails.travelTime:"");
            setStudyTime(updateStudent?.studentDetails?updateStudent.studentDetails.studyTime:"");
            setFailures(updateStudent?.studentDetails?updateStudent.studentDetails.failures:"");
            setInternet(updateStudent?.studentDetails?updateStudent.studentDetails.internet:"");
            setHealth(updateStudent?.studentDetails?updateStudent.studentDetails.health:"");
            setAbsences(updateStudent?.studentDetails?updateStudent.studentDetails.absences:"");
            setHindi(updateStudent.studentDetails.studentMarks?.hindi?updateStudent.studentDetails.studentMarks.hindi:[]);
            setEnglish(updateStudent.studentDetails.studentMarks?.english?updateStudent.studentDetails.studentMarks.english:[]);
            setScience(updateStudent.studentDetails.studentMarks?.science?updateStudent.studentDetails.studentMarks.science:[]);
            setMath(updateStudent.studentDetails.studentMarks?.math?updateStudent.studentDetails.studentMarks.math:[]);
            setSocialScience(updateStudent.studentDetails.studentMarks?.sst?updateStudent.studentDetails.studentMarks.sst:[]);
    }

}
  
},[updateStudent]);


    const choose=(num)=>{
    return num>0;
}
    const [alert, setAlert] = useState(false);


    const handleSubmit = (e) => {
        const actualData = {
            email: studentEmail,
            studentId: `student${studentID}`,
            studentName,
            studentDetails: {
                batch,
                dob,
                phone,
                standard,
                motherName,
                fatherName,
                sex,
                age,
                address,
                fullAddress,
                motherEducation,
                motherJob,
                fatherEducation,
                fatherJob: fatherJob,
                familySize,
                parentStatus,
                familySupport,
                familyRelationship,
                schoolSupport: extraEducationSupport,
                extraPaidClasses,
                extraCurricularActivities:extraCurricular,
                nurseryEducation,
                higherEducation,
                freeTime,
                travelTime,
                studyTime,
                failures,
                internet,
                health,
                absences: absences,
                studentMarks:{
                science:document.getElementById('science_term1').value.split(',').map(num=>Number(num)).filter(choose),
                english:document.getElementById('english_term1').value.split(',').map(num=>Number(num)).filter(choose),
                hindi:document.getElementById('hindi_term1').value.split(',').map(num=>Number(num)).filter(choose),
                sst:document.getElementById('sst_term1').value.split(',').map(num=>Number(num)).filter(choose),
                math:document.getElementById('math_term1').value.split(',').map(num=>Number(num)).filter(choose)
                }
            }
        }
console.log(actualData)

    axios.post("http://localhost:8080/teacher/create/student", actualData,{headers: {
    "Authorization": `Bearer ${token}`
            }}).then((response) => {
            console.log(response);
            let responseToken = response.data
            console.log(responseToken)
            setTimeout(()=>{
            navigate('/teacher/dashboard')
            },5000)
            setAlert(!alert);
        }).catch((error) => {
            console.log(error)
        })

    }
const updatehandle=(e)=>{
            const actualData = {
                batch,
                dob,
                phone,
                standard,
                motherName,
                fatherName,
                sex,
                age,
                address,
                fullAddress,
                motherEducation,
                motherJob,
                fatherEducation,
                fatherJob: fatherJob,
                familySize,
                parentStatus,
                familySupport,
                familyRelationship,
                schoolSupport: extraEducationSupport,
                extraPaidClasses,
                extraCurricularActivities:extraCurricular,
                nurseryEducation,
                higherEducation,
                freeTime,
                travelTime,
                studyTime,
                failures,
                internet,
                health,
                absences: absences,
                studentMarks:{
                science:[document.getElementById('science_term1').value.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/2,newscience.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/newscience.split(',').length],
                english:[document.getElementById('english_term1').value.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/2,+newenglish.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/newenglish.split(',').length],
                hindi:[document.getElementById('hindi_term1').value.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/2,+newhindi.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/newhindi.split(',').length],
                sst:[document.getElementById('sst_term1').value.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/2,+newsocialScience.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/newsocialScience.split(',').length],
                math:[document.getElementById('math_term1').value.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/2,+newmath.split(',').map(num=>Number(num)).filter(choose).reduce((acc,curr)=>acc+curr,0)/newmath.split(',').length]
                }         
        }
console.log(actualData)
axios.put(`http://localhost:8080/teacher/update/student/${studentID}`, actualData,{headers: {
    "Authorization": `Bearer ${token}`
            }}).then((response) => {
            console.log(response);
            let responseToken = response.data
            console.log(responseToken)
            setAlert(!alert);
            setUpdateStudent({})
            setTimeout(()=>{
            navigate('/teacher/dashboard')
},2000)
        }).catch((error) => {
            console.log(error)
        })
}

// const token = JSON.parse(localStorage.getItem('token'));
//         console.log(token.token)
        
    const steps = ['Create New Student', 'Enter Student Details', 'Enter Subject Marks'];

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const visible = {
        visibility: 'visible',
        position:'relative',
        top:0,
        left:0
        
    };
    const hidden = {
        visibility: 'hidden',
        position:'absolute',
        top:'-100%',
        left:'-100%'
        
    };

const closeAlert=()=>{
        setAlert(!alert);
}


    return (
<div className='flex w-full'>

<div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">          
        </div>
        <div className="grid grid-cols-6 gap-4 w-full">
            <div className="new col-start-1 col-span-6">
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {(
        <ThemeProvider theme={darkTheme}>
            <StudentProvider>
                        <Fragment>
                            
                            <div>
                                <StudentProvider><Create pass={createProps} st={activeStep + 1 === 1 ? visible : hidden} /></StudentProvider>
                                <StudentProvider><Details pass={detailsProps} st={activeStep + 1 === 2 ? visible : hidden} /></StudentProvider>
                                <StudentProvider><Subjects pass={subjectProps} st={activeStep + 1 === 3 ? visible : hidden} /></StudentProvider>
                            </div>

                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button >
                                <Box sx={{ flex: '1 1 auto'}} />
                                {activeStep === steps.length - 1 ? <Button variant="contained" onClick={location.pathname!=='/teacher/dashboard/update-student'?handleSubmit:updatehandle}>{location.pathname!=='/teacher/dashboard/update-student'?'Submit':'Update'}</Button> : <Button variant="contained" onClick={handleNext}>Next</Button>}
                            </Box>
                                <br></br>     
                              {alert ? <Alert onClose={() => { closeAlert() }}>{location.pathname!=='/teacher/dashboard/update-student'?"Student is Successfully Created!":"Student is Updated Successfully!!!"}</Alert> : ""}
                        </Fragment>
                        
        </StudentProvider>
    </ThemeProvider>
                    )}
                    
                
        </div>
    </div>
</div>
    );
}

export default New;