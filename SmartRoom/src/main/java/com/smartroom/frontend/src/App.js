import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeacherSignIn from './pages/auth/TeacherSignIn';
import StudentSignIn from './pages/auth/StudentSignIn';
import { StudentCredProvider } from './contextStore/StudentCredentials';
import { TeacherCredProvider } from './contextStore/TeacherCreadential';
import StudentDashboard from './pages/dashboard/StudentDashboard';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'  >
                    <Route index element={<TeacherCredProvider><TeacherSignIn /></TeacherCredProvider>} />
                    <Route path='/teacher' element={<TeacherCredProvider><TeacherSignIn /></TeacherCredProvider>} />
                    <Route path='/student' element={<StudentCredProvider><StudentSignIn /></StudentCredProvider>} />
                </Route>
                {/* <Route path='/student/dashboard' element={<StudentCredProvider><Dashboard/></StudentCredProvider>}/> */}
                <Route path='/teacher/dashboard/*' element={<TeacherCredProvider><Home /></TeacherCredProvider>} />
                <Route path='/student/dashboard/:id/*' element={<StudentCredProvider><StudentDashboard/></StudentCredProvider>}/>
            </Routes>
        </BrowserRouter >
    );
}

export default App;
