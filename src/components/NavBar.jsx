import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Menu, Close } from '@mui/icons-material';


export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;

    return (
        <nav className="bg-blue-400 md:ml-64 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden ">
                    <IconButton
					onClick={() => setShowSidebar('left-0')}
                    >
					<Menu  className='text-white'/>
					</IconButton>

                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                    <IconButton
                   
					onClick={() => setShowSidebar('-left-64')}
        
					>
					<Close className='text-white'/>
					</IconButton>                        
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-white text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : (location.includes('business'))
                            ? 'EMPRESA'
                            : location.toUpperCase().replace('/', '')}
                    </h4>

                    <div className="flex">

                        <div className="-mr-4 ml-6">

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
