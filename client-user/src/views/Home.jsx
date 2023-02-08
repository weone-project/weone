import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../index.css";
import { HiOutlineSwatch, HiOutlineBuildingOffice, HiOutlineCamera, HiOutlineRectangleStack } from "react-icons/hi2";
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_ACTIVE } from '../queries/product';
import { useEffect, useState } from 'react';
import CardProducts from '../components/CardProducts';
const Home = () => {
  const {data, loading, error} = useQuery(GET_PRODUCT_ACTIVE);
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    if(data){
      const temp = data.getProductActive.filter((item) => item.rating >= 4)
      setNewData(temp)
    }
  }, [data])
  return (
    <>
      {/* carousell */}

      <section className=" h-[100vh] flex landing">
          <div className=' w-[70%] flex flex-col pl-24 pt-24'>
            <p className='text-5xl text-[#00425A]'>When Your</p>
            <p className='text-5xl text-[#00425A] font-semibold'>Dream Wedding Come True</p>
            <p className='text-[16px] text-[#00425A] font-light mt-6 w-[50%]'> "Once in a while, right in the middle of an ordinary life, love gives us a fairy tale" </p>
            <div className='mt-14 bg-white w-[500px] h-[48px] rounded-xl flex items-center pl-6 pr-2 shadow-md'>
              <input type="text" name="" id="" placeholder='Find Photographer, Cathering, etc' className='px-2 w-[92%] h-full focus:outline-none' />
              <div className='bg-[#A084DC] hover:bg-[#BFACE2] cursor-pointer h-[80%] w-[8%] rounded-xl flex items-center justify-center'><i className="text-white fa-solid fa-magnifying-glass"></i></div>
            </div>

            <div className='w-[50%] gap-y-4 mt-10 grid grid-cols-2'>
              <div className='flex w-[230px] h-[50px] flex items-center cursor-pointer hover:shadow duration-200 rounded-lg'>
                <div className='bg-white flex items-center p-2 rounded-lg'><HiOutlineSwatch className='text-[#A084DC] text-4xl'/></div>
                <p className='flex items-center mx-2 text-[16px]  text-[#00425A]'>Wedding Invitations</p>
              </div>
              <div className='flex w-[230px] h-[50px] flex items-center cursor-pointer hover:shadow duration-200 rounded-lg'>
                <div className='bg-white flex items-center p-2 rounded-lg'><HiOutlineBuildingOffice className='text-[#A084DC] text-4xl'/></div>
                <p className='flex items-center mx-2 text-[16px]  text-[#00425A]'>Reception Venues</p>
              </div>
              <div className='flex w-[230px] h-[50px] flex items-center cursor-pointer hover:shadow duration-200 rounded-lg'>
                <div className='bg-white flex items-center p-2 rounded-lg'><HiOutlineCamera className='text-[#A084DC] text-4xl'/></div>
                <p className='flex items-center mx-2 text-[16px]  text-[#00425A]'>Wedding Photographer</p>
              </div>
              <div className='flex w-[230px] h-[50px] flex items-center cursor-pointer hover:shadow duration-200 rounded-lg '>
                <div className='bg-white flex items-center p-2 rounded-lg'><HiOutlineRectangleStack className='text-[#A084DC] text-4xl'/></div>
                <p className='flex items-center mx-2 text-[16px]  text-[#00425A]'>Other Services</p>
              </div>
            </div>
          </div>
      </section>

      {/* body */}
      {/* <section className="w-full flex items-center justify-center my-10">
        <div className="flex flex-col items-end h-full w-[50%] ">
          <div className="bg-white w-[80%] h-[200px] my-4 cursor-pointer hover:shadow-lg border-[1px] border-gray-200 rounded-xl flex">
            <div className="w-[60%] px-10 py-6 flex flex-col justify-between h-full">
              <div className="flex flex-col pt-4">
                <p className="text-[28px] font-bold">Vendors</p>
                <p className="text-[15px] font-light">
                  Find your photographer, venue, cake and more!
                </p>
              </div>
              
              <div className="flex items-center h-full">
                <a className="text-blue-800 font-light">more </a>
                <i class="mt-[0.5px] ml-2 text-blue-800 fa-solid fa-angle-right"></i>
              </div>
            </div>
            <div className="w-[40%] max-h-[200px]">
              <img
                src="https://rizkaedmanda.com/wp-content/uploads/2017/08/IMG_20170415_223303_505.jpg"
                className="max-h-[200px] w-full rounded-bl-full object-cover"
              />
            </div>
          </div>
          <div className="bg-white w-[80%] h-[200px] my-4 cursor-pointer hover:shadow-lg border-[1px] border-gray-200 rounded-xl flex">
            <div className="w-[60%] px-10 py-6 flex flex-col justify-between h-full">
              <div className="flex flex-col pt-4">
                <p className="text-[28px] font-bold">Vendors</p>
                <p className="text-[15px] font-light">
                  Find your photographer, venue, cake and more!
                </p>
              </div>
              <div className="flex items-center h-full">
                <a className="text-blue-800 font-light">more </a>
                <i class="mt-[0.5px] ml-2 text-blue-800 fa-solid fa-angle-right"></i>
              </div>
            </div>
            <div className="w-[40%] max-h-[200px]">
              <img
                src="https://rizkaedmanda.com/wp-content/uploads/2017/08/IMG_20170415_223303_505.jpg"
                className="max-h-[200px] w-full rounded-bl-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full w-[50%] ml-4">
          <div className="bg-white w-[80%] h-[430px] my-4 cursor-pointer hover:shadow-lg border-[1px] border-gray-200 rounded-xl flex">
            <div className="w-[60%] px-10 py-6 flex flex-col justify-between h-full">
              <div className="flex flex-col pt-4">
                <p className="text-[28px] font-bold">Invitations</p>
                <p className="text-[15px] font-light">
                  Create beautiful paper invites that get your guests excited to
                  RSVP.
                </p>
              </div>
              <div className="w-[40%] max-h-[200px] flex">
                <img
                  src="https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/1-ryv1w6sSU/akad-wedding-undangan-online-invitation-web_online-web-invitation_1.jpg"
                  className="max-h-[200px] w-full object-cover"
                />
                <img
                  src="https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/1-ryv1w6sSU/akad-wedding-undangan-online-invitation-web_online-web-invitation_1.jpg"
                  className="max-h-[200px] w-full object-cover"
                />
                <img
                  src="https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/1-ryv1w6sSU/akad-wedding-undangan-online-invitation-web_online-web-invitation_1.jpg"
                  className="max-h-[200px] w-full object-cover"
                />
                <img
                  src="https://london.bridestory.com/images/c_fill,dpr_1.0,f_auto,fl_progressive,pg_1,q_80,w_680/v1/assets/1-ryv1w6sSU/akad-wedding-undangan-online-invitation-web_online-web-invitation_1.jpg"
                  className="max-h-[200px] w-full object-cover"
                />
              </div>
              <div className="flex items-center h-[18%]">
                <a className="text-blue-800 font-light">more </a>
                <i class="mt-[0.5px] ml-2 text-blue-800 fa-solid fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="h-[500px] sectionSpecial flex flex-col py-14 px-10 body-menu">
        <p className="text-3xl">Products You May Like!</p>
        <p className='font-light'>Temukan produk dan paket pernikahan terlengkap hanya di We-One!</p>
        
        <div className='mt-10'>
            <Swiper
            slidesPerView={5}
            spaceBetween={30}
            // pagination={{
            //     clickable: true,
            // }}
            style={{
                "--swiper-navigation-color": "#000",
                "--swiper-navigation-size": "25px",
                "--swiper-navigation-backgorund-color": "#fff",
            }}
            // centeredSlides={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
        >
          {newData?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <CardProducts  product={item}/>
              {/* <div className='w-[260px] cursor-pointer'>
                  <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                  <p>The Studio</p>
                  <div className='flex'>
                  <Rating name="read-only" value={5} readOnly />
                  <p className='ml-2'>5.0</p>
                  </div>
              </div> */}
          </SwiperSlide>
            )
          })
          }

            {/* <SwiperSlide>
                <div className='w-[260px] cursor-pointer'>
                    <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                    <p>The Studio</p>
                    <div className='flex'>
                    <Rating name="read-only" value={5} readOnly />
                    <p className='ml-2'>5.0</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[260px] cursor-pointer'>
                    <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                    <p>The Studio</p>
                    <div className='flex'>
                    <Rating name="read-only" value={5} readOnly />
                    <p className='ml-2'>5.0</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[260px] cursor-pointer'>
                    <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                    <p>The Studio</p>
                    <div className='flex'>
                    <Rating name="read-only" value={5} readOnly />
                    <p className='ml-2'>5.0</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[260px] cursor-pointer'>
                    <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                    <p>The Studio</p>
                    <div className='flex'>
                    <Rating name="read-only" value={5} readOnly />
                    <p className='ml-2'>5.0</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-[260px] cursor-pointer'>
                    <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                    <p>The Studio</p>
                    <div className='flex'>
                    <Rating name="read-only" value={5} readOnly />
                    <p className='ml-2'>5.0</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className='w-[260px] cursor-pointer'>
                    <img src="https://london.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,h_210,w_272,c_fill,g_faces/v1/assets/espoir-studio-1635131538-3o87-oOmZ.webp" alt="" className="w-full h-[70%] rounded-lg" />
                    <p>The Studio</p>
                    <div className='flex'>
                    <Rating name="read-only" value={5} readOnly />
                    <p className='ml-2'>5.0</p>
                    </div>
                </div>
            </SwiperSlide> */}
            </Swiper>
        </div>
      </section>

    </>
  );
};
export default Home;
