import "./StudentSideBar.scss";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import { useState,useContext } from 'react';
import StudentCredContext from '../../contextStore/StudentCredentials'
import { Link } from "react-router-dom";

function SidebarIcons({ id }) {
    const icons = {
        0: (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </>
        ),
        1: (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </>
        ),
        2: (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
            </>
        ),
        3: (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
            </>
        ),
        4: (
            <>
            <path d="M2 4V18L6.8 14.4C7.14582 14.1396 7.56713 13.9992 8 14H16C17.1046 14 18 13.1046 18 12V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4ZM4 14V4H16V12H7.334C6.90107 11.9988 6.47964 12.1393 6.134 12.4L4 14Z" />
            <path d="M22 22V9C22 7.89543 21.1046 7 20 7V18L17.866 16.4C17.5204 16.1393 17.0989 15.9988 16.666 16H7C7 17.1046 7.89543 18 9 18H16C16.4329 17.9992 16.8542 18.1396 17.2 18.4L22 22Z" />
        </>
        ),
        5: (
            <>
            <path d="M19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4H7V2H9V4H15V2H17V4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22ZM5 10V20H19V10H5ZM5 6V8H19V6H5ZM17 14H7V12H17V14Z" />
            </>
            ),

        6: (
            <>
                <path d="M21.266 20.998H2.73301C2.37575 20.998 2.04563 20.8074 1.867 20.498C1.68837 20.1886 1.68838 19.8074 1.86701 19.498L11.133 3.49799C11.3118 3.1891 11.6416 2.9989 11.9985 2.9989C12.3554 2.9989 12.6852 3.1891 12.864 3.49799L22.13 19.498C22.3085 19.8072 22.3086 20.1882 22.1303 20.4975C21.9519 20.8069 21.6221 20.9976 21.265 20.998H21.266ZM12 5.99799L4.46901 18.998H19.533L12 5.99799ZM12.995 14.999H10.995V9.99799H12.995V14.999Z" />
                <path d="M11 16H13V18H11V16Z" />
            </>
            
        ),
        7: (
            <>
                <path d="M13.82 22H10.18C9.71016 22 9.3036 21.673 9.20304 21.214L8.79604 19.33C8.25309 19.0921 7.73827 18.7946 7.26104 18.443L5.42404 19.028C4.97604 19.1709 4.48903 18.9823 4.25404 18.575L2.43004 15.424C2.19763 15.0165 2.2777 14.5025 2.62304 14.185L4.04804 12.885C3.98324 12.2961 3.98324 11.7019 4.04804 11.113L2.62304 9.816C2.27719 9.49837 2.19709 8.98372 2.43004 8.576L4.25004 5.423C4.48503 5.0157 4.97204 4.82714 5.42004 4.97L7.25704 5.555C7.5011 5.37416 7.75517 5.20722 8.01804 5.055C8.27038 4.91269 8.53008 4.78385 8.79604 4.669L9.20404 2.787C9.30411 2.32797 9.71023 2.00049 10.18 2H13.82C14.2899 2.00049 14.696 2.32797 14.796 2.787L15.208 4.67C15.4888 4.79352 15.7623 4.93308 16.027 5.088C16.274 5.23081 16.5127 5.38739 16.742 5.557L18.58 4.972C19.0277 4.82967 19.5142 5.01816 19.749 5.425L21.569 8.578C21.8015 8.98548 21.7214 9.49951 21.376 9.817L19.951 11.117C20.0158 11.7059 20.0158 12.3001 19.951 12.889L21.376 14.189C21.7214 14.5065 21.8015 15.0205 21.569 15.428L19.749 18.581C19.5142 18.9878 19.0277 19.1763 18.58 19.034L16.742 18.449C16.5095 18.6203 16.2678 18.7789 16.018 18.924C15.7559 19.0759 15.4854 19.2131 15.208 19.335L14.796 21.214C14.6956 21.6726 14.2895 21.9996 13.82 22ZM7.62004 16.229L8.44004 16.829C8.62489 16.9652 8.81755 17.0904 9.01704 17.204C9.20474 17.3127 9.39801 17.4115 9.59604 17.5L10.529 17.909L10.986 20H13.016L13.473 17.908L14.406 17.499C14.8133 17.3194 15.1999 17.0961 15.559 16.833L16.38 16.233L18.421 16.883L19.436 15.125L17.853 13.682L17.965 12.67C18.0142 12.2274 18.0142 11.7806 17.965 11.338L17.853 10.326L19.437 8.88L18.421 7.121L16.38 7.771L15.559 7.171C15.1998 6.90671 14.8133 6.68175 14.406 6.5L13.473 6.091L13.016 4H10.986L10.527 6.092L9.59604 6.5C9.39785 6.58704 9.20456 6.68486 9.01704 6.793C8.81878 6.90633 8.62713 7.03086 8.44304 7.166L7.62204 7.766L5.58204 7.116L4.56504 8.88L6.14804 10.321L6.03604 11.334C5.98684 11.7766 5.98684 12.2234 6.03604 12.666L6.14804 13.678L4.56504 15.121L5.58004 16.879L7.62004 16.229ZM11.996 16C9.7869 16 7.99604 14.2091 7.99604 12C7.99604 9.79086 9.7869 8 11.996 8C14.2052 8 15.996 9.79086 15.996 12C15.9933 14.208 14.204 15.9972 11.996 16ZM11.996 10C10.9034 10.0011 10.0139 10.8788 9.99827 11.9713C9.98262 13.0638 10.8466 13.9667 11.9387 13.9991C13.0309 14.0315 13.9469 13.1815 13.996 12.09V12.49V12C13.996 10.8954 13.1006 10 11.996 10Z" />
            </>
        ),
    };
return (
        <svg
            className="w-8 h-8 xl:w-5 xl:h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            {icons[id]}
        </svg>
    );
}

function MenuItem({ item: { id, title }, onClick, selected }) {
    return (
        <div
            className={clsx(
                'w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer',
                selected === id ? 'sidebar-item-selected' : 'sidebar-item',
            )}
            onClick={() => onClick(id)}
        >
            <SidebarIcons id={id} />
            <div className="block sm:hidden xl:block ml-2">{title}</div>
            <div className="block sm:hidden xl:block flex-grow" />
            
        </div>
    );
}

function IconButton({
    onClick = () => {},
    icon = 'options',
    className = 'w-4 h-4',
}) {
    return (
        <button onClick={onClick} type="button" className={className}>
            <img
                src={`https://assets.codepen.io/3685267/${icon}.svg`}
                alt=""
                className="w-full h-full"
            />
        </button>
    );
}


export default function StudentSideBar({ onSidebarHide, showSidebar }) {
    const {userData}=useContext(StudentCredContext);
    const sidebarItems = [
        [
            { id: '0', title: 'Dashboard', link: '' },
            { id: '3', title: 'Leaderboard', link: '' },
            { id: '1', title: 'Details', link: '' },
            
        ],
        [
            { id: '4', title: 'Message', link: '' },
            { id: '5', title: 'Schedule', link: '' },
            { id: '7', title: 'Settings', link: ''  },
            
        ],
    ];
    
    const [selected, setSelected] = useState('0');
    return (
        <div
            className={clsx(
                'fixed inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10',
                showSidebar ? 'flex' : 'hidden',
            )}
        >
            <div className="flex-shrink-0 overflow-hidden p-2">
                <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
                    <IconButton icon="res-react-dash-logo" className="w-10 h-10" />
                    <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">
                       SmartRoom
                    </div>
                    <div className="flex-grow sm:hidden xl:block" />
                    <IconButton
                        icon="res-react-dash-sidebar-close"
                        className="block sm:hidden"
                        onClick={onSidebarHide}
                    />
                </div>
            </div>
            <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
            <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
                    SERVICES
                </div>
                {sidebarItems[0].map((i) => (
                    <Link to={i.link}>
                        <MenuItem
                            key={i.id}
                            item={i}
                            onClick={setSelected}
                            selected={selected}
                        />
                    </Link>
                ))}
                <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
                    SHORTCUTS
                </div>
                {sidebarItems[1].map((i) => (
                    <Link to={i.link}>
                        <MenuItem
                            key={i.id}
                            item={i}
                            onClick={setSelected}
                            selected={selected}
                        />
                    </Link>
                ))}
                <div className="flex-grow" />

            </div>

            <div className="flex-shrink-0 overflow-hidden p-2 ">
                <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 teachername sidebar-separator-bottom cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 xl:w-5 xl:h-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>
                    <div className="block sm:hidden xl:block ml-2 font-bold">
                        {userData.studentName}
                    </div>
                </div>
            </div>
        </div>
    );
}
