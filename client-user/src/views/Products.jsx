import { HiSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { RiRestaurantLine, RiBuildingLine, RiUserHeartLine, RiCamera3Line, RiTeamLine, RiVidiconLine, RiMapPin2Line } from "react-icons/ri";
import Rating from '@mui/material/Rating';
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/product";
import CardProducts from "../components/CardProducts";

const Products = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS, {
        variables: {
            accessToken: localStorage.getItem('token')
        }
    });
    const [show, setShow] = useState(false);
    const openCategory = () => {
        setShow(true);
    }
    const closeCategory = () => {
        setShow(false);
    }
    console.log(data, loading, error);
    return (
        <section className="min-h-[100vh] bg-gray-50 flex flex-col items-center">
            <div className="flex h-full flex-col items-center mt-10">
                <div className="flex">
                    <button onClick={openCategory} className=" relative mx-4 bg-white w-[130px] h-[48px] rounded-xl flex items-center justify-center pr-2 shadow-md hover:bg-[#00425A] focus:bg-[#00425A] group duration-300 text-[#00425A]"> <HiSquares2X2 className="group-hover:text-white group-focus:text-white"/> <p className="ml-2 group-hover:text-white group-focus:text-white"> Category</p>
                    </button>
                    { show ? 
                    <div className="fixed flex flex-col bg-white absolute top-[170px] w-[550px] items-center rounded-lg px-6 py-2">
                        <div className="w-full flex justify-end text-red-700 mb-2"><button onClick={closeCategory}>close</button> </div>
                        <div className="w-full grid grid-cols-2 gap-x-6 gap-y-4">
                            <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiRestaurantLine className="text-xl"/> <p className="ml-2 text-md">Cathering and Cake</p></div>
                            <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiBuildingLine className="text-xl"/> <p className="ml-2 text-md">Reception Venue</p></div>
                            <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiUserHeartLine className="text-xl"/> <p className="ml-2 text-md">Makeup Artist</p></div>
                            <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiCamera3Line className="text-xl"/> <p className="ml-2 text-md">Wedding Photographer</p></div>
                            <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiVidiconLine className="text-xl"/> <p className="ml-2 text-md">Entertaiment</p></div>
                            <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiTeamLine className="text-xl"/> <p className="ml-2 text-md">Wedding Organizer</p></div>
                        </div>
                    </div>
                    : ''}
                    
                    <div className='bg-white w-[500px] h-[48px] rounded-xl flex items-center pl-6 pr-2 shadow-md'>
                    <input type="text" name="" id="" placeholder='Find Photographer, Cathering, etc' className='px-2 w-[92%] h-full focus:outline-none' />
                    <div className='bg-[#645CBB] hover:bg-[#BFACE2] cursor-pointer h-[80%] w-[8%] rounded-xl flex items-center justify-center'><i className="text-white fa-solid fa-magnifying-glass"></i></div>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-center w-full">
                <div className=" w-[75%] grid grid-cols-4 gap-x-8 gap-y-6">
                    {data?.getProducts?.map((product) => {
                        return (
                            <CardProducts key={product.id} product={product} />
                        )
                    })}
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">The Studio</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>

                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/img_2894-HkMvC23nr.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">Gold Wedding Package</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/wedding-r1urEU4Aw.png" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">Gabriela Giov - Paket Makeup Pernikahan</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-1P_5b9ygx.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">COMPLETE PACKAGEasdsasadsdsadasdas sadssadsadsadadas</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-HcMZHb45v.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">Kudus Hall Package</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 20.000.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                            <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
                        </div>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <div className='flex items-center'>
                        <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                        
                        </div>
                        <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/> Jakarta Timur, DKI Jakarta </p>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <div className='flex items-center'>
                        <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                        
                        </div>
                        <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/> Jakarta Timur, DKI Jakarta </p>
                    </div>
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_auto,fl_progressive,q_80,h_0,w_700,c_fill,g_faces/v1/assets/upload-I7DqjpDJE.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">DINNER RECEPTION</p>
                        <div className='flex items-center'>
                        <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                        
                        </div>
                        <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/> Jakarta Timur, DKI Jakarta </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products