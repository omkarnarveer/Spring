import React, { useContext } from 'react';
import StudentCredContext from '../../contextStore/StudentCredentials'
import { useParams } from 'react-router-dom';

function StudentDetail() {
    const { userData, token } = useContext(StudentCredContext);
    console.log(userData)
    const { id } = useParams()
    console.log(id)

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-white font-bold">Student Details</div>
            </div>
            <div className="mt-3">
                <div className='flex flex-col lg:flex-row w-full'>
                    <div className='w-[100%] lg:w-1/3'>
                        <div className="ml-3 flex flex-row justify-between"><span>Student ID:</span><span className="text-white mr-3">{id}</span></div>
                        <div className="ml-3 flex flex-row justify-between "><span>Student Name:</span><span className="text-white mr-3">{userData.studentName} </span></div>
                        <div className="ml-3 flex flex-row justify-between"><span>Mother Name:</span><span className="text-white mr-3">{userData.studentDetails.motherName}</span></div>
                        <div className="ml-3 flex flex-row justify-between"><span>Address:</span><span className="text-white mr-3">{userData.studentDetails.fullAddress}</span></div>
                    </div>

                    <div className='w-[100%] lg:w-1/3'>
                        <div className="ml-3 flex flex-row justify-between"><span>Batch:</span><span className="text-white mr-3">{userData.studentDetails.batch}</span></div>
                        <div className="ml-3 flex flex-row justify-between "><span>Date of Birth:</span><span className="text-white mr-3">{userData.studentDetails.dob} </span></div>
                        <div className="ml-3 flex flex-row justify-between"><span>Father Name:</span><span className="text-white mr-3">{userData.studentDetails.fatherName}</span></div>
                    </div>

                    <div className='w-[100%] lg:w-1/3'>
                        <div className="ml-3 flex flex-row justify-between"><span>Standard:</span><span className="text-white mr-3">{userData.studentDetails.standard}</span></div>
                        <div className="ml-3 flex flex-row justify-between "><span>Email:</span><span className="text-white mr-3">{userData.email}</span></div>
                        <div className="ml-3 flex flex-row justify-between"><span>Phone:</span><span className="text-white mr-3">{userData.studentDetails.phone}</span></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentDetail