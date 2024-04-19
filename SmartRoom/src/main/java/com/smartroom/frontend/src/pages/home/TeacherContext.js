import { createContext, useState } from "react";

const TeacherContext = createContext(null);

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [updateStudent, setUpdateStudent] = useState({});
    const [predStudent, setPredStudent] = useState({});
    const [predEnglish,setPredEnglish]=useState(null);
    const [predMath,setPredMath]=useState(null);
    const [predHindi,setPredHindi]=useState(null);
    const [predScience,setPredScience]=useState(null);
    const [predSst,setPredSst]=useState(null);
    const [predOverall,setPredOverall]=useState(null);
    const [studentSubjectData,setStudentSubjectData]=useState([]);
    const [sendMail,setSendMail]=useState(false);
    const [subtoSend,setSubtoSend]=useState([]);
    const value = {subtoSend,setSubtoSend,sendMail,setSendMail, students,predOverall,setPredOverall, setStudents, updateStudent, setUpdateStudent, predStudent, setPredStudent,predEnglish, setPredEnglish, predMath,setPredMath,predHindi,setPredHindi,predScience,setPredScience,predSst,setPredSst,studentSubjectData,setStudentSubjectData };
    return (
        <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
    )

}
export default TeacherContext;