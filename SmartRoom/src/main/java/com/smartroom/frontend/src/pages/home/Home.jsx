import TeacherContext, { StudentProvider } from "./TeacherContext";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { useState ,useContext,useEffect} from 'react';
import { animated, useSpring} from '@react-spring/web'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend,Line,ComposedChart } from 'recharts';

import "./home.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import { Link,Route,Routes } from "react-router-dom";
import New from "../new/New";
import Table from '../../components/table/Table';
import TeacherCredContext from "../../contextStore/TeacherCreadential";
import Report from "../report/Report";
import axios from 'axios';
const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Home() {
    const [student,setStudent]=useState();
    const [syllabus,setSyllabus]=useState();
    const [attendence,setAttendence]=useState();
    const [average,setAverage]=useState();
    const [overall,setOverall]=useState();
    const [ascendStudent,setAscendStudent]=useState([])
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
    const fetchData=async ()=>{
        function overallMarks(data){
        let marksarr=data.studentDetails.studentMarks
        let sum=0;
        for (const key in marksarr){
            sum=sum+marksarr[key][0] 
            sum=sum+marksarr[key][1]
        } 
        return sum;
         }
        function compareFunction(a,b){
        let suma=overallMarks(a)
        let sumb=overallMarks(b);
        return suma-sumb;
        }
        let response=await axios.get('http://localhost:8080/auth/student/fetch/all')
        const sortedData=await response.data.sort(compareFunction)  
        setAscendStudent([...sortedData])
        setStudent(sortedData.length)
        setSyllabus(60);
        let attend=await sortedData.reduce((acc,curr)=>{
            return acc+curr.studentDetails.absences
        },0)
        setAttendence(Math.floor((93-(attend/sortedData.length))*100/93))
        let avg=await sortedData.reduce((acc,curr)=>{
            let sum=overallMarks(curr)/10;
            return acc+sum;
        },0)
        let averagemark=Math.round((avg/sortedData.length)*5)
        setAverage(averagemark)
        let overall=await sortedData.reduce((acc,curr)=>{
            let sum=JSON.parse(curr.studentDetails.predictedResult.overall)["Predicted Score"]
            return sum+acc;
        },0)
        setOverall(+overall/sortedData.length);

        setFlag(true);
        }
fetchData()


    },[])
 

    const {isValid}=useContext(TeacherCredContext)
    const [showSidebar, onSetShowSidebar] = useState(false);
    
    return (
<StudentProvider>
        <div className="flex">
            <Sidebar
                onSidebarHide={() => {
                    onSetShowSidebar(false);
                }}
                showSidebar={showSidebar}
            />
            <Routes>
            <Route index element={<StudentProvider>{flag?<TeacherContent cardData={{student,average,syllabus,attendence,overall,ascendStudent}}/>:null}</StudentProvider>} />
            <Route path='/create-student' element={<StudentProvider><New/></StudentProvider>}/>
            <Route path='/student-list' element={<StudentProvider><Table/></StudentProvider>} />
            <Route path='/update-student' element={<StudentProvider><New/></StudentProvider>}/>
            <Route path='/student-dashboard' element={<StudentProvider><Report/></StudentProvider>}/>
            </Routes>
        </div>
</StudentProvider>
    );
}



function TeacherContent({cardData}) {
    const [classData,setClassData]=useState()
useEffect(()=>{
    function objret(id,name,result,progress){
        return{id,name,result,progress}
    }
    setClassData([objret(1,'Students',cardData.student,1),objret(2,'Syllabus',cardData.syllabus,3),objret(3,'Attendence',cardData.attendence,cardData.attendence/20),objret(4,'Average',cardData.average,cardData.average/20),objret(5,'Overall',cardData.overall,cardData.overall/20)])

},[])
    return (
        <div className="flex w-full">
            <div className= "w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
                
            </div>
            <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
                <div className="w-full sm:flex p-2 items-end">
                    <div className="sm:flex-grow flex justify-between">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-white">Hello Ma'am</div>
                        </div>

                    </div>
                    <div>{`${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`}</div>

                </div>
                {classData?classData.map(
                    ({
                        id,
                        name,
                        result,
                        progress,
                    }) => (
                        <TeacherNameCard
                            key={id}
                            id={id}
                            name={name}
                            resultAmount={result}
                            progress={progress}
                        />
                    ),
                ):null}

                <div className="w-full p-2 lg:w-2/3">
                    <div className="rounded-lg bg-card sm:h-96 h-96">
                        {classData?<TeacherGraph data={cardData.ascendStudent} />:null}
                    </div>
                </div>
                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card h-96">
                        {classData?<TeacherAttentionNeeded data={cardData.ascendStudent} />:null}
                    </div>
                </div>

            </div>
        </div>
    );
}

function TeacherNameCard({
    name,
    resultAmount,
    progress,
    }) {
    const { result, barPlayhead } = useSpring({
        result: resultAmount,
        barPlayhead: 1,
        from: { result: 0, barPlayhead: 0 },
    });
    return (
        <div className="w-full p-2 lg:w-1/5">
            <div className="rounded-lg bg-card flex flex-col justify-start p-3 px-5 h-28">
                <div className="flex mb-5">
                    <div className="flex items-center w-[60%]">
                        <div className=" font-bold text-white">{name}</div>
                    </div>
                    <div className="flex flex-col items-center w-[40%]">
                        
                    <animated.div className={clsx( 'font-bold', 'text-xl', 'text-[#7900FF]')}>
                            {result.interpolate((i) => `${typeof i===Number?Math.Round(i):i}`)}
                    </animated.div>

                    </div>
                </div>
                <svg
                    className="w-full mt-3"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="200" height="6" rx="3" fill="#2D2D2D" />
                    <animated.rect
                        width={barPlayhead.interpolate(
                            (i) => i * (progress / 5) * 200,
                        )}
                        height="6"
                        rx="3"
                        fill="url(#paint0_linear)"
                    />
                    <rect x="38" width="2" height="6" fill="#171717" />
                    <rect x="78" width="2" height="6" fill="#171717" />
                    <rect x="118" width="2" height="6" fill="#171717" />
                    <rect x="158" width="2" height="6" fill="#171717" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                            <stop stopColor="#8E76EF" />
                            <stop offset="1" stopColor="#3912D2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

        </div>
    );
}

function TeacherGraph({data}) {
    const [graphData,setGraphData]=useState();

    useEffect(()=>{
    let finaldata={"science":{},"english":{},"math":{},"sst":{},"hindi":{},"overall":{}};
    function subG1G2Pred(prev,pred){
        let outerobj={}
        let sum1=0;
        let sum2=0;
        for(let key in prev){   
            let obj={}
            obj.G1=prev[key][0]
            sum1=prev[key][0]
            obj.G2=prev[key][1]
            sum2=prev[key][1]
            obj.Pred=JSON.parse(pred[key])['Predicted Score']
            outerobj[key]=obj;
        }
        let predicted=JSON.parse(pred.overall)["Predicted Score"];
        outerobj["overall"]={G1:sum1,G2:sum2,Pred:predicted}
        return outerobj;
}
        data.forEach((ele)=>{
        let data=subG1G2Pred(ele.studentDetails.studentMarks,ele.studentDetails.predictedResult)
        for(let key in data){
                finaldata[key].G1=(finaldata[key]?.G1===undefined?0:finaldata[key].G1)+data[key].G1;
                finaldata[key].G2=(finaldata[key]?.G2===undefined?0:finaldata[key].G2)+data[key].G2;
                finaldata[key].predicted=(finaldata[key]?.predicted===undefined?0:finaldata[key].predicted)+data[key].Pred;
            }
       
})          
console.log(finaldata)
        let data4set=[]
            for(let sub in finaldata){
                let retobject={};
            if(sub=='sst'){
                retobject.name="Social Science";
                retobject.Term1=finaldata[sub].G1/data.length*5;
                retobject.Term2=finaldata[sub].G2/data.length*5;
                retobject.Predicted=finaldata[sub].predicted/data.length;
                retobject.Avg=(retobject.Term1+retobject.Term2+retobject.Predicted)/3
            }
            else{
                retobject.name=sub[0].toUpperCase()+sub.slice(1);
                retobject.Term1=finaldata[sub].G1/data.length*5;
                retobject.Term2=finaldata[sub].G2/data.length*5;
                retobject.Predicted=finaldata[sub].predicted/data.length;
                retobject.Avg=(retobject.Term1+retobject.Term2+retobject.Predicted)/3
                console.log(retobject)
            }
            data4set.push(retobject)
}
        console.log(data4set)
        setGraphData(data4set)

        
        


},[])
const CustomTooltip = ({ active, payload, label }) => {
     if(active && payload && payload.length) {
        console.log(payload)
        return(
        <div className="rounded-xl overflow-hidden tooltip-head">
            <div className="flex items-center justify-between p-2">
                <div className="text-white">{label}</div> 
            </div>
            <div className="tooltip-body text-center p-3 flex flex-col items-stretch" >
                <div className="font-bold text-[#00D7FF]">{`Term1 Score: ${payload[0].payload.Term1}`}</div>
                <div className="font-bold text-[#00FFAB]">{`Term2 Score: ${payload[0].payload.Term2}`}</div>
                <div className="font-bold text-[#7C83FD]">{`Predicted Score: ${payload[0].payload.Predicted}`}</div>
                <div className="font-bold text-[#FFF]">{`Average Score: ${payload[0].payload.Avg.toFixed(2)}`}</div>
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

                  {graphData?<ResponsiveContainer width="100%" height="100%">
                    <ComposedChart width={500} height={300} data={graphData} margin={{ top:-20, bottom:5}}>
                        <CartesianGrid
                            strokeDasharray="5 5"
                            stroke="#252525"
                        />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} padding={{ left: 50, right: 50 }}/>
                        <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                        <Bar dataKey="Term1" fill="#00D7FF" />
                        <Bar dataKey="Term2" fill="#00FFAB" />
                        <Bar dataKey="Predicted" fill="#7C83FD" />
                        <Line dataKey="Avg" stroke="#FFFFFF" strokeWidth="2"/>
                        <Tooltip cursor={false} content={CustomTooltip}/>
                        <Legend align='right' verticalAlign="top" height={30} />
                    </ComposedChart>
                </ResponsiveContainer>:null}
            </div>
        </div>
    );
}

function TeacherAttentionNeeded({data}) {
    const [studentData,setStudentData]=useState();
    useEffect(()=>{
      function overallMarks(data){
       let marksarr=data.studentDetails.studentMarks
       let sum=0;
       for (const key in marksarr){
            sum=sum+marksarr[key][0] 
            sum=sum+marksarr[key][1]
        } 
        return sum;
    }
    function isRise(stud){
    let sum=overallMarks(stud)/10;
    let pred=JSON.parse(stud.studentDetails.predictedResult.overall)["Predicted Score"]
    return [pred>(sum*5),(Math.abs(pred-(sum*5))/(sum*5))*100];
    }   
    let newdata=data.filter((ele,index)=>index<7);
    let datatoset= newdata.map((ele,index)=>{
        let [rise,value]=isRise(ele)
        return{id:index+1,name:ele.studentName,value:Math.floor(value),rise}
        })
        setStudentData([...datatoset])

    },[])
    return (
        <div className="flex p-4 flex-col h-full">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold">Attention Needed</div>
            </div>
           
            {studentData?studentData.map(({ name, rise, value, id }) => (
                <div className="flex items-center mt-3" key={id}>
                    <div className="">{id}</div>

                   
                    <div className="ml-2">{name}</div>
                    <div className="flex-grow" />
                    <div className="">{`${value.toLocaleString()}%`}</div>
                    <Icon
                        path={
                            rise ? 'res-react-dash-country-up' : 'res-react-dash-country-down'
                        }
                        className="w-4 h-4 mx-3"
                    />
                </div>
            )):null}
            <div className="flex-grow" />
            <div className="flex justify-center">
                <div className="">Check All</div>
            </div>
        </div>
    );
}


function Icon({ path = 'options', className = 'w-4 h-4' }) {
    return (
        <img
            src={`https://assets.codepen.io/3685267/${path}.svg`}
            alt=""
            className={clsx(className)}
        />
    );
}

