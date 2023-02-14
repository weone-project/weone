import React, { useRef, useEffect, useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi'
import '../index.css';
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { GET_ALL_INV } from "../queries/invitation";
import logo from '../assets/logo/Logo-l.png'
import "../style.css";
import { useQuery } from '@apollo/client';

function InvDashboard() {
  const { data, loading, error } = useQuery(GET_ALL_INV, {
    variables: {
      accessToken: localStorage.getItem('token')
    }
  })
  
  function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'  })
  }

  if (error) {
    return (
      <p className="text-lg text-red-500 pl-2 font-sm w-full capitalize mx-auto"> Error</p>
    )
  }


  return (
    <>

      <section className="fixed flex w-full border-b-[1px] bg-white shadow-md z-20">
        <div className="flex w-full mx-[70px] justify-between items-center h-14">
        <Link to={'/products'}>
          <div className="h-full flex items-center"><img src={logo} alt="" width={100} /></div>
          </Link>
          <div className="h-10 flex h-full">
            <div className="flex mx-8 font-light h-full ">
              <Link to={'/products'}>
                <button className="mx-4 hover:border-b-2 hover:border-[#645CBB] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#645CBB] h-full duration-300">Home</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-[100vh] bg-gray-50 flex flex-col items-center p-6">
        {data?.getInvitations?.map((item) => {
          if (item.Order.User.id === localStorage.getItem('id')) {
            return (
              <div className="w-[60%] bg-white mt-12 rounded-lg shadow flex flex-col p-4">
                <div className="flex items-center">
                  <p className="flex items-center text-[12px] font-[400]"> <HiOutlineShoppingBag className='mr-2 text-[17px]' /> 27/11/2023</p>
                  <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>fully paid</p>
                </div>
                <div className="flex items-center w-full mt-4 h-[4em]">
                  <div className='w-[15%] h-full flex items-center'><img src={item.photo} className='rounded-lg w-[90px] h-[60px]' alt="" />
                  </div>
                  <div className='w-[50%] h-full flex justify-center flex-col'>
                    <p className='font-semibold'>Wedding Invitation</p>
                    <p className='text-[11px]'>{item.bride_nick} & {item.groom_nick}</p>
                    <p className='text-[11px]'>{formatDate(item.ceremonial_date)}</p>
                  </div>
                  <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center'>
                    {(item.Order.id) ?
                      <Link to={`/t1/${item.id}`}>
                        <button className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Buka Undangan
                        </button></Link>
                      : ""
                    }
                  </div>
                </div>
                <div className="flex items-center w-full mt-2 justify-end">
                </div>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}

export default InvDashboard;
