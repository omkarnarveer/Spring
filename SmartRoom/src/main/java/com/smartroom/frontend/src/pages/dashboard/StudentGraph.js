import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend } from 'recharts';
import {useContext,useEffect} from 'react';
import StudentCredContext from '../../contextStore/StudentCredentials';


function StudentGraph() {
const {userData,token}=useContext(StudentCredContext);
    console.log(token,userData)
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
             let data=userData.studentDetails;
        // eslint-disable-next-line default-case
        switch(j){
            
            case 'english':
            G1 = data.studentMarks['english'][0]*5;
            G2 = data.studentMarks['english'][1]*5;
            newMarks = JSON.parse(data.predictedResult.english)['Predicted Score'] ;
            return {name:i,Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'hindi':
            G1 = data.studentMarks['hindi'][0]*5;
            G2 = data.studentMarks['hindi'][1]*5;
            newMarks = JSON.parse(data.predictedResult.hindi)['Predicted Score'] ;
            return{name:i,Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'science':
            G1=data.studentMarks['science'][0]*5;
            G2=data.studentMarks['science'][1]*5;
            newMarks=JSON.parse(data.predictedResult.science)['Predicted Score'] ;
            return{name:i,Term1:G1,Term2:G2,Predicted:newMarks}
            
            case 'math':
            G1=data.studentMarks['math'][0]*5;
            G2=data.studentMarks['math'][1]*5;
            newMarks=JSON.parse(data.predictedResult.math)['Predicted Score'] ;
            return{name:i,Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'sst':
            G1=data.studentMarks['sst'][0]*5;
            G2=data.studentMarks['sst'][1]*5;
            newMarks=JSON.parse(data.predictedResult.sst)['Predicted Score'] ;
            return{name:'Social Science',Term1:G1,Term2:G2,Predicted:newMarks}
        
            case 'overall':
            let obj=data.studentMarks
            let sum1=0;
            let sum2=0
            for(let key in obj){  
                sum1+=obj[key][0];
                sum2+=obj[key][1]
            }
            newMarks=JSON.parse(data.predictedResult.overall)['Predicted Score'] ;
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

export default StudentGraph