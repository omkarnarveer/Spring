import React,{useContext,useEffect,useState} from 'react';
import NameCard from './NameCard';
import Graph from './Graph';
import Detail from './Detail';
import Button from '@mui/material/Button';
import TeacherContext from '../home/TeacherContext';
import Alert from '@mui/material/Alert';
import axios from 'axios';
let token;
let tokenfromstorage = localStorage.length!==0?JSON.parse(localStorage.getItem('teachertoken')):null;
if(tokenfromstorage){
  token=tokenfromstorage.token;
}
const subject=['English','Hindi','Math','science','Sst','Overall']


function Content() {
    
    const {studentSubjectData,predEnglish,sendMail,predStudent,subtoSend}=useContext(TeacherContext);
    const [sent,setSent]=useState(false);
    console.log(predEnglish)

 

    const handleSendMail=()=>{
        let Databody="Attention Needed in Following Subject:\n";
        subtoSend.forEach((ele)=>{
        if(ele){
            Databody=Databody+subject[ele]+" \n";
            }
         })
        axios.post(`http://localhost:8080/teacher/send/email/${predStudent.email}`,Databody,{headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "text/plain"}}).then((res)=>{
            setSent(true);
            console.log(res)})
}
    console.log(sendMail);
    
    return (
        <div className="flex w-full">
            <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
                
            </div>
            <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
                {studentSubjectData.map(
                    ({
                        id,
                        name,
                        score,
                        rise,
                        progress,
                    }) => (
                        <NameCard
                            key={id}
                            id={id}
                            name={name}
                            scored={score}
                            rise={rise}
                            progress={progress}
                        />
                    ),
                )}

                <div className="w-full p-2  lg:w-2/3">
                    <div className="rounded-lg bg-card sm:h-96 h-96">
                        <Graph />
                    </div>
                </div>

                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card h-96">
                    <Detail />
                    </div>
                </div>

                {sendMail?<div className="w-full flex justify-center p-2">

                    <div></div>
                    <Button variant="contained" color="error" onClick={handleSendMail}>Attention Needed </Button>
                </div>:null}

                <div className="w-full flex justify-center mt-2 p-2">
                <div className="w-full">{ sent?<Alert severity="error">Email sent is successfully</Alert>:null} </div>
            </div>
                         

            </div>
        </div>
    );
}
export default Content