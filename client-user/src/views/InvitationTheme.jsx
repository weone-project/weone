import { HiSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai'
import Rating from '@mui/material/Rating';
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../queries/product";
import { Link } from "react-router-dom"

const IntitatioinTheme = () => {
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

            <div className="mt-10 flex justify-center w-full">
                <div className=" w-[75%] grid grid-cols-3 gap-x-8 gap-y-6">
                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://hariistimewa.com/_exclusive/themes/standar/thumbnail.jpg" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">Pink Blossom</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 150.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                                <Rating name="read-only size-small" size="small" value={3.5} precision={0.5} readOnly />
                            </div>
                            <p className="text-[10px] flex items-center font-light"> <AiOutlineHeart /> 100 </p>
                        </div>
                    </div>
                    <Link to={'/prev'}>

                        <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                            <img src="https://hariistimewa.com/tema/sc/download9.png" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                            <p className="card_p mx-2">Blue Sky</p>
                            <p className="text-sm mt-2 mx-2 font-bold">Rp. 150.000,00</p>
                            <div className="flex justify-between mx-2">
                                <div className='flex items-center'>
                                    <Rating name="read-only size-small" size="small" value={4.5} precision={0.5} readOnly />

                                </div>
                                <p className="text-[10px] flex items-center font-light"> <AiOutlineHeart /> 100 </p>
                            </div>
                        </div>
                    </Link>

                    <div className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                        <img src="https://hariistimewa.com/tema/sc/download3.png" alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
                        <p className="card_p mx-2">Green Floral</p>
                        <p className="text-sm mt-2 mx-2 font-bold">Rp. 150.000,00</p>
                        <div className="flex justify-between mx-2">
                            <div className='flex items-center'>
                                <Rating name="read-only size-small" size="small" value={5} precision={0.5} readOnly />

                            </div>
                            <p className="text-[10px] flex items-center font-light"> <AiOutlineHeart /> 100 </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntitatioinTheme