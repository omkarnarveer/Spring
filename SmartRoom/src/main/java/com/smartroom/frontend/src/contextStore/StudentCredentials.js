import { createContext, useState } from 'react';

const StudentCredContext = createContext(null);

export const StudentCredProvider = (({ children }) => {
    const [userData, setUserData] = useState(null);
    const [nameCardData,setNameCardData]=useState([])
    const [token, setToken] = useState('asdfg');
    const [isValid, setIsValid] = useState(false);
    const value = { nameCardData,setNameCardData,userData, setUserData, token, setToken, isValid, setIsValid };
    return (<StudentCredContext.Provider value={value}>{children}</StudentCredContext.Provider>)
})


export default StudentCredContext;