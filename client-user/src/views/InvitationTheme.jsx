import { HiSquares2X2 } from "react-icons/hi2";
import { useState } from "react";
import { AiOutlineHeart } from 'react-icons/ai'
import Rating from '@mui/material/Rating';
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_ACTIVE } from "../queries/product";
import { Link } from "react-router-dom"
import loadingin from "../assets/53735-cart-icon-loader.gif";


const IntitatioinTheme = () => {
    const { data, loading, error } = useQuery(GET_PRODUCT_ACTIVE, {
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

    
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
     }


     if (loading ) {
            
        return (
            <div className="min-h-[100vh] bg-white flex justify-center items-center pb-20">
                <img src={loadingin} className="w-[200px]" alt="" />
            </div>
            // <div>sdsad</div>
        )
    }


    return (
        <section className="min-h-[100vh] bg-gray-50 flex flex-col items-center">

            <div className="mt-10 flex justify-center w-full">
                <div className=" w-[75%] grid grid-cols-3 gap-x-6 gap-y-6">
                    {data?.getProductActive?.map((item) => {
                        if (item.Category?.name === "Invitation") {
                            return (
                                <Link to={`/theme/${item.id}`}>
                                    <div className='max-w-full bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
                                        <img src={item.imgUrl} alt="" className="w-full rounded-t-lg mb-2 group-hover:shadow-md object-cover" />
                                        <p className="card_p mx-2">{item?.name}</p>
                                        <p className="text-sm  mx-2 font-bold">{formatRupiah(item.price)}</p>
                                        <div className="flex justify-between mx-2">
                                            <div className='flex items-center'>
                                                <Rating name="read-only size-small" size="small" value={item.rating} precision={0.5} readOnly />
                                            </div>
                                            <p className="text-[10px] flex items-center font-light"> <AiOutlineHeart /> 100 </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })}


                </div>
            </div>
        </section>
    )
}

export default IntitatioinTheme