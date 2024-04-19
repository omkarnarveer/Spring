import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { useState,useEffect,useContext } from 'react';
import { animated, useSpring } from '@react-spring/web'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import TeacherContext from "../home/TeacherContext";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Content from './Content';
import Typography from '@mui/material/Typography';

let tokenfromstorage = localStorage.length!==0?JSON.parse(localStorage.getItem('teachertoken')):null;
let token
if(tokenfromstorage){
   token=tokenfromstorage.token;
}
console.log(token)
export default function Report() {
console.log("report")

const {predStudent,setPredStudent}=useContext(TeacherContext);
const {predEnglish,setPredEnglish}=useContext(TeacherContext);
const {predMath,setPredMath}=useContext(TeacherContext);
const {predHindi,setPredHindi}=useContext(TeacherContext);
const {predScience,setPredScience}=useContext(TeacherContext);
const {predSst,setPredSst}=useContext(TeacherContext);
const {predOverall,setPredOverall}=useContext(TeacherContext);
const {studentSubjectData,setStudentSubjectData,setSendMail,setSubtoSend}=useContext(TeacherContext);


useEffect(()=>{
    const FetchData=async ()=>{
    let english,hindi,math,science,sst,overall;

    if(predStudent.studentDetails.predictedResult?.english===undefined){
                console.log('if')
                let response=await axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/english`,{headers: {"Authorization": `Bearer ${token}` }});
                english=response.data["Predicted Score"];
    }
    else{
            console.log('else')
            //english.data={}
            english=JSON.parse(predStudent.studentDetails.predictedResult.english)['Predicted Score'];
                console.log(english)
    }
    if(!predStudent.studentDetails.predictedResult?.hindi){
                console.log('if')
            let response=await axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/hindi`,{headers: {"Authorization": `Bearer ${token}` }})
                hindi=response.data["Predicted Score"]
    }
 else{
               // hindi.data={}
            hindi=JSON.parse(predStudent.studentDetails.predictedResult.hindi)['Predicted Score'];
    }
    if(!predStudent.studentDetails.predictedResult?.math){ 
console.log('if')
            let response=await axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/math`,{headers: {"Authorization": `Bearer ${token}` }})
                math=response.data['Predicted Score']
   }
 else{
        // math.data={}
            math=JSON.parse(predStudent.studentDetails.predictedResult.math)['Predicted Score'];
    }
    if(!predStudent.studentDetails.predictedResult?.science){ 
console.log('if')
            let response=await axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/science`,{headers: {"Authorization": `Bearer ${token}` }})
                science=response.data['Predicted Score']
}
 else{
                //science.data={}
            science=JSON.parse(predStudent.studentDetails.predictedResult.science)['Predicted Score'];
    }
    if(!predStudent.studentDetails.predictedResult?.sst){
console.log('if')
            let response=await axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/sst`,{headers: {"Authorization": `Bearer ${token}` }})
                sst=response.data['Predicted Score']
}
 else{
                //sst.data={}
            sst=JSON.parse(predStudent.studentDetails.predictedResult.sst)['Predicted Score'];
    }
    if(!predStudent.studentDetails.predictedResult?.overall){
            console.log('if');
            let response=await axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/overall`,{headers: {"Authorization": `Bearer ${token}` }})
                overall=response.data['Predicted Score']
         }
 else{
       
        overall=JSON.parse(predStudent.studentDetails.predictedResult.overall)['Predicted Score'];
    }
    console.log(english,hindi,math,sst,science)
     setPredEnglish(english)
     setPredHindi(hindi)
     setPredMath(math)
     setPredSst(sst)
     setPredScience(science)
     setPredOverall(overall)
    function retobj(id,name,score,rise,progress){
        return{id,name,score,rise,progress}
    }
    let engrise=english/5>predStudent.studentDetails.studentMarks.english.reduce((acc,curr)=>acc+curr,0)/2
    let hinrise=hindi/5>predStudent.studentDetails.studentMarks.hindi.reduce((acc,curr)=>acc+curr,0)/2
    let scirise=science/5>predStudent.studentDetails.studentMarks.science.reduce((acc,curr)=>acc+curr,0)/2
    let matrise=math/5>predStudent.studentDetails.studentMarks.math.reduce((acc,curr)=>acc+curr,0)/2
    let sstrise=sst/5>predStudent.studentDetails.studentMarks.sst.reduce((acc,curr)=>acc+curr,0)/2
    
    let obj=predStudent.studentDetails.studentMarks
    let sum=0
    for(let key in obj){
        sum=(obj[key][0]+obj[key][1])/2
    }
    let ovlrise=overall/4>sum;
    setStudentSubjectData([retobj('eng','English',english,engrise,english/20),retobj('hin','Hindi',hindi,hinrise,hindi/20),retobj('mat','Math',math,matrise,math/20),retobj('sci','Science',science,scirise,science/20),retobj('sst','Social Science',sst,sstrise,sst/20),retobj('overall','Overall',overall,ovlrise,overall/20)]);
    let predarr=[english,hindi,math,science,sst,overall]
    console.log(predarr)
    let arr=predarr.map((ele,index)=>{
        console.log(ele)
        if(ele<50){
                return index;
        }
                })
        console.log(arr)
        setSubtoSend(arr);
    setSendMail(predarr.some(ele=>ele<50));
}

  FetchData();
},[])

    return (
        <div className="flex">
            <Content
              subData={studentSubjectData}
            />
        </div>
    );
}

//     if(predEnglish===null&&predStudent.studentDetails.predictedResult?.english?true:false){
//     axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/english`,{headers: {"Authorization": `Bearer ${token}` }}).then((data)=>{
//         console.log(data.data['Predicted Score'])
//         let english=data.data['Predicted Score']
//         setPredEnglish(english)
//     let rise=predEnglish/5>predStudent.studentDetails.studentMarks.english.reduce((acc,curr)=>acc+curr,0)/2
//     setStudentSubjectData([...studentSubjectData,{
//         id: 'eng',
//         name: 'English',
//         score: predEnglish,
//         rise:rise,
//         progress: 5,
//     }])
// }).catch(error=>console.log(error)) 
//     }
//     else{

//         let english=predStudent.studentDetails.predictedResult.english["Predicted Score"]
//         setPredEnglish(english)
//         console.log(english)
//         let rise=predEnglish/5>predStudent.studentDetails.studentMarks.english.reduce((acc,curr)=>acc+curr,0)/2
//         setStudentSubjectData([...studentSubjectData,{
//         id: 'eng',
//         name: 'English',
//         score: predEnglish,
//         rise:rise,
//         progress: 5,
//     }])

// }
// if(predHindi===null&&predStudent.studentDetails.predictedResult?.hindi?true:false){
// axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/hindi`,{headers: {"Authorization": `Bearer ${token}` }}).then((data)=>{
//         console.log(data.data['Predicted Score'])
//         let hindi=data.data['Predicted Score']
//         setPredHindi(hindi)
//         let rise=predHindi/5>predStudent.studentDetails.studentMarks.hindi.reduce((acc,curr)=>acc+curr,0)/2
//         setStudentSubjectData([...studentSubjectData,{
//         id: 'hin',
//         name: 'Hindi',
//         score: predHindi,
//         rise:rise,
//         progress: 5,
//     }])
// }).catch(error=>console.log(error))   
// }
// else{

//         let hindi=predStudent.studentDetails.predictedResult.hindi["Predicted Score"]
//         setPredHindi(hindi)
//         let rise=predHindi/5>predStudent.studentDetails.studentMarks.hindi.reduce((acc,curr)=>acc+curr,0)/2
//         setStudentSubjectData([...studentSubjectData,{
//         id: 'hin',
//         name: 'Hindi',
//         score: predEnglish,
//         rise:rise,
//         progress: 5,
//     }])
// }
// if(predMath===null&&predStudent.studentDetails.predictedResult?.math?true:false){ 
// axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/math`,{headers: {"Authorization": `Bearer ${token}` }}).then((data)=>{
//         console.log(data.data['Predicted Score'])
//         let math=data.data['Predicted Score']
//         setPredMath(math)
//  let rise=predMath/5>predStudent.studentDetails.studentMarks.math.reduce((acc,curr)=>acc+curr,0)/2
//     setStudentSubjectData([...studentSubjectData,{
//         id: 'mat',
//         name: 'Math',
//         score: predMath,
//         rise:rise,
//         progress: 5,
//     }])
// }).catch(error=>console.log(error))  
// }
// else{

//         let math=predStudent.studentDetails.predictedResult.math["Predicted Score"]
//         setPredMath(math)
//         let rise=predMath/5>predStudent.studentDetails.studentMarks.math.reduce((acc,curr)=>acc+curr,0)/2
//         setStudentSubjectData([...studentSubjectData,{
//         id: 'mat',
//         name: 'Math',
//         score: predEnglish,
//         rise:rise,
//         progress: 5,
//     }])
// }
// if(predScience===null&&predStudent.studentDetails.predictedResult?.science?true:false){ 
// axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/science`,{headers: {"Authorization": `Bearer ${token}` }}).then((data)=>{
//         console.log(data.data['Predicted Score'])
//         let science=data.data['Predicted Score']
//         setPredScience(science)
//  let rise=predScience/5>predStudent.studentDetails.studentMarks.science.reduce((acc,curr)=>acc+curr,0)/2
//     setStudentSubjectData([...studentSubjectData,{
//         id: 'sci',
//         name: 'Science',
//         score: predScience,
//         rise:rise,
//         progress: 5,
//     }])
// }).catch(error=>console.log(error))  
// }
// else{
// let science=predStudent.studentDetails.predictedResult.science["Predicted Score"]
//         setPredScience(science)
//  let rise=predScience/5>predStudent.studentDetails.studentMarks.science.reduce((acc,curr)=>acc+curr,0)/2
//     setStudentSubjectData([...studentSubjectData,{
//         id: 'sci',
//         name: 'Science',
//         score: predScience,
//         rise:rise,
//         progress: 5,
//     }])
// 

// }

// if(predSst===null&&predStudent.studentDetails.predictedResult?.sst?true:false){
// axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/sst`,{headers: {"Authorization": `Bearer ${token}` }}).then((data)=>{
//         console.log(data.data['Predicted Score'])
//         let sst=data.data['Predicted Score']
//         setPredSst(sst)
//  let rise=predSst/5>predStudent.studentDetails.studentMarks.sst.reduce((acc,curr)=>acc+curr,0)/2
//     setStudentSubjectData([...studentSubjectData,{
//         id: 'sst',
//         name: 'Social Science',
//         score: predSst,
//         rise:rise,
//         progress: 5,
//     }])
// }).catch(error=>console.log(error))    

// }
// else{
// let sst=predStudent.studentDetails.predictedResult.sst["Predicted Score"]
// console.log(sst)
//         setPredSst(sst)
//  let rise=predSst/5>predStudent.studentDetails.studentMarks.sst.reduce((acc,curr)=>acc+curr,0)/2
//     setStudentSubjectData([...studentSubjectData,{
//         id: 'sst',
//         name: 'Sst',
//         score: predSst,
//         rise:rise,
//         progress: 5,
//     }])


// }
// // if(predOverall===null){
// // axios.get(`http://localhost:8080/teacher/predict/${predStudent.studentId}/overall`,{headers: {"Authorization": `Bearer ${token}` }}).then((data)=>{
// //         console.log(data.data['Predicted Score'])
// //         let overall=data.data['Predicted Score']
// //         setPredOverall(overall)
// // }).catch(error=>console.log(error))      

// // }

// },[...studentSubjectData])

  










// const graphData = [
//     'english',
//     'hindi',
//     'science',
//     'math',
//     'sst',
// ].map((i) => {
//     const oldMarks = predStudent.studentDetails.studentMarks[i];
//     const expectedRevenue = Math.max(oldMarks + (Math.random() - 0.5) * 100, 0);
//     return {
//         name: i,
//         oldMarks,
//         expectedRevenue,
//         sales: Math.floor(Math.random() * 100),
//     };
// });


// function Graph() {

// const {predStudent,setPredStudent}=useContext(TeacherContext);
// const graphData = [
//     'english',
//     'hindi',
//     'science',
//     'math',
//     'sst',
// ].map((i) => {
//     const oldMarks = predStudent.studentDetails.studentMarks[i].reduce((sum,curr)=>sum+curr,0)/2;
//     console.log(oldMarks)
//     const expectedRevenue = Math.max(oldMarks + (Math.random() - 0.5) * 100, 0);
//     return {
//         name: i,
//         oldMarks,
//         expectedRevenue,
//         sales: Math.floor(Math.random() * 100),
//     };
// });
// console.log(graphData)



//     const CustomTooltip = () => (
//         <div className="rounded-xl overflow-hidden tooltip-head">
//             <div className="flex items-center justify-between p-2">
//                 <div className="">Score</div>
//             </div>
//             <div className="tooltip-body text-center p-3">
//                 <div className="text-white font-bold">10</div>
//                 <div className="">Out of 100 </div>
//             </div>
//         </div>
//     );
//     return (
//         <div className="flex p-4 h-full flex-col">
//             <div className="">
//                 <div className="flex items-center mb-5 ">
//                     <div className="font-bold text-white">Overall Performance</div>
//                     <div className="flex-grow" />
                    
//                     <div className="ml-2">Last 6 Months</div>
//                 </div>
//             </div>

//             <div className="flex-grow">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <LineChart width={500} height={300} data={graphData}>
//                         <defs>
//                             <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
//                                 <stop stopColor="#6B8DE3" />
//                                 <stop offset="1" stopColor="#7D1C8D" />
//                             </linearGradient>
//                         </defs>
//                         <CartesianGrid
//                             horizontal={false}
//                             strokeWidth="6"
//                             stroke="#252525"
//                         />
//                         <XAxis
//                             dataKey="name"
//                             axisLine={false}
//                             tickLine={false}
//                             tickMargin={10}
//                         />
//                         <YAxis axisLine={false} tickLine={false} tickMargin={10} />
//                         <Tooltip content={<CustomTooltip />} cursor={false} />
//                         <Line
//                             activeDot={false}
//                             type="monotone"
//                             dataKey="expectedRevenue"
//                             stroke="#242424"
//                             strokeWidth="3"
//                             dot={false}
//                             strokeDasharray="8 8"
//                         />
//                         <Line
//                             type="monotone"
//                             dataKey="oldMarks"
//                             stroke="url(#paint0_linear)"
//                             strokeWidth="4"
//                             dot={false}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// }


