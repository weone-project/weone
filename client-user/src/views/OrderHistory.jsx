import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {HiOutlineShoppingBag } from 'react-icons/hi'
import { GET_ORDERS } from '../queries/order';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useRef } from "react";
import Rating from '@mui/material/Rating';

import TextField from '@mui/material/TextField';

import "../style.css";
// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
//   } from "@material-tailwind/react";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const OrderHistory = () => {
    const [newData, setNewData] = useState([])
    const [filter, setFilter] = useState('All')
    const {data, loading, error} = useQuery(GET_ORDERS, {
        variables: {
            accessToken: localStorage.getItem('token')
        }
    })
    const [rating, setRating] = useState(0)
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=> {
        if (filter === 'DP') {
            const temp = data?.getOrdersUser?.filter(el => el.paymentStatus === "DP")
            setNewData(temp)
        } else if (filter === 'DONE') {
            const temp2 = data?.getOrdersUser?.filter(el => el.paymentStatus === "DONE")
            setNewData(temp2)
        } else if (filter === "All"){
            const data2 = data?.getOrdersUser
            setNewData(data2)
        }
    }, [filter, data])
    console.log(newData);

    // const formatDate = (date) => {
    //     var date = Date.parse(time);
    // return ((typeof time != "undefined") ? prefix + date.toLocaleDateString("en-US")  : "");
        // return date.toLocaleDateString("en-US")
    //}

    const setFilterOrder = (data)=> {
        setFilter(data)
    }

    return (
        <div className="min-h-[100vh] bg-gray-50 flex flex-col items-center p-6">

            <div className="w-[60%] bg-white rounded-lg mb-4 flex px-4 shadow">
                <button className="px-4 py-2 border-b-2 border-white focus:border-[#00425A] duration-200 mx-2" onClick={() => {
                    setFilterOrder('All')
                }}>All</button>
                <button className="px-4 py-2 border-b-2 border-white focus:border-[#00425A] duration-200 mx-2" onClick={() => {
                    setFilterOrder('DP')
                }}>Down Payment</button>
                <button className="px-4 py-2 border-b-2 border-white focus:border-[#00425A] duration-200 mx-2" onClick={() => {
                    setFilterOrder('DONE')
                }}>Success</button>
            </div>
            {newData?.map((item, index) => {
                return (
                    <>
                    <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className="border-b-2 bg-white rounded-xl h-[30em] w-[30em] ">
                            <div className="w-full flex flex-col items-center px-8 py-4">
                                <div className="w-full flex justify-center">
                                    <p className="text-2xl font-semibold">Review</p>
                                </div>
                                <div className='w-full flex mt-6 border-[1px] p-2 rounded-lg'>
                                    <div className='w-[20%] h-full flex items-center'><img src="https://images.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,c_fill,g_faces,w_80,h_80/v1491534752/assets/MWV_jewel_box_yvmjjd.webp" className='rounded-lg w-[90px] h-[60px]' alt="" />
                                    </div>
                                    <div className='w-[80%] h-full flex justify-center flex-col ml-4'>
                                        <p className='font-semibold'>{item.Product.name}</p>
                                        <div className='flex'>
                                        </div>
                                        <p className='text-[11px]'>Total Transaction: IDR 500.000.000,00</p>
                                    </div>
                                </div>
                                <div className='w-full mt-4 flex flex-col items-center'>
                                    <p className='text-[13px] mb-[2px]'>Rating Product</p>
                                    <Rating
                                        name="simple-controlled size-large"
                                        size='large'
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </div>
                                <div className='w-full mt-4 flex flex-col items-center'>
                                    {/* <p className='text-[13px] mb-[2px]'>Write your testimonial here</p> */}
                                    <TextField
                                        id="outlined-textarea"
                                        label="Testimony"
                                        placeholder="Write your testimonial here"
                                        multiline
                                        rows={3}
                                        className='w-full max-h-[6em]'
                                    />
                                    {/* <textarea name="" id="" cols="30" rows="10" placeholder='this venue was so big' className='focus:outline-none max-h-[6em] border-2 w-full p-2 rounded text-[13px]'></textarea> */}
                                </div>
                                <button className="mt-4 rounded-lg w-full text-white bg-[#645CBB] hover:bg-[#BFACE2] duration-200 p-2">
                                    <p>Submit</p>
                                </button>
                            </div>
                            </Box>
                        </Modal>
                    <div className="w-[60%] bg-white mt-2 rounded-lg shadow flex flex-col p-4">
                        <div className="flex items-center">
                            <p className="flex items-center text-[12px] font-[400]"> <HiOutlineShoppingBag className='mr-2 text-[17px]'/> 27/11/2023</p>
                            {item.paymentStatus === 'DP' ? 
                            <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>down payment</p>
                            :
                            <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>fully paid</p>
                            }
                        </div>
                        <div className="flex items-center w-full mt-4 h-[4em]">
                            <div className='w-[15%] h-full flex items-center'><img src="https://images.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,c_fill,g_faces,w_80,h_80/v1491534752/assets/MWV_jewel_box_yvmjjd.webp" className='rounded-lg w-[90px] h-[60px]' alt="" />
                            </div>
                            <div className='w-[50%] h-full flex justify-center flex-col'>
                                <p className='font-semibold'>{item.Product.name}</p>
                                <div className='flex'>
                                <p className='text-[11px]'>Reservation date:  </p>
                                <button className='px-2 text-[10px] border-[1px] ml-2 rounded-lg font-light hover:bg-gray-100 duration-200'>reschedule</button>
                                </div>
                                <p className='text-[11px]'>Total Transaction: IDR 500.000.000,00</p>
                            </div>
                            {item.paymentStatus === 'DP' ? 
                            <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center'>
                                <p className='text-[11px]'>remaining payment: <span className='font-semibold'>IDR 250.000.000,00</span></p>
                                <p className='text-[11px]'>payment due: <span className='font-semibold'>28 Nov 2024</span> </p>
                                <button className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Pay
                                </button>
                                {/* <p className='text-[11px]'>Total Transaction</p>
                                <p className='text-[13px]'>IDR 500.000.000,00</p> */}
                            </div> : 
                            <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center'>
                                <button onClick={handleOpen} className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Review
                                </button>
                            </div>
                            }
                        </div>
                        <div className="flex items-center w-full mt-2 justify-end">
                        </div>
                    </div>
                    </>
                )
            })}
                {/* <div className="w-[60%] bg-white mt-2 rounded-lg shadow flex flex-col p-4">
                    <div className="flex items-center">
                        <p className="flex items-center text-[12px] font-[400]"> <HiOutlineShoppingBag className='mr-2 text-[17px]'/> 27/11/2023</p>
                        <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>fully paid</p>
                    </div>
                    <div className="flex items-center w-full mt-4 h-[4em]">
                        <div className='w-[15%] h-full flex items-center'><img src="https://images.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,c_fill,g_faces,w_80,h_80/v1491534752/assets/MWV_jewel_box_yvmjjd.webp" className='rounded-lg w-[90px] h-[60px]' alt="" />
                        </div>
                        <div className='w-[50%] h-full flex justify-center flex-col'>
                            <p className='font-semibold'>DINNER RECEPTION</p>
                            <p className='text-[11px]'>Reservation date: 27/04/2024</p>
                            <p className='text-[11px]'>Total Transaction: IDR 500.000.000,00</p>
                        </div>
                        <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center'>
                            {/* <p className='text-[11px]'>remaining payment: <span className='font-semibold'>IDR 250.000.000,00</span></p>
                            <p className='text-[11px]'>payment due: <span className='font-semibold'>28 Nov 2024</span> </p> */}
                            {/* <button className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Review
                            </button> */}
                            {/* <p className='text-[11px]'>Total Transaction</p>
                            <p className='text-[13px]'>IDR 500.000.000,00</p> */}
                        {/* </div>
                    </div>
                    <div className="flex items-center w-full mt-2 justify-end">
                    </div>
                </div> */} 
        </div>
    )
}

export default OrderHistory