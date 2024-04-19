import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend } from 'recharts';
import TeacherContext from "../home/TeacherContext";
import {useContext} from 'react';


function Graph() {
    const {predStudent, setPredStudent}=useContext(TeacherContext);
    const {predEnglish,predHindi,predMath,predSst,predScience,predOverall}=useContext(TeacherContext);
    console.log(predEnglish)
    let G1;
    let G2;
    let newMarks;
    const graphData = [
    'English',
    'Hindi',
    'Science',
    'Math',
    'Sst',
    'Overall'
    ].map((i) => {
             let j= i.charAt(0).toLowerCase() + i.slice(1);
        // eslint-disable-next-line default-case
        switch(j){
            
            case 'english':
            G1 = predStudent.studentDetails.studentMarks['english'][0]*5;
            G2 = predStudent.studentDetails.studentMarks['english'][1]*5;
            newMarks = predEnglish ;
            return {name:i,Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'hindi':
            G1 = predStudent.studentDetails.studentMarks['hindi'][0]*5;
            G2 = predStudent.studentDetails.studentMarks['hindi'][1]*5;
            newMarks = predHindi ;
            return{name:i,Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'science':
            G1=predStudent.studentDetails.studentMarks['science'][0]*5;
            G2=predStudent.studentDetails.studentMarks['science'][1]*5;
            newMarks=predScience ;
            return{name:i,Term1:G1,Term2:G2,Predicted:newMarks}
            
            case 'math':
            G1=predStudent.studentDetails.studentMarks['math'][0]*5;
            G2=predStudent.studentDetails.studentMarks['math'][1]*5;
            newMarks=predMath ;
            return{name:i,Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'sst':
            G1=predStudent.studentDetails.studentMarks['sst'][0]*5;
            G2=predStudent.studentDetails.studentMarks['sst'][1]*5;
            newMarks=predSst;
            return{name:'Social Science',Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'overall':
            let obj=predStudent.studentDetails.studentMarks
            let sum1=0;
            let sum2=0
            for(let key in obj){
                sum1+=obj[key][0];
                sum2+=obj[key][1]
            }
            newMarks=predOverall
            return{name:i,Term1:sum1,Term2:sum2,Predicted:newMarks}
}
});

console.log(graphData)

const CustomTooltip = ({ active, payload, label }) => {
     if(active && payload && payload.length) {

        return(
        <div className="rounded-xl overflow-hidden tooltip-head">
            <div className="flex items-center justify-between p-2">
                <div className="text-white">{label}</div> 
            </div>
            <div className="tooltip-body text-center p-3 flex flex-col items-stretch" >
                <div className="font-bold text-[#00D7FF]">{`Term1 Score: ${payload[0].payload.Term1}`}</div>
                <div className="font-bold text-[#00FFAB]">{`Term2 Score: ${payload[0].payload.Term2}`}</div>
                <div className="font-bold text-[#7C83FD]">{`Predicted Score: ${payload[0].payload.Predicted}`}</div>
            </div>
        </div>)}

return null;
}
    return (
        <div className="flex p-4 h-full flex-col">
            <div className="">
                <div className="flex items-center mb-5 ">
                    <div className="font-bold text-white">Overall Performance</div>
                    <div className="flex-grow" />
                </div>
            </div>

            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={300} data={graphData} margin={{ top:-20, bottom:5}}>
                        <CartesianGrid
                            strokeDasharray="5 5"
                            stroke="#252525"
                        />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} padding={{ left: 50, right: 50 }}/>
                        <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                        <Bar dataKey="Term1" fill="#00D7FF" />
                        <Bar dataKey="Term2" fill="#00FFAB" />
                        <Bar dataKey="Predicted" fill="#7C83FD" />
                        <Tooltip cursor={false} content={CustomTooltip}/>
                        <Legend align='right' verticalAlign="top" height={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Graph