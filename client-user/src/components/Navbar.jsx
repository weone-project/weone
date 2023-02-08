import { Link, useNavigate } from "react-router-dom"
import { HiChatBubbleLeftEllipsis } from "react-icons/hi2"
import bride from '../bride.png'
import logo from '../assets/logo/Logo-l.png'
import './Navbar.css'
import { HiOutlineUser, HiShoppingCart, HiSwatch, HiCog6Tooth } from "react-icons/hi2"
import { HiLogout } from "react-icons/hi"
import { BiLogOutCircle } from "react-icons/bi"
import { useQuery } from "@apollo/client"
import { GET_USER_BY_ID } from "../queries/user"
import { accessToken } from "mapbox-gl"

const Navbar = () => {
    const {data : dataUser, loading, error} = useQuery(GET_USER_BY_ID, {
        variables: {
            getUserByIdId: localStorage.getItem('id'),
            accessToken: localStorage.getItem('token')
        }
    })
    const navigate = useNavigate()
    const buttonLogOut = () => {
        localStorage.clear()
        navigate('/login')
    }   
    return (
        <section className="fixed flex w-full border-b-[1px] bg-white shadow-md z-20">
            <div className="flex w-full mx-[70px] justify-between items-center h-14">
                <div className="h-full flex items-center"><Link to={'/'} className="judul"><img src={logo} alt="" width={100} /></Link></div>
                <div className="h-10 flex h-full">
                <div className="flex mx-8 font-light h-full ">
                    <Link to={'/products'}>
                    <button className="mx-4 hover:border-b-2 hover:border-[#645CBB] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#645CBB] h-full duration-300">Products</button>
                    </Link>
                    <Link to={'/theme'}>
                    <button className="mx-4 hover:border-b-2 hover:border-[#645CBB] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#645CBB] h-full duration-300">Invitations</button>
                    </Link>
                    <button className="mx-4 hover:border-b-2 hover:border-[#645CBB] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#645CBB] h-full duration-300">Favorite</button>
                </div>
                </div>
                <div className="flex ml-8 duration-200">
                    {localStorage.getItem('token') ? 
                    <>
                    <button className="mx-2 text-2xl w-10 h-10 duration-300 hover:bg-gray-200 bg flex items-center justify-center rounded-full"><Link to={'/message'}> <HiChatBubbleLeftEllipsis/></Link></button>
                    <button className="mx-2 w-10 h-10 dropdown duration-200 flex items-center justify-center">
                    {dataUser?.getUserById?.userImgUrl ? <img src={dataUser?.getUserById?.userImgUrl} alt="" className="w-8 h-8 rounded-full"/> : <img src={bride} alt="" />}
                        <div className="dropdown-content top-[30px] right-[-10px] rounded-lg text-sm pb-2">
                            <div className="pl-4 pr-6 pt-6 pb-4 flex items-center border-b-2">
                                <div className=" bg-gray-200 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                                    {dataUser?.getUserById?.userImgUrl ? <img src={dataUser?.getUserById?.userImgUrl} alt="" className="w-full h-full rounded-full"/> : <HiOutlineUser className=""/>}
                                    {/* <HiOutlineUser className=""/> */}
                                </div>
                                <p className="ml-2 font-semibold">Hai, {localStorage.getItem('name') ? localStorage.getItem('name') : 'Hai'}</p>
                            </div>
                            <Link to={'/histories'} className=" hover:bg-gray-200 items-center flex">
                                <div className=" flex items-center mt-2 duration-200">
                                    <HiShoppingCart className="text-[18px] font-bold ml-2"/>
                                    <p className="ml-4 font-[400]">Order</p>
                                </div>
                            </Link>
                            <Link to={'/dash'} className=" hover:bg-gray-200 items-center flex">
                                <div className=" flex items-center mt-2 duration-200">
                                    <HiSwatch className="text-[18px] font-bold ml-2"/>
                                    <p className="ml-4 font-[400]">Invitation</p>
                                </div>
                            </Link>
                            <Link to={'/histories'} className=" hover:bg-gray-200 items-center flex">
                                <div className=" flex items-center mt-2 duration-200">
                                    <HiCog6Tooth className="text-[18px] font-light ml-2"/>
                                    <p className="ml-4 font-[400]">Setting</p>
                                </div>
                            </Link>
                            <div onClick={buttonLogOut} className=" hover:bg-gray-200 items-center flex py-2 pl-2">
                                <div className=" flex items-center mt-2 duration-200">
                                    <BiLogOutCircle className="text-[20px] font-light ml-2"/>
                                    <p className="ml-4 font-[400]">Log Out</p>
                                </div>
                            </div>
                            {/* <div className="px-4 py-2 flex items-center mt-2 hover:bg-gray-200 duration-200">
                                <HiSwatch className="text-[18px] font-bold ml-2"/>
                                <p className="ml-4">Invitation</p>
                            </div>
                            <div className="px-4 py-2 flex items-center mt-2 hover:bg-gray-200 duration-200">
                                <HiCog6Tooth className="text-[18px] font-bold ml-2"/>
                                <p className="ml-4">Setting</p>
                            </div> */}
                            {/* <Link to={'/histories'} className="rounded-lg flex justify-left w-full" href="#">Order</Link>
                            <a href="#" className="rounded-lg">Invitation</a> */}
                        </div>
                    </button>
                    </>
                    :
                    <>
                    <button className="px-4 py-[3px] rounded-xl border-2 hover:bg-gray-100 duration-200">Register</button>
                    <Link to={'/login'} className="px-4 py-[3px] rounded-xl ml-2 duration-200 bg-[#645CBB] text-white hover:bg-[#674188]">Login</Link>
                    </>                     
                    }


                </div>
            </div>
        </section>
    )
}
export default Navbar