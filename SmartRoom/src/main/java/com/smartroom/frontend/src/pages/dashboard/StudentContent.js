import React,{useContext,useEffect,useState} from 'react';
import StudentNameCard from './StudentNameCard';
import StudentGraph from './StudentGraph';
import TopPerformers from './TopPerformers';
import StudentCredContext from '../../contextStore/StudentCredentials'
import { StudentCredProvider } from '../../contextStore/StudentCredentials';
import StudentDetail from './StudentDetail';
const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function StudentContent() {
    const {userData,token}=useContext(StudentCredContext);
    const [studentSubjectData,setStudentSubjectData]=useState([]);
    useEffect(()=>{
        console.log(userData)
        let data=userData.studentDetails;
        let englishMarks=JSON.parse(data.predictedResult.english)["Predicted Score"];
        let hindiMarks=JSON.parse(data.predictedResult.hindi)["Predicted Score"];
        let mathMarks=JSON.parse(data.predictedResult.math)["Predicted Score"];
        let scienceMarks=JSON.parse(data.predictedResult.science)["Predicted Score"];
        let sstMarks=JSON.parse(data.predictedResult.sst)["Predicted Score"];
        let overallMarks=JSON.parse(data.predictedResult.overall)["Predicted Score"]
        console.log(englishMarks,hindiMarks,mathMarks,scienceMarks,sstMarks,overallMarks)
        let engrise=englishMarks/5>data.studentMarks.english.reduce((acc,curr)=>acc+curr,0)/2
        let hinrise=hindiMarks/5>data.studentMarks.hindi.reduce((acc,curr)=>acc+curr,0)/2
        let scirise=scienceMarks/5>data.studentMarks.science.reduce((acc,curr)=>acc+curr,0)/2
        let matrise=mathMarks/5>data.studentMarks.math.reduce((acc,curr)=>acc+curr,0)/2
        let sstrise=sstMarks/5>data.studentMarks.sst.reduce((acc,curr)=>acc+curr,0)/2
        let obj=data.studentMarks
        let sum=0;
        for(let key in obj){
        sum=(obj[key][0]+obj[key][1])/2
        }
        let ovlrise=overallMarks/5>sum;
        function retobj(id,name,score,rise,progress){
        return{id,name,score,rise,progress}
        }
        console.log([retobj('eng','English',englishMarks,engrise,englishMarks/20),retobj('hin','Hindi',hindiMarks,hinrise,hindiMarks/20),retobj('mat','Math',mathMarks,matrise,mathMarks/20),retobj('sci','Science',scienceMarks,scirise,scienceMarks/20),retobj('sst','Social Science',sstMarks,sstrise,sstMarks),retobj('overall','Overall',overallMarks,ovlrise,overallMarks/20)])
        setStudentSubjectData([retobj('eng','English',englishMarks,engrise,englishMarks/20),retobj('hin','Hindi',hindiMarks,hinrise,hindiMarks/20),retobj('mat','Math',mathMarks,matrise,mathMarks/20),retobj('sci','Science',scienceMarks,scirise,scienceMarks/20),retobj('sst','Social Science',sstMarks,sstrise,sstMarks/20),retobj('overall','Overall',overallMarks,ovlrise,overallMarks/20)]);
        console.log(studentSubjectData)
},[])
        
    
    return (
        <div className="flex w-full">
            <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
                
            </div>
            <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
                 <div className="w-full sm:flex p-2 items-end">
                    <div className="sm:flex-grow flex justify-between">
                        <div className="flex items-center">
                            <div className="text-3xl font-bold text-white">Hello, {userData.studentName.split(" ")[0]}</div>
                        </div>

                    </div>
                    <div>{`${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`}</div>

                </div>
                {studentSubjectData?studentSubjectData.map(
                    ({
                        id,
                        name,
                        score,
                        rise,
                        progress,
                    }) => (
                    <StudentNameCard
                            key={id}
                            id={id}
                            name={name}
                            scored={score}
                            rise={rise}
                            progress={progress}
                        />
                    ),
                ):null}

                <div className="w-full p-2 lg:w-2/3">
                    <div className="rounded-lg bg-card sm:h-96 h-96">
                        {studentSubjectData?<StudentGraph />:null}
                    </div>
                </div>
 
                <div className="w-full p-2 lg:w-1/3">
                    <div className="rounded-lg bg-card h-96">
                    {studentSubjectData?<TopPerformers />:null}
                    </div>
                </div>
                <div className="w-full p-2">
                    <div className="rounded-lg bg-card h-auto p-4">
                    {studentSubjectData?<StudentDetail/>:null}
                    </div>
                </div>

            </div>
        </div>
        
    );
}
export default StudentContent