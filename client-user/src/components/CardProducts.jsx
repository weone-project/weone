import {RiMapPin2Line } from "react-icons/ri";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const CardProducts = ({ product }) => {
    const navigate = useNavigate()
    const clickProduct = (id) => {
        navigate(`/products/${id}`)
    }
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
     }
     console.log(product.rating);
    return (
    <div onClick={() => {
        clickProduct(product?.id)
    }} className='max-w-[250px] min-w-[250px] rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
        <div className="w-full relative max-h-[180px] min-h-[180px]">
            <img src={product?.imgUrl[0]} alt="" className="max-w-[250px] min-w-[250px] min-h-[180px] max-h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
            <p className="absolute px-2 rounded-xl bottom-2 left-2 bg-gray-50 text-[11px] font-[400]">{product?.Category?.name}</p>
        </div>
        <p className="card_p mx-2 font-[600] w-[90%]">{product?.name}</p>
        <p className="text-sm mt-[5px] mx-2">{formatRupiah(product?.price)}</p>
        <div className="flex justify-between mx-2">
            <div className='flex items-center'>
            {(!product?.rating) ? " " : <Rating name="read-only size-small" size="small" value={product?.rating} precision={0.5} readOnly />}
                
            </div>
            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>{product?.Vendor?.city} </p>
        </div>
    </div>
    )
}

export default CardProducts