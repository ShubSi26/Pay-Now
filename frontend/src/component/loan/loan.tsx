import {Route,Routes,useNavigate} from 'react-router-dom'
import loan from '../../assets/loan.png'
import Applyloan from './applyloan'

export default function Loan(){
    return (
        <div className='flex justify-center items-center h-full sm:h-screen bg-sky-700'>
            <Routes>
                <Route path='/' element={<Loahhome/>} />
                <Route path='/apply' element={<Applyloan/>} />
            </Routes>
        </div>
    )
}

function Loahhome(){
    const navigate = useNavigate();
    return(
        <div className='flex flex-col sm:flex-row bg-white rounded-xl p-4 m-1'>
                <div className=' border-b-4 sm:border-r-4 border-sky-700 mr-2 pr-2 rounded'>
                    <div className='text-4xl font-bold text-sky-800'>
                        Apply For Loan
                    </div>
                    <div className='text-xl pt-4'>
                        A loan is not a burden<br/> it’s an opportunity to build a better future.
                    </div>
                    <div className='text-right text-xl pt-4'>
                        Invest in your dreams. <br />It’s never too late to start something big
                    </div>
                    <button onClick={()=> navigate("apply")} className="mt-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Apply Now
                        </span>
                    </button>

                </div>
                <div>
                    <img src={loan} alt="Loan AD" width={600} className='' />
                </div>
            </div>
    )

}