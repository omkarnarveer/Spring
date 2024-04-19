import React,{useContext} from 'react';
import TeacherContext from '../home/TeacherContext';

function Detail(){
    const {predStudent}=useContext(TeacherContext)
    console.log(predStudent)

  return (
       <div className="flex p-4 flex-col h-full">
           <div className="flex justify-between items-center">
               <div className="text-white font-bold">Student Details</div>
           </div>
               <div className="mt-3">
                   <div className="ml-3 flex justify-between"><span>Standard:</span> <span className="text-white mr-3">{predStudent.studentDetails.standard}</span> </div>
                   <div className="ml-3 flex justify-between"><span>Student ID:</span> <span className="text-white mr-3">{predStudent.studentId} </span></div>
                   <div className="ml-3 flex justify-between"><span>Batch:</span> <span className="text-white mr-3">{predStudent.studentDetails.batch}</span> </div>
                   <div className="ml-3 flex justify-between"><span>Student Name:</span> <span className="text-white mr-3">{predStudent.studentName} </span></div>
                   <div className="ml-3 flex justify-between"><span>Date of Birth:</span>  <span className="text-white mr-3">{predStudent.studentDetails.dob}</span>  </div> 
                   <div className="ml-3 flex justify-between"><span>Email:</span> <span className="text-white mr-3">{predStudent.email}</span></div>
                   <div className="ml-3 flex justify-between"><span>Phone:</span> <span className="text-white mr-3 ">{predStudent.studentDetails.phone}</span> </div>
                   <div className="ml-3 flex justify-between"><span>Address:</span> <span className="text-white mr-3">{predStudent.studentDetails.fullAddress}</span></div>
                   <div className="ml-3 flex justify-between"><span>Mother Name:</span><span className="text-white mr-3">{predStudent.studentDetails.motherName}</span> </div>     
                   <div className="ml-3 flex justify-between"><span>Father Name:</span><span className="text-white mr-3">{predStudent.studentDetails.fatherName}</span> </div>                 
                   <div className="ml-3 flex justify-between"></div>
                   <div className="flex-grow" />
               </div>
               <div className="flex justify-center mt-3">
                <div className="">Check All</div>
            </div>
       </div>
   );
}

export default Detail