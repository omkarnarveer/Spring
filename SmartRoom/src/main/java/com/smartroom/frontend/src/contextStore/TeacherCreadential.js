import { createContext, useState } from 'react';

const TeacherCredContext = createContext(null);

export const TeacherCredProvider = (({ children }) => {
    const [userId, setUserId] = useState('Himanshu');
    const [token, setToken] = useState('');
    const [isValid, setIsValid] = useState(false);
    const value = { userId, setUserId, token, setToken, isValid, setIsValid };
    return (<TeacherCredContext.Provider value={value}>{children}</TeacherCredContext.Provider>)
})

export default TeacherCredContext