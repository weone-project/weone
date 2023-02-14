import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import { RiMapPin2Line } from "react-icons/ri";
import "swiper/css";
import "swiper/css/pagination";
import "../style.css";
import { Pagination, Navigation } from "swiper";
// import * as React from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { GET_PRODUCT_BY_ID } from "../queries/product";
import { useMutation, useQuery } from "@apollo/client";
import { GET_MIDTRANS } from "../queries/midtrans";
import { GET_TESTIMONI } from "../queries/testimoni";
import loadingin from "../assets/53735-cart-icon-loader.gif";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};
const DetailProduct = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      getProductByIdId: id,
    },
  });
  const [number, setNumber] = useState(1);
  const navigate = useNavigate();
  const [
    dataMidtrans,
    { loading: loadingMidtrans, error: errorMidtrans, data: dataMidtransData },
  ] = useMutation(GET_MIDTRANS);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [totalPrice, setTotalPrice] = useState(
    data?.getProductById?.price * number
  );
  const [totalDP, setTotalDP] = useState(
    data?.getProductById?.dpPrice * number
  );
  const [formOrder, setFormOrder] = useState({
    reservationDate: "",
    notes: "",
    quantity: 1,
  });

  const {
    data: dataTestimoni,
    loading: loadingTestimoni,
    error: errorTestimoni,
  } = useQuery(GET_TESTIMONI, {
    variables: {
      productId: +id,
    },
  });
  console.log(dataTestimoni);

  const clickPlusNumber = () => {
    setNumber(number + 1);
    setTotalPrice(data?.getProductById?.price * (number + 1));
    setTotalDP(data?.getProductById?.dpPrice * (number + 1));
  };
  const clickMinusNumber = () => {
    if (number > 1) {
      setNumber(number - 1);
      setTotalPrice(data?.getProductById?.price * (number - 1));
      setTotalDP(data?.getProductById?.dpPrice * (number - 1));
    }
  };
  useEffect(() => {
    console.log("<<<<<<<<< use effect data");
    setTotalPrice(data?.getProductById?.price);
    setTotalDP(data?.getProductById?.dpPrice);
  }, [data]);

  // console.log(dataTestimoni);

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const clickorderDP = () => {
    if (
      formOrder.reservationDate === "" ||
      formOrder.notes === "" ||
      formOrder.quantity === ""
    ) {
      toast.warn("Data is Required", {
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
      dataMidtrans({
        variables: {
          form: {
            quantity: +formOrder.quantity,
            reservationDate: formOrder.reservationDate,
            notes: formOrder.notes,
            paymentStatus: "DP",
            productId: +id,
            downPayment: totalDP,
            fullPayment: totalPrice,
          },
          status: "dp",
          accessToken: localStorage.getItem("token"),
        },
      });
    }
  };

  const clickorderFull = () => {
    if (
      formOrder.reservationDate === "" ||
      formOrder.notes === "" ||
      formOrder.quantity === ""
    ) {
      toast.warn("Data is Required", {
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
      dataMidtrans({
        variables: {
          form: {
            quantity: +formOrder.quantity,
            reservationDate: formOrder.reservationDate,
            notes: formOrder.notes,
            paymentStatus: "DONE",
            productId: +id,
            downPayment: totalDP,
            fullPayment: totalPrice,
          },
          status: "full",
          accessToken: localStorage.getItem("token"),
        },
      });
    }
    // .then((res) => {
    //   window.snap.pay(dataMidtransData.midtransToken.token, {
    //     onSuccess: (result) => {
    //       navigate('/histories')
    //     }
    //   }
    // )

    // })
  };
  useEffect(() => {
    console.log('<<<<<<<<<<use effect midtrans');
      if (dataMidtransData) {
        window.snap.pay(dataMidtransData.midtransToken.token, {
          onSuccess: (result) => {
          navigate('/histories')
        }
      })
    }
  }, [dataMidtransData])
  // console.log();
  if (loading || loadingMidtrans || loadingTestimoni) {
    
    return (
      <div className="min-h-[100vh] bg-white flex justify-center items-center pb-20">
        <img src={loadingin} className="w-[200px]" alt="" />
      </div>
    );
  }

  const toLogin = () => {
    toast.warn("You Must Login First", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // navigate("/login");

  return (
    <>
      <ToastContainer />
      <div className="min-h-[100vh]  flex flex justify-center z-10">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            className="border-b-2 bg-white rounded-xl h-[35em] w-[30em] "
          >
            <div className="w-full flex flex-col items-center px-10 py-4">
              <div className="w-full flex justify-center">
                <p className="text-2xl font-semibold">Pesan Sekarang</p>
              </div>
              <div className="w-full border-[1px] flex items-center p-2 rounded-lg mt-4">
                <img
                  src="https://images.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_80,c_fill,g_faces,w_80,h_80/v1491534752/assets/MWV_jewel_box_yvmjjd.webp"
                  className="w-16 rounded-lg"
                  alt=""
                />
                <div className="ml-4">
                  <p className="card_p_2 text-[14px]">
                    {data?.getProductById?.name}
                  </p>
                  <p>{formatRupiah(totalPrice)},00</p>
                </div>
              </div>
              <div className="w-full flex justify-center mt-6">
                <p className="text-[12px] font-light flex justify-center w-full">
                  Sebelum melanjutkan ke proses pembayaran, mohon lengkapi
                  tanggal layanan Anda terlebih dahulu.
                </p>
              </div>
              <div className="mt-4">
                <input
                  type="date"
                  onChange={(event) => {
                    setFormOrder({
                      ...formOrder,
                      reservationDate: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="mt-4 border-[2px] w-full rounded-lg">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="notes untuk vendor"
                  className="w-full max-h-[7em] rounded-lg p-2 focus:outline-none text-[12px]"
                  onChange={(event) => {
                    setFormOrder({
                      ...formOrder,
                      notes: event.target.value,
                    });
                  }}
                ></textarea>
              </div>
              {data?.getProductById?.dpPrice !== 0 ? (
                <button
                  onClick={clickorderDP}
                  className="mt-6 rounded-lg w-full text-white bg-[#645CBB] hover:bg-[#BFACE2] duration-200 p-2"
                >
                  <p>Down Payment {formatRupiah(totalDP)}</p>
                </button>
              ) : (
                ""
              )}
              <button
                onClick={clickorderFull}
                className="mt-2 rounded-lg w-full text-white bg-[#645CBB] hover:bg-[#BFACE2] duration-200 p-2"
              >
                <p>Full Payment {formatRupiah(totalPrice)}</p>
              </button>
            </div>
          </Box>
        </Modal>
        <div className="w-[70%] flex items-center flex-col py-20 px-20">
          <div className="w-full flex items-center justify-center h-[300px] detailProductImg relative">
            <Swiper
              slidesPerView={2}
              spaceBetween={30}
              centeredSlides={true}
              pagination={{
                clickable: true,
              }}
              style={{
                "--swiper-navigation-color": "#000",
                "--swiper-navigation-size": "25px",
              }}
              // centeredSlides={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data?.getProductById?.imgUrl.map((img, index) => {
                return (
              <SwiperSlide>
                <div className="rounded-lg max-h-[240px] min-h-[240px]">
                  <img
                    src={img}
                    className="rounded-lg object-cover h-full min-h-[240px] max-h-[240px]"
                    alt=""
                  />
                </div>
              </SwiperSlide>
                )
              })}
              {/* <SwiperSlide>
                <div className="rounded-lg">
                  <img
                    src="https://alexandra.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_60,c_fill,g_faces,w_560,h_280/assets/upload-I7DqjpDJE.webp"
                    className="rounded-lg"
                    alt=""
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="rounded-lg">
                  <img
                    src="https://alexandra.bridestory.com/image/upload/dpr_1.0,f_webp,fl_progressive,q_60,c_fill,g_faces,w_560,h_280/assets/upload-I7DqjpDJE.webp"
                    className="rounded-lg"
                    alt=""
                  />
                </div>
              </SwiperSlide> */}
            </Swiper>
          </div>
          <div className="h-[5em] w-full flex items-center border-b-2 pb-4 text-[#00425A]">
            <div>
              <p className="text-2xl font-semibold">
                {data?.getProductById?.name}
              </p>
              <div className="flex items-center mt-2">
                <Rating
                  name="read-only size-small"
                  size="small"
                  value={data?.getProductById?.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
              <p className="text-[10px] flex items-center font-light">
                {" "}
                <RiMapPin2Line className="mr-[2px]" />{" "}
                {data?.getProductById?.Vendor?.city},{" "}
                {data?.getProductById?.Vendor?.province}{" "}
              </p>
            </div>
          </div>
          <div className="w-full border-b-2 pb-10 py-2">
            {/* <p className="text-[20px]">Detail</p> */}
            <p className="text-[14px] font-[300] w-full">
              {data?.getProductById?.description}
              {/* Package Inclusions: Magnifique wedding at Sofitel bali Nusa Dua 20
            Luxury rooms, 2 nights stay including breakfast Event F&B Credit at
            IDR 250,000,000, stipulated based on actual number of guest
            Dedicated wedding specialist Package Inclusions: Magnifique wedding
            at Sofitel bali Nusa Dua 20 Luxury rooms, 2 nights stay including
            breakfast Event F&B Credit at IDR 250,000,000, stipulated based on
            actual number of guest Dedicated wedding specialist Package
            Inclusions: Magnifique wedding at Sofitel bali Nusa Dua 20 Luxury
            rooms, 2 nights stay including breakfast Event F&B Credit at IDR
            250,000,000, stipulated based on actual number of guest Dedicated
            wedding specialist */}
            </p>
          </div>
          <div className="border-b-2 py-2 w-full flex items-center text-[#00425A]">
            <img
              src={data?.getProductById?.Vendor?.vendorImgUrl}
              width={70}
              className="rounded-lg mr-4 my-4"
              alt=""
            />
            <div className="">
              <p className="text-lg">{data?.getProductById?.Vendor?.name}</p>
              <p className="text-sm font-light flex items-center">
                {data?.getProductById?.Category?.name} |{" "}
                <Rating
                  name="read-only size-small"
                  size="small"
                  value={3.5}
                  precision={0.5}
                  readOnly
                />
              </p>
              <button className="border-[1px] rounded px-[2px] flex justify-center mt-2 hover:bg-gray-50">
                <p className="text-[12px] font-[300]">Kunjungi Provil Vendor</p>
              </button>
            </div>
          </div>
          <div className="py-4 w-full flex flex-col justify-center">
            <div className="text-[18px]">TESTIMONI</div>
            <div className="max-w-full mt-2 flex overflow-auto py-2">
              {dataTestimoni?.getTestimonies.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="min-w-[300px] max-w-[300px] mx-2 rounded-lg border-[1px] h-[150px] flex flex-col p-2 h-full items-center"
                  >
                    <img
                      src={item?.User?.userImgUrl}
                      className="max-w-8 min-w-8 min-h-8 max-h-8 rounded-full"
                      alt=""
                    />
                    <p className="text-[12px] font w-full border-b-[1px] flex px-2 justify-center">
                      {item?.User?.name}
                    </p>
                    <div className="w-full h-full ml-4 flex-col flex justify-between items-center">
                      <p className="text-[10px] font-light">
                        {item?.testimony}
                      </p>
                      <Rating
                        name="read-only size-small"
                        size="small"
                        value={item?.rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>
                );
              })}
              {/* <div className="min-w-[300px] max-w-[300px] mx-2 rounded-lg border-[1px] h-[150px] flex flex-col p-2 h-full items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg" className="w-[50px] h-[50px] rounded-full" alt="" />
              <p className="text-[12px] font w-full border-b-[1px] flex px-2 justify-center">chandra44</p>
              <div className="w-full h-full ml-4 flex-col flex justify-between items-center">
                <p className="text-[10px] font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                <Rating name="read-only size-small" size="small" value={4} precision={0.5} readOnly />
              </div>
            </div> */}
            </div>
          </div>
        </div>

        <div className="w-[30%] flex items-center flex-col relative px-20">
          <div className="fixed w-[30%] px-10">
            <div className="mt-20 bg-white shadow-lg w-full rounded-lg h-[200px] flex flex-col p-6 justify-center">
              <p className="text-[14px] font-light">harga</p>
              <p className="pb-4 mt-2 border-b-2 text-xl">
                {formatRupiah(data?.getProductById?.price)} / pax
              </p>
              {/* <p className="text-[14px] font-light mt-2">kapasitas</p>
            <p className="pb-4 mt-2  text-xl">50 pax</p> */}
            </div>
            <div className="mt-4 bg-white shadow-lg w-full rounded-lg h-[60px] flex  p-6 justify-between items-center">
              <p className="text-[14px] font-light">Jumlah</p>
              <div className="w-[50%] flex items-center justify-end">
                <button
                  onClick={clickPlusNumber}
                  className="px-2 rounded-full mx-2 bg-[#645CBB] hover:bg-[#BFACE2]  text-white"
                >
                  +
                </button>
                <p className="p-2 rounded-full mx-2">{number}</p>
                <button
                  onClick={clickMinusNumber}
                  className="px-2 rounded-full mx-2 bg-[#645CBB] hover:bg-[#BFACE2] text-white"
                >
                  -
                </button>
              </div>
              {/* <input type="number" min="1" onChange={(e) => {
              setTotalPrice((+e.target.value * data?.getProductById?.price))
              setTotalDP((+e.target.value * data?.getProductById?.dpPrice))
              setFormOrder({
                ...formOrder,
                quantity: e.target.value
              })
            }}/> */}
            </div>
            <div className="mt-4  w-full rounded-lg h-[40px] flex flex-col items-center items-center">
              <div className="flex w-full">
                <button className="w-[50%] mx-2 bg-white text-[#00425A] border-[1px] border-[#BFACE2] hover:bg-[#A084DC] hover:text-white duration-200 h-[40px] rounded-lg flex items-center justify-center">
                  {" "}
                  <HiChatBubbleBottomCenterText className="mx-2" />
                  Chat
                </button>
                {localStorage.getItem("token") ? (
                  <button
                    onClick={handleOpen}
                    className="w-[50%] mx-2 bg-[#BFACE2] hover:bg-[#645CBB] duration-200 text-white h-[40px] rounded-lg flex items-center justify-center"
                  >
                    Pesan Sekarang
                  </button>
                ) : (
                  <button
                    onClick={toLogin}
                    className="w-[50%] mx-2 bg-[#BFACE2] hover:bg-[#645CBB] duration-200 text-white h-[40px] rounded-lg flex items-center justify-center"
                  >
                    Pesan Sekarang
                  </button>
                )}
              </div>
              <div className="flex w-full justify-center mt-2">
                <p className="text-[13px] font-light">
                  Chat untuk informasi lebi lanjut & kostumisasi produk
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduct;
