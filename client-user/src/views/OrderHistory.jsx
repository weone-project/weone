import {HiOutlineShoppingBag } from 'react-icons/hi'
// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
//   } from "@material-tailwind/react";
const OrderHistory = () => {
    // const data = [
    // {
    //   label: "All",
    //   value: "html"
    // },
    // {
    //   label: "Down Payment",
    //   value: "react",
    // },
    // {
    //   label: "Success",
    //   value: "vue",
    // }
//   ];
    return (
        // <div className='min-h-[100vh] w-full flex justify-center'>
        //     <Tabs value="html" className="w-[60%]">
        //         <TabsHeader>
        //             {data.map(({ label, value }) => (
        //             <Tab key={value} value={value}>
        //             {label}
        //             </Tab>
        //             ))}
        //         </TabsHeader>
        //         <TabsBody>
        //             {data.map(({ label ,value, desc }) => (
        //                 label === 'All' ? 
        //                 <div className="w-full bg-white mt-2 rounded-lg shadow flex flex-col p-4">
        //                 <div className="flex items-center">
        //                     <p className="flex items-center text-[12px] font-[400]"> <HiOutlineShoppingBag className='mr-2 text-[17px]'/> 27/11/2023</p>
        //                     <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>down payment</p>
        //                 </div>
        //                 <div className="flex items-center w-full mt-4 h-[4em]">
        //                     <div className='w-[15%] h-full flex items-center'><img src="https://images.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,c_fill,g_faces,w_80,h_80/v1491534752/assets/MWV_jewel_box_yvmjjd.webp" className='rounded-lg w-[90px] h-[60px]' alt="" />
        //                     </div>
        //                     <div className='w-[50%] h-full flex justify-center flex-col'>
        //                         <p className='font-semibold'>DINNER RECEPTION</p>
        //                         <div className='flex'>
        //                         <p className='text-[11px]'>Reservation date: 27/04/2024</p>
        //                         <button className='px-2 text-[10px] border-[1px] ml-2 rounded-lg font-light hover:bg-gray-100 duration-200'>reschedule</button>
        //                         </div>
        //                         <p className='text-[11px]'>Total Transaction: IDR 500.000.000,00</p>
        //                     </div>
        //                     <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center'>
        //                         <p className='text-[11px]'>remaining payment: <span className='font-semibold'>IDR 250.000.000,00</span></p>
        //                         <p className='text-[11px]'>payment due: <span className='font-semibold'>28 Nov 2024</span> </p>
        //                         <button className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Pay
        //                         </button>
        //                         {/* <p className='text-[11px]'>Total Transaction</p>
        //                         <p className='text-[13px]'>IDR 500.000.000,00</p> */}
        //                     </div>
        //                 </div>
        //                 <div className="flex items-center w-full mt-2 justify-end">
        //                 </div>
        //             </div>
                    
        //             : ''

        //             ))}
        //         </TabsBody>
        //     </Tabs>
        // </div>
        <div className="min-h-[100vh] bg-gray-50 flex flex-col items-center p-6">
            <div className="w-[60%] bg-white rounded-lg mb-4 flex px-4 shadow">
                <button className="px-4 py-2 border-b-2 border-white focus:border-[#00425A] duration-200 mx-2">All</button>
                <button className="px-4 py-2 border-b-2 border-white focus:border-[#00425A] duration-200 mx-2">Down Payment</button>
                <button className="px-4 py-2 border-b-2 border-white focus:border-[#00425A] duration-200 mx-2">Success</button>
            </div>

            <div className="w-[60%] bg-white mt-2 rounded-lg shadow flex flex-col p-4">
                <div className="flex items-center">
                    <p className="flex items-center text-[12px] font-[400]"> <HiOutlineShoppingBag className='mr-2 text-[17px]'/> 27/11/2023</p>
                    <p className='bg-gray-200 ml-4 px-2 rounded text-[12px] font-[300]'>down payment</p>
                </div>
                <div className="flex items-center w-full mt-4 h-[4em]">
                    <div className='w-[15%] h-full flex items-center'><img src="https://images.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,c_fill,g_faces,w_80,h_80/v1491534752/assets/MWV_jewel_box_yvmjjd.webp" className='rounded-lg w-[90px] h-[60px]' alt="" />
                    </div>
                    <div className='w-[50%] h-full flex justify-center flex-col'>
                        <p className='font-semibold'>DINNER RECEPTION</p>
                        <div className='flex'>
                        <p className='text-[11px]'>Reservation date: 27/04/2024</p>
                        <button className='px-2 text-[10px] border-[1px] ml-2 rounded-lg font-light hover:bg-gray-100 duration-200'>reschedule</button>
                        </div>
                        <p className='text-[11px]'>Total Transaction: IDR 500.000.000,00</p>
                    </div>
                    <div className='w-[35%] pl-4 border-l-2 h-full flex flex-col justify-center'>
                        <p className='text-[11px]'>remaining payment: <span className='font-semibold'>IDR 250.000.000,00</span></p>
                        <p className='text-[11px]'>payment due: <span className='font-semibold'>28 Nov 2024</span> </p>
                        <button className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Pay
                        </button>
                        {/* <p className='text-[11px]'>Total Transaction</p>
                        <p className='text-[13px]'>IDR 500.000.000,00</p> */}
                    </div>
                </div>
                <div className="flex items-center w-full mt-2 justify-end">
                </div>
            </div>
            <div className="w-[60%] bg-white mt-2 rounded-lg shadow flex flex-col p-4">
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
                        <button className='w-[75%] mt-2 mr-4 bg-[#00425A] hover:bg-[#004159c3] duration-200 text-white px-4 py-[3px] rounded-lg'>Review
                        </button>
                        {/* <p className='text-[11px]'>Total Transaction</p>
                        <p className='text-[13px]'>IDR 500.000.000,00</p> */}
                    </div>
                </div>
                <div className="flex items-center w-full mt-2 justify-end">
                </div>
            </div>
        </div>
    )
}

export default OrderHistory