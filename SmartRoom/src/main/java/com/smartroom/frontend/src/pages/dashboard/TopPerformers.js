import react,{useEffect,useState} from 'react';
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import axios from 'axios';

function StudentIcon({ path = 'options', className = 'w-4 h-4' }) {
    return (
           <img
               src={`https://assets.codepen.io/3685267/${path}.svg`}
               alt=""
               className={clsx(className)}
           />
       );
   }

function StudentTopPerformers() {
    // const [g1g2overall,setG1G2Overall]=useState();
    const [studentData,setStudentData]=useState([]);
    useEffect(()=>{
   
    const fetchData=async()=>{
         function overallMarks(data){
        console.log(data.studentDetails.studentMarks)
       let marksarr=data.studentDetails.studentMarks
       let sum=0;
       for (const key in marksarr){
            sum=sum+marksarr[key][0] 
            sum=sum+marksarr[key][1]
        } 
        return sum;
    }
    function isRise(stud){
        console.log(stud)
    let sum=overallMarks(stud)/10;
        console.log(stud)
    let pred=JSON.parse(stud.studentDetails.predictedResult.overall)["Predicted Score"]
    return [pred>(sum*5),(Math.abs(pred-(sum*5))/(sum*5))*100];
    }
    function compareFunction(a,b){
        let suma=overallMarks(a)
        let sumb=overallMarks(b);
        return sumb-suma;
    }
        const response =await axios.get('http://localhost:8080/auth/student/fetch/all')
        const studData=await response.data.sort(compareFunction)
        const dataToSend=[]
        console.log(studData);
        let newdata=studData.filter((ele,index)=>index<7);
        newdata.forEach((ele)=>{
        let [temprise,d]=isRise(ele);
        dataToSend.push({name:ele.studentName,rise:temprise,value:Math.floor(d),id:ele.studentId})
        })
        setStudentData([...dataToSend])

    }
fetchData()
},[])
    return (
        <div className="flex p-4 flex-col h-full">
            <div className="flex justify-between items-center">
                <div className="text-white font-bold">Top Performers</div>
            </div>
           
            {studentData?studentData.map(({ name, rise, value, id },index) => (
                <div className="flex items-center mt-3" key={index+1}>
                    <div className="">{index+1}</div>

                   
                    <div className="ml-2">{name}</div>
                    <div className="flex-grow" />
                    <div className="">{`${value.toLocaleString()}%`}</div>
                    <StudentIcon
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

export default StudentTopPerformers