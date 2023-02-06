import {RiMapPin2Line } from "react-icons/ri";
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const CardProducts = ({ product }) => {
    const navigate = useNavigate()
    const clickProduct = (id) => {
        navigate(`/products/${id}`)
    }
    return (
    <button onClick={() => {
        clickProduct(product.id)
    }} className='max-w-[250px] bg-white rounded-lg text-[#00425A] cursor-pointer border-b-2 pb-2 group'>
        <img src={product.imgUrl} alt="" className="w-[250px] h-[180px] rounded-lg mb-2 group-hover:shadow-md object-cover" />
        <p className="card_p mx-2">{product.name}</p>
        <p className="text-sm mt-2 mx-2 font-bold">IDR. {product.price},00</p>
        <div className="flex justify-between mx-2">
            <div className='flex items-center'>
            <Rating name="read-only size-small" size="small" value={product.rating} precision={0.5} readOnly />
            </div>
            <p className="text-[10px] flex items-center font-light"> <RiMapPin2Line/>DKI Jakarta </p>
        </div>
    </button>
    )
}

export default CardProducts