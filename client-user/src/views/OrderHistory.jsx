import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {HiOutlineShoppingBag } from 'react-icons/hi'
import { GET_ORDERS, UPDATE_ORDER, UPDATE_ORDER_RESCHEDULE } from '../queries/order';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useRef } from "react";
import Rating from '@mui/material/Rating';
import { Link, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import loadingin from "../assets/53735-cart-icon-loader.gif";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import "../style.css";
import { GET_MIDTRANS } from '../queries/midtrans';
import { CREATE_TESTIMONI } from '../queries/testimoni';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
};
const OrderHistory = () => {
    const navigate = useNavigate()
    const [newData, setNewData] = useState([])
    const [filter, setFilter] = useState('All')
    const {data, loading, error, refetch} = useQuery(GET_ORDERS, {
        variables: {
            accessToken: localStorage.getItem('token')
        },
        fetchPolicy: 'no-cache'
    })
    const [dataTestimonial, { loading: loadingTestimonial, error: errorTestimonial, data: dataTestimonialData }] = useMutation(CREATE_TESTIMONI, {
        refetchQueries: [{
            query: GET_ORDERS,
            variables: {
                accessToken: localStorage.getItem('token')
            }
        }]
    })
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (id, name, fullPayment, reservationDate, imgUrl) => {
        setOpen2(true);
        setDataModal2({
            id: id,
            name: name,
            fullPayment: fullPayment,
            reservationDate: reservationDate,
            imgUrl: imgUrl,
            } )
    } 
    
    const handleClose2 = () => setOpen2(false);

    const [ dataModal , setDataModal ] = useState({
        id: '',
        name: '',
        fullPayment: '',
        imgUrl: '',
    })
    const [ dataModal2 , setDataModal2 ] = useState({
        id: '',
        name: '',
        fullPayment: '',
        reservationDate: '',
        imgUrl: '',
    })
    const [dataReschecule, setdataReschedule] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id, name, fullPayment, imgUrl) => {
        console.log(id, name, fullPayment, imgUrl,'>>>>>>>>>>><<<<<<<<<<<<<<<<');
        setOpen(true);
        setDataModal({
            id: id,
            name: name,
            fullPayment: fullPayment,
            imgUrl: imgUrl,
         } )
    } 
    const handleClose = () => setOpen(false);
    const [dataUpdate, { loading: loadingUpdate, error: errorUpdate, data: dataUpdateData }] = useMutation(UPDATE_ORDER, {
        refetchQueries: [{
            query: GET_ORDERS,
            variables: {
                accessToken: localStorage.getItem('token')
            }
        }],
        awaitRefetchQueries: true,
    })
    const submitTestimoni = (id) => {
        console.log(id, '<<<<<<<<<<<<<<<<<<<<<<');
        if ( rating === 0 || !review ) {
            toast.warn('Data is Required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } else {
                dataTestimonial({
                    variables: {
                        form: {
                            rating: +rating,
                            testimony: review,
                            productId: +id,
                        },
                        accessToken: localStorage.getItem('token')
                    }
                })
                // console.log(id, '<<<<<<<<<<<<<<<<<<<<<<?????????????????????/')
                dataUpdate({
                    variables: {
                        form: {
                            paymentStatus: 'DONEREVIEW'
                        },
                        orderId: +id,
                        accessToken: localStorage.getItem('token')
                    }
                })
                refetch()
                handleClose()
            }
        }
        console.log(dataUpdateData, '<<<<<<<<><><<?<?<?<?><<<<<<<<<<<<<<<<<');

    useEffect(() => {
        if (dataTestimonialData?.createTestimony) {
            navigate('/histories')
        }
    }, [dataTestimonialData])

    const [dataMidtrans, { loading: loadingMidtrans, error: errorMidtrans, data: dataMidtransData }] = useMutation(GET_MIDTRANS, {
        refetchQueries: [{
            query: GET_ORDERS,
            variables: {
                accessToken: localStorage.getItem('token')
            },
            awaitRefetchQueries: true,
        }]
    })
    const clickorderPay = ( id, quantity, ProductId, ProductPrice, ProductName, ProductImgUrl, ProductEstimatedDay, reservationDate, fullPayment, downPayment, notes ) => {
        dataMidtrans({
          variables: {
            form: {
              quantity: +quantity,
              reservationDate: reservationDate,
              notes: notes,
              paymentStatus: 'DONE',
              productId: +ProductId,
              downPayment: downPayment,
              fullPayment: fullPayment,
              orderId: +id
            },
            status: 'remaining-payment',
            accessToken: localStorage.getItem('token')
          }
        })
    }

    const [dataUpdateResched, { loading: loadingReschecule, error: errorReschecule, data: dataRescheculeData }] = useMutation(UPDATE_ORDER_RESCHEDULE, {
        refetchQueries: [{
            query: GET_ORDERS,
            variables: {
                accessToken: localStorage.getItem('token')
            }
        }],
        awaitRefetchQueries: true,
    })
    const rescheduleDate = (id) => {
        dataUpdateResched({
            variables: {
                form: {
                    rescheduleDate: dataReschecule,
                    rescheduleStatus: 'requesting'
                },
                orderId: +id,
                accessToken: localStorage.getItem('token')
            }
        })
        refetch()
        handleClose2()
    }

    useEffect(() => {
        if (dataRescheculeData?.updateReschedule) {
            refetch()
        }
    }, [dataRescheculeData])
    // console.log(dataRescheculeData, '!!!!!!!!!!!!!!!!!!!<<<<<<<<<<<<<<<<<<<<<<<<<');

    useEffect(() => {
        if (dataMidtransData?.midtransToken.token) {
            window.snap.pay(dataMidtransData.midtransToken.token, {
                onSuccess: (result) => {
                    console.log('success', result)
                    // navigate('/')
                    refetch()
                    // navigate('/histories')
                }
            }) 
        }
    }, [dataMidtransData])

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

    useEffect(()=> {
        setNewData(data?.getOrdersUser)
    }, [])

    const setFilterOrder = (data)=> {
        setFilter(data)
    }

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
          { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
    }

    const formatEstimatedDate = (reservationDate, estimatedDate) => {
        const date = new Date(reservationDate)
        const date2 = new Date(estimatedDate)
        const date3 = new Date(date.setDate(date.getDate() - estimatedDate))
        return date3.toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})
    }

    const formatDate = (datee) => {
        const date = new Date(datee)
        return date.toLocaleDateString("id", {year: 'numeric', month: 'long', day: 'numeric'})
    }

    

    if ( loading || loadingTestimonial || loadingMidtrans || loadingUpdate) {
        return (
            <div className="min-h-[100vh] bg-white flex justify-center items-center pb-20">
                <img src={loadingin} className="w-[200px]" alt=""/>
            </div>
        )
    }
    return (
        <>
        <ToastContainer/>
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
                    console.log(item.Product?.CategoryId)
                    console.log(item);
                                        
                    return (
                        <>
                        <Modal
                                open={open2}
                                onClose={handleClose2}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className="border-b-2 bg-white rounded-xl h-[25em] w-[30em] ">
                                <div className="w-full flex flex-col items-center px-8 py-4">
                                    <div className="w-full flex justify-center">
                                        <p className="text-2xl font-semibold">Reschedule Date</p>
                                    </div>
                                    <div className='w-full flex mt-6 border-[1px] p-2 rounded-lg'>
                                        <div className='w-[20%] h-full flex items-center'><img src={dataModal2.imgUrl} className='rounded-lg w-[90px] h-[60px]' alt="" />
                                        </div>
                                        <div className='w-[80%] h-full flex justify-center flex-col ml-4'>
                                            <p className='font-semibold'>{dataModal2.name}</p>
                                            <div className='flex'>
                                            </div>
                                            <p className='text-[11px]'>Total Transaction: {formatRupiah(dataModal2.fullPayment)}</p>
                                            <p className='text-[11px]'>Reservation Date: {formatDate(dataModal2.reservationDate)}</p>
                                        </div>
                                    </div>
                                    <div className='w-full mt-4 flex flex-col items-center'>
                                        <p className='text-[20px] font-semibold'>Change Date</p>
                                        <input type="date" onChange={(e) => {
                                            setdataReschedule(e.target.value)
                                        }}/>
                                    </div>
                                    <button onClick={() => {
                                        rescheduleDate(dataModal2.id)
                                    }} className="mt-4 rounded-lg w-full text-white bg-[#645CBB] hover:bg-[#BFACE2] duration-200 p-2">
                                        <p>Submit</p>
                                    </button>
                                </div>
                                </Box>
                        </Modal>

                            {/* INI MODAL REVIEW */}
                        <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                key={item.id}
                            >
                                <Box sx={style} className="border-b-2 bg-white rounded-xl h-[30em] w-[30em] ">
                                <div className="w-full flex flex-col items-center px-8 py-4">
                                    <div className="w-full flex justify-center">
                                        <p className="text-2xl font-semibold">Review</p>
                                    </div>
                                    <div className='w-full flex mt-6 border-[1px] p-2 rounded-lg'>
                                        <div className='w-[20%] h-full flex items-center'><img src={dataModal.imgUrl} className='rounded-lg w-[90px] h-[60px]' alt="" />
                                        </div>
                                        <div className='w-[80%] h-full flex justify-center flex-col ml-4'>
                                            <p className='font-semibold'>{dataModal.name}</p>
                                            <div className='flex'>
                                            </div>
                                            <p className='text-[11px]'>Total Transaction: {formatRupiah(dataModal.fullPayment)}</p>
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
                                            onChange={(e) => {
                                                setReview(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <button onClick={() => {
                                        console.log(dataModal);
                                        submitTestimoni(dataModal.id)
                                    }} className="mt-4 rounded-lg w-full text-white bg-[#645CBB] hover:bg-[#BFACE2] duration-200 p-2">
                                        <p>Submit</p>
                                    </button>
                                </div>
                                </Box>
                        </Modal>
                        <div className="w-[60%] bg-white mt-2 rounded-lg shadow flex flex-col p-4">
                            <div className="flex items-center">
                                <p className="flex items-center text-[12px] font-[400]"> <HiOutlineShoppingBag className='mr-2 text-[17px]'/> {formatDate(item.createdAt)}</p>
                                {item.paymentStatus === 'DP' ? 
                                <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>down payment</p>
                                :
                                <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>fully paid</p>
                                }
                            </div>
                            <div className="flex items-center w-full mt-4 h-[4em]">
                                <div className='w-[15%] h-full flex items-center'><img src={item.Product.imgUrl[0]} className='rounded-lg w-[90px] h-[60px]' alt="" />
                                </div>
                                <div className='w-[50%] h-full flex justify-center flex-col'>
                                    <p className='font-semibold'>{item.Product.name}</p>
                                    <div className='flex'>
                                    <p className='text-[11px]'>Reservation date:  {formatDate(item.reservationDate)}</p>
                                    {item.rescheduleStatus === 'requesting'? 
                                    <p className='text-[11px] ml-2 font-semibold'>|| Request date:  {formatDate(item.rescheduleDate)}</p> : 
                                    ''
                                }
                                { item.rescheduleStatus === 'approved' ? <p className='text-[11px] ml-2 font-semibold'>|| Reschedule:  accepted</p> : ''}
                                { item.rescheduleStatus === 'rejected' ? <p className='text-[11px] ml-2 font-semibold'>|| Reschedule:  rejected</p> : ''}
                                {item.rescheduleStatus !== 'approved' && item.rescheduleStatus !== 'requesting' && item.rescheduleStatus !== 'rejected' ? <button onClick={() => {
                                        handleOpen2(item.id, item.Product.name, item.fullPayment, item.reservationDate,  item.Product.imgUrl)
                                    }} className='px-2 text-[10px] border-[1px] ml-2 rounded-lg font-light hover:bg-gray-100 duration-200'>reschedule</button>: ''}
                                    </div>
                                    <p className='text-[11px]'>Total Transaction: {formatRupiah(item.fullPayment)}</p>
                                </div>
                                { item.paymentStatus === 'DP' ? 
                                <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center items-center'>
                                    <p className='text-[11px]'>remaining payment: <span className='font-semibold'> {formatRupiah(item.fullPayment-item.downPayment)}</span></p>
                                    <p className='text-[11px]'>payment due: <span className='font-semibold'>{
                                    formatEstimatedDate(item.reservationDate, item.Product.estimatedDay) 
                                    }</span> </p>
                                    <button onClick={() => {
                                        clickorderPay(item.id, item.quantity, item.Product.id, item.Product.price, item.Product.name, item.Product.imgUrl[0], item.Product.estimatedDay, item.reservationDate, item.fullPayment, item.downPayment, item.notes)
                                    }} className='w-[75%] mt-2 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Pay
                                    </button>
                                    {/* <p className='text-[11px]'>Total Transaction</p>
                                    <p className='text-[13px]'>IDR 500.000.000,00</p> */}
                                </div> : 
                                ''
                                }
                                {item.paymentStatus === 'DONE'   && item.Product?.CategoryId !== 7? 
                                <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center items-center'>
                                    <button onClick={() => {
                                        console.log(item.id, '>>>>>>>>>>>>>>>>>>>>>>>>');
                                        handleOpen(item.id, item.Product.name, item.fullPayment, item.Product.imgUrl[0])
                                    }} className='w-[75%] mt-2 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Review
                                    </button>
                                </div> : ''}
                                { item.paymentStatus == 'DONEREVIEW' ? 
                                <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center items-center'>
                                    <p>Transaction Completed</p>
                                </div> : ''}
                                {item.paymentStatus === 'DONE' && item.Product?.CategoryId === 7 ? 
                                <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center items-center'>
                                    <Link to={`/inv/${item.id}`}>
                                    <button  className='w-[75%] mt-2 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Create Invitation
                                    </button>
                                    </Link>
                                    
                                </div> : ''}
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
        </>
    )
}

export default OrderHistory