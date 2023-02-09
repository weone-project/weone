import mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React, { useRef, useEffect, useState } from 'react';
import '../index.css';
import { Link, useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation } from "@apollo/client";
import { POST_INVITATION } from "../queries/invitation";
import { client } from 'filestack-react';
import logo from '../assets/logo/Logo-l.png'

function Dashboard() {

const { id } = useParams()
const navigate = useNavigate()

  const [dataInvitation, setDataInvitation] = useState({
    quote: '',
    quote_src: '',
    bride: '',
    bride_img: '',
    bride_nick: '',
    bride_mother: '',
    bride_father: '',
    groom: '',
    groom_img: '',
    groom_nick: '',
    groom_mother: '',
    groom_father: '',
    matrimony_name: '',
    matrimony_date: '',
    matrimony_time_start: '',
    matrimony_time_end: '',
    ceremonial_name: '',
    ceremonial_date: '',
    ceremonial_time_start: '',
    ceremonial_time_end: '',
    map_location: '',
    photo: '',
    story: '',
    story_img: '',
    wallet_bank: '',
    wallet_no: '',
    wallet_owner: '',
    MusicId: 1,
    OrderId: '',
  });

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VydmVyMSIsImEiOiJjbGNzd3hwancwdTdxM3htc2duc240OXI2In0.Qy4ETg_Tjo9lCXDg52lXIQ';

  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: 'peta',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [106.82713178335916, -6.175423395624819],
      zoom: 12
    });
  });


  useEffect(() => {
    if (!map.current) return;

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Masukan kata kunci...',
      zoom: 18
    });

    map.current.addControl(geocoder);

    let marker = null

    map.current.on('click', function (e) {
      if (marker == null) {
        marker = new mapboxgl.Marker()
          .setLngLat(e.lngLat)
          .addTo(map.current);
      } else {
        marker.setLngLat(e.lngLat)
      }

      setDataInvitation({
        ...dataInvitation,
        map_location: e.lngLat.lat + "," + e.lngLat.lng
      })

      

  setDataInvitation({
    ...dataInvitation,
    OrderId: +id
  })

      document.getElementById("koordinat").value = e.lngLat.lat + "," + e.lngLat.lng;
    });
  });

  const [FormInvitation, { data: dataInvitationNew, error: errorLoginUser }] = useMutation(POST_INVITATION, {
    variables: {
      accessToken: localStorage.getItem('token')
    }
  });

  const invitationForm = (e) => {
    e.preventDefault();
    FormInvitation({
      variables: {
        form: dataInvitation
      }
    });
  };


  const MySwal = withReactContent(Swal)


  useEffect(() => {
    if (dataInvitationNew) {

      MySwal.fire({
        html: <i>Undangan Berhasil dibuat</i>,
        icon: 'success'
      })

      navigate('/dash')

    }
  }, [dataInvitationNew])


  function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'  })
  }

  function formatYear(date) {
    return new Date(date).toLocaleDateString('id-ID', { year: 'numeric' })
  }

  function formatMonth(date) {
    return new Date(date).toLocaleDateString('id-ID', { month: 'long' })
  }

  function formatDay(date) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'long' })
  }

  function formatDayn(date) {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric' })
  }

  const qrcode = ``


  function uploadGalery() {
    
  const options = {
    accept: 'image/*',
    fromSources: ['local_file_system'],
    maxSize: 1024 * 1024,
    maxFiles: 1,
    onFileUploadFinished(file) {
      let { url } = file
      setDataInvitation({
        ...dataInvitation,
        photo: url
      })
      console.log(url)
    }
  }

  const filestack_apikey = "A2kZq9JveTiSdFlTxAk1jz" //replace with your api key
  const filestack = client.init(filestack_apikey, options);
  const picker = filestack.picker(options);
    return picker.open();
  }

  
  function uploadStory() {
    
    const options = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
      onFileUploadFinished(file) {
        let { url } = file
        setDataInvitation({
          ...dataInvitation,
          story_img: url
        })
        console.log(url)
      }
    }
  
    const filestack_apikey = "A2kZq9JveTiSdFlTxAk1jz" //replace with your api key
    const filestack = client.init(filestack_apikey, options);
    const picker = filestack.picker(options);
      return picker.open();
    }

    
  function uploadBride() {
    
    const options = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
      onFileUploadFinished(file) {
        let { url } = file
        setDataInvitation({
          ...dataInvitation,
          bride_img: url
        })
        console.log(url)
      }
    }
  
    const filestack_apikey = "A2kZq9JveTiSdFlTxAk1jz" //replace with your api key
    const filestack = client.init(filestack_apikey, options);
    const picker = filestack.picker(options);
      return picker.open();
    }

    
  function uploadgroom() {
    
    const options = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
      onFileUploadFinished(file) {
        let { url } = file
        setDataInvitation({
          ...dataInvitation,
          groom_img: url
        })
        console.log(url)
      }
    }
  
    const filestack_apikey = "A2kZq9JveTiSdFlTxAk1jz" //replace with your api key
    const filestack = client.init(filestack_apikey, options);
    const picker = filestack.picker(options);
      return picker.open();
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
      <div>
        <div className="flex overflow-hidden bg-white pt-16">
          <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto">

            <div className=" w-full grid grid-cols-2 gap-x-8 gap-y-6">

              <div className="pt-6 h-screen overflow-y-scroll px-4">
                <div className="w-full ">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <p className="font-extrabold text-2xl">Buat Undangan</p>

                    <div className="mt-10">
                      <form>
                        <div className="mt-4">
                          <label className="mb-2.5 block font-extrabold">Quote / kalimat Pembuka</label>
                          <textarea id="message" rows="4"
                            className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                quote: e.target.value
                              })
                            }} placeholder="Kutipan"></textarea>
                          <input type="text" name="quote_src"
                            className="inline-block w-full rounded-xl mt-2 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                quote_src: e.target.value
                              })
                            }} placeholder="Sumber Kutipan" />
                        </div>
                        <div className="flex justify-center mt-5">
                          <div className="mt-4 w-1/2 mr-5">
                            <label className="mb-2.5 block font-extrabold">Mempelai Wanita</label>
                            
                            <img className="w-32 h-32 mb-2" src={!dataInvitation?.bride_img ? "https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" : dataInvitation?.bride_img} alt="" />
                          
                          <button type="button" onClick={uploadBride}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload Foto
                          </button>
                            <input type="text"
                              className="inline-block mt-2 w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  bride: e.target.value
                                })
                              }}
                              placeholder="Nama Lengkap" />
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  bride_nick: e.target.value
                                })
                              }}
                              placeholder="Nama Panggilan" />
                            {/* <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  bride_img: e.target.value
                                })
                              }}
                              placeholder="Url Image" /> */}
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  bride_mother: e.target.value
                                })
                              }}
                              placeholder="Nama Ibu" />
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  bride_father: e.target.value
                                })
                              }}
                              placeholder="Nama Ayah" />
                          </div>
                          <div className="mt-4  w-1/2">
                            <label className="mb-2.5 block font-extrabold">Mempelai Pria</label>
                            
                            <img className="w-32 h-32 mb-2" src={!dataInvitation?.groom_img ? "https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" : dataInvitation?.groom_img} alt="" />
                          
                          <button type="button" onClick={uploadgroom}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload Foto
                          </button>
                            <input type="text"
                              className="inline-block mt-2 w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  groom: e.target.value
                                })
                              }}
                              placeholder="Nama Lengkap" />
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  groom_nick: e.target.value
                                })
                              }}
                              placeholder="Nama Panggilan" />
                            {/* <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  groom_img: e.target.value
                                })
                              }}
                              placeholder="Url Image" /> */}
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  groom_mother: e.target.value
                                })
                              }}
                              placeholder="Nama Ibu" />
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  groom_father: e.target.value
                                })
                              }}
                              placeholder="Nama Ayah" />
                          </div>
                        </div>

                        <div className="flex justify-center mt-5">
                          <div className="mt-4 w-1/2 mr-5">
                            <label className="mb-2.5 block font-extrabold">Acara Akat/Pemberkatan</label>
                            <input type="text"
                              className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  matrimony_name: e.target.value
                                })
                              }}
                              placeholder="Nama Acara (default: Akad)" />
                            <input type="date"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  matrimony_date: e.target.value
                                })
                              }}
                              placeholder="Tangal Acara" />
                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  address_matrimony: e.target.value
                                })
                              }}
                              placeholder="Lokasi Acara" />
                            <input type="number"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  matrimony_time_start: +e.target.value
                                })
                              }}
                              placeholder="Waktu Mulai" />
                            <input type="number"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  matrimony_time_end: +e.target.value
                                })
                              }}
                              placeholder="Waktu Selesai" />
                          </div>
                          <div className="mt-4 w-1/2">
                            <label className="mb-2.5 block font-extrabold">Acara Resepsi</label>
                            <input type="text"
                              className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  ceremonial_name: e.target.value
                                })
                              }}
                              placeholder="Nama Acara (default: Resepsi)" />
                            <input type="date"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  ceremonial_date: e.target.value
                                })
                              }}
                              placeholder="Tangal Acara" />

                            <input type="text"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  address_ceremonial: e.target.value
                                })
                              }}
                              placeholder="Lokasi Acara" />
                            <input type="number"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  ceremonial_time_start: +e.target.value
                                })
                              }}
                              placeholder="Waktu Mulai" />
                            <input type="number"
                              className="inline-block w-full rounded-xl mt-4 bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                              onChange={(e) => {
                                setDataInvitation({
                                  ...dataInvitation,
                                  ceremonial_time_end: +e.target.value
                                })
                              }}
                              placeholder="Waktu Selesai" />
                          </div>
                        </div>
                        <div className=" mt-5">
                          <label className="mb-2.5 block font-extrabold">Lokasi Acara</label>

                          <div id="peta" className="peta w-full h-[500px] rounded-md"></div>
                          <input type="text" id="koordinat"
                            className=" w-full hidden rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            // onChange={(e) => {
                            //   setDataInvitation({
                            //     ...dataInvitation,
                            //     map_location: e.target.value
                            //   })
                            // }}
                            placeholder="Masukan Alamat" />
                        </div>
                        <div className=" mt-5">

                          <label className="mb-2.5 block font-extrabold">Galeri Foto</label>
                        <img className="w-32 h-32 mb-2" src={!dataInvitation?.photo ? "https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" : dataInvitation?.photo} alt="" />
                          
                          <button type="button" onClick={uploadGalery}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload Foto
                          </button>
                        </div>
                        <div className=" mt-5">
                          <label className="mb-2.5 block font-extrabold">Kisah Cinta</label>
                          <input type="text"
                            className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                story: e.target.value
                              })
                            }}
                            placeholder="Kisah Cinta" />
                        </div>
                        <div className=" mt-5">
                          <label className="mb-2.5 block font-extrabold">Foto Story</label>
                          {/* <input type="text"
                            className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                story_img: e.target.value
                              })
                            }}
                            placeholder="Foto Story" /> */}
                            <img className="w-32 h-32 mb-2" src={!dataInvitation?.story_img ? "https://icons-for-free.com/iconfiles/png/512/cloud+upload+file+storage+upload+icon-1320190558968694328.png" : dataInvitation?.story_img} alt="" />
                          
                          <button type="button" onClick={uploadStory}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upload Foto
                          </button>
                        </div>
                        <div className=" mt-5">
                          <label className="mb-2.5 block font-extrabold">Dompet Digital</label>
                          <input type="text"
                            className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                wallet_bank: e.target.value
                              })
                            }}
                            placeholder="Nama Bank/Dompet Digital" />
                          <input type="number"
                            className="inline-block w-full mt-4 rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                wallet_no: +e.target.value
                              })
                            }}
                            placeholder="Nomor Rekening" />
                          <input type="text"
                            className="inline-block w-full mt-4 rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-pink-300"
                            onChange={(e) => {
                              setDataInvitation({
                                ...dataInvitation,
                                wallet_owner: e.target.value
                              })
                            }} placeholder="Pemilik Rekening" />
                        </div>
                        <div className=" mt-5">
                          <label className="mb-2.5 block font-extrabold">Musik</label>
                          <select onChange={(e) => {
                            setDataInvitation({
                              ...dataInvitation,
                              MusicId: +e.target.value
                            })
                          }}
                            className="rounded-lg  shadow focus:outline-none focus:ring focus:ring-pink-300 block w-full p-2.5">
                            <option > 1</option>
                          </select>

                        </div>

                        <button className="w-full items-center justify-center flex mt-8 bg-[#00425A] hover:bg-[#674188] duration-200 h-[40px] text-white rounded-lg" onClick={invitationForm}>
                          <p className="">Save</p>
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
              <div className="pt-6 h-screen overflow-y-scroll px-4">
                {/* <iframe className="h-[100%]  w-full" src="http://localhost:3000/prev"></iframe> */}
                <div>
                  <div>
                    <div className="shadow-lg h-screen">
                      <div className="flex-wrap relative h-full">
                        <div className="absolute w-full h-full z-10 bg-gradient-to-t from-white to-transparent">
                        </div>
                        <img className="w-full h-full object-cover object-top z-10" src={!dataInvitation?.photo ? "https://img.freepik.com/free-vector/green-purple-colourful-wedding-invitation-background-multipurpose-card-free-vector_1340-21784.jpg?w=2000" : dataInvitation?.photo} alt="" />
                        <div className="absolute w-full bottom-16">
                          <p
                            className="relative w-full text-center font-bold tracking-wider text-sm uppercase py-4 z-10 text-black">
                            The Wedding Of</p>
                          <p
                            className="nameWed text-5xl relative w-full text-center text-5xl tracking-wide z-10 md:text-7xl text-black">
                            {!dataInvitation?.groom_nick ? "Putri" : dataInvitation?.groom_nick}
                            <span className="mx-4">&amp;</span>
                            {!dataInvitation?.bride_nick ? "Putra" : dataInvitation?.bride_nick}
                          </p>
                          <p
                            className="relative w-full text-center font-bold tracking-wider text-lg uppercase py-4 z-10 #949494">
                            {formatDate(!dataInvitation?.ceremonial_date ? Date.now() : dataInvitation?.ceremonial_date)} </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 ">
                      <div className="relative">
                        <img className="absolute  z-10 top-0 left-0"
                          src="https://api.paleo.id/uploads/themes/decorations/f2-0r.png" alt="" />
                        <img className="absolute z-10 bottom-0 right-0"
                          src="https://api.paleo.id/uploads/themes/decorations/f2-2r.png" alt="" />
                        <div className="py-8 pt-24 mx-auto max-w-lg">
                          <h2 className="text-center text-[#122851] text-3xl sm:text-4xl aos-init aos-animate"
                            data-aos="zoom-in-up" data-aos-duration="1000">Wedding Invitation</h2>
                          <p data-aos="zoom-in-up" data-aos-duration="1000"
                            className="text-center font-light text-sm sm:text-base text-gray-700 tracking-wide aos-init aos-animate">
                            {dataInvitation?.quote}</p>
                          <p data-aos="zoom-in-up" data-aos-duration="1000"
                            className="text-center font-semibold text-sm sm:text-base text-gray-700 aos-init aos-animate">
                            {dataInvitation?.quote_src}</p>
                        </div>
                        <div name="brideGroomContainer" className="py-8 px-4 mx-auto max-w-sm">
                          <div className="flex w-4/4 mx-auto">
                            <img className="object-cover object-top w-[100px] h-[100px] border-2 border-[#122851] rounded-full shadow-lg aos-init aos-animate"
                              src={!dataInvitation?.groom_img ? "https://ionicframework.com/docs/img/demos/avatar.svg" : dataInvitation?.groom_img } alt="Male" data-aos="fade-right" />
                            <div className="pl-6">
                              <p className="nameWed text-5xl">
                                {dataInvitation?.groom_nick}</p>
                              <p className="font-light text-sm sm:text-base pb-2">{dataInvitation?.groom}</p>
                              <p className="font-light text-sm sm:text-base">Putra dari</p>
                              <p className="font-light text-sm sm:text-base">{dataInvitation?.groom_father} &amp;</p>
                              <p className="font-light text-sm sm:text-base">{dataInvitation?.groom_mother}</p>
                            </div>
                          </div>
                          <div className="flex w-4/4 mx-auto">
                            <img className="object-cover w-[100px] h-[100px] border-2 border-[#122851]  rounded-full shadow-lg aos-init aos-animate"
                              src={!dataInvitation?.bride_img  ?"https://ionicframework.com/docs/img/demos/avatar.svg" : dataInvitation?.bride_img } alt="Male" data-aos="fade-right" />
                            <div className="pl-6">
                              <p className="nameWed text-5xl">
                                {dataInvitation?.bride_nick}</p>
                              <p className="font-light text-sm sm:text-base pb-2">{dataInvitation?.bride}</p>
                              <p className="font-light text-sm sm:text-base">Putri dari</p>
                              <p className="font-light text-sm sm:text-base">{dataInvitation?.bride_father}
                                &amp;</p>
                              <p className="font-light text-sm sm:text-base">{dataInvitation?.bride_mother}</p>
                            </div>
                          </div>
                        </div>
                        <div name="eventsContainer" className="pb-16">
                          <div className="py-8  px-[20%] ">
                            <h2 className="text-center text-3xl sm:text-4xl aos-init aos-animate mb-2"
                              data-aos="zoom-in-up" data-aos-duration="1000">{dataInvitation?.matrimony_name}</h2>

                            <div className="px-2 flex justify-center aos-init aos-animate" data-aos="zoom-in-up"
                              data-aos-duration="1000">
                              <div className="relative w-min">
                                <div className="top-6 right-16 w-max absolute">
                                  <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 tracking-widest"
                                  >{
                                      formatDay(dataInvitation?.matrimony_date)
                                    }</p>
                                </div>
                                <p className="text-md text-center uppercase text-gray-700 tracking-wide"
                                >{
                                    formatMonth(!dataInvitation?.matrimony_date ? Date.now() : dataInvitation?.matrimony_date)
                                  }</p>
                                <p className="text-3xl font-semibold text-center text-gray-700 tracking-wide">{
                                  formatDayn(!dataInvitation?.matrimony_date ? Date.now() : dataInvitation?.matrimony_date)
                                }</p>
                                <p className="text-2xl sm:text-base text-center text-gray-700 tracking-wide">{
                                  formatYear(!dataInvitation?.matrimony_date ? Date.now() : dataInvitation?.matrimony_date)
                                }</p>
                                <div className="top-6 left-16 w-max absolute">
                                  <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 text-gray-700 tracking-wide"
                                  >{
                                      dataInvitation?.matrimony_time_start
                                    }:00 - {dataInvitation?.matrimony_time_end}:00</p>
                                </div>
                              </div>
                            </div>
                            <p data-aos="zoom-in-up" data-aos-duration="1000"
                              className="text-center max-w-lg mx-auto font-light white-space text-sm sm:text-base px-6 pt-2 text-gray-700 tracking-wide aos-init aos-animate">
                              {dataInvitation?.address_matrimony}</p>
                          </div>
                          <div className="py-8 px-[20%]">
                            <h2 className="text-center text-3xl sm:text-4xl aos-init aos-animate mb-2"

                              data-aos="zoom-in-up" data-aos-duration="1000">{dataInvitation?.ceremonial_name}</h2>

                            <div className="px-2 flex justify-center aos-init aos-animate" data-aos="zoom-in-up"
                              data-aos-duration="1000">
                              <div className="relative w-min">
                                <div className="top-6 right-16 w-max absolute">
                                  <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 tracking-widest"
                                  >{
                                      formatDay(!dataInvitation?.ceremonial_date ? Date.now() : dataInvitation?.ceremonial_date)
                                    }</p>
                                </div>
                                <p className="text-md text-center uppercase text-gray-700 tracking-wide"
                                >{
                                    formatMonth(!dataInvitation?.ceremonial_date ? Date.now : dataInvitation?.ceremonial_date)
                                  }</p>
                                <p className="text-3xl font-semibold text-center text-gray-700 tracking-wide">{
                                  formatDayn(!dataInvitation?.ceremonial_date ? Date.now() : dataInvitation?.ceremonial_date)
                                }</p>
                                <p className="text-2xl sm:text-base text-center text-gray-700 tracking-wide">{
                                  formatYear(!dataInvitation?.ceremonial_date ? Date.now() : dataInvitation?.ceremonial_date)
                                }</p>
                                <div className="top-6 left-16 w-max absolute">
                                  <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 text-gray-700 tracking-wide"
                                  >{
                                      dataInvitation?.ceremonial_time_start
                                    }:00 - {dataInvitation?.ceremonial_time_end}:00</p>
                                </div>
                              </div>
                            </div>
                            <p data-aos="zoom-in-up" data-aos-duration="1000"
                              className="text-center  max-w-lg mx-auto font-light white-space text-sm sm:text-base px-6 pt-2 text-gray-700 tracking-wide aos-init aos-animate">
                              {dataInvitation?.address_ceremonial}</p>
                          </div>
                        </div>
                      </div>
                      <div name="locationContainer" className="py-8 px-8 pt-24">
                        <div className="mx-auto w-[80%] h-80 md:h-96  bg-gray-400 aos-init aos-animate" data-aos="zoom-in-up"
                          data-aos-duration="1000">
                          <div className="h-full w-full">
                            <iframe src="https://maps.google.com/maps?q=-6.153017797692939,106.85972787624195&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed" width="100%" height="100%" loading="lazy"></iframe>
                            {/* <iframe src={map} width="100%" height="100%" loading="lazy"></iframe> */}
                          </div>
                        </div>
                        <div className="flex pt-8">
                          <a target="_blank"
                            className="mx-auto rounded-lg border-[#122851] inline-flex items-center justify-center px-2 py-2 border border-transparent text-sm sm:text-base font-medium text-white bg-gray-700 aos-init aos-animate"
                            href={`https://www.google.com/maps/search/?api=1&amp;query=-6.153017797692939,100.85972787624195`}
                            // href={location}
                            rel="noreferrer" data-aos="zoom-in-up" data-aos-duration="1000">Buka di Google Map
                          </a>
                        </div>
                        <div className="pt-8 px-[20%]">
                          <p className="text-center white-space font-light text-sm sm:text-base text-gray-700 tracking-wide aos-init aos-animate"
                            data-aos="zoom-in-up" data-aos-duration="1000">Tanpa
                            mengurangi rasa hormat, untuk setiap tamu undangan yang akan hadir wajib mematuhi
                            protokol kesehatan yang dianjurkan oleh pemerintah.</p>
                          <p className="text-center font-light text-sm sm:text-base text-gray-700 tracking-wide aos-init aos-animate"
                            data-aos="zoom-in-up" data-aos-duration="1000">Pastikan
                            kondisi badan dalam keadaan sehat saat hadir di acara. Terima kasih atas partisipasi
                            Bapak/Ibu/Saudara/i.</p>
                        </div>
                      </div>
                      <div className="pb-8">
                        <div className="py-8 px-4 mx-auto max-w-sm">
                          <h2 className="text-center text-3xl sm:text-4xl value type name multiplier aos-init aos-animate"
                            data-aos="zoom-in-up" data-aos-delay="100">Galeri</h2>
                          <div className="lg-react-element grid grid-cols-3 gap-1">
                            <a data-aos="zoom-in" data-src="dataInvitation.photo"
                              data-lg-id="761d6d26-efd1-437c-a45b-b5d18c70df13" className="aos-init aos-animate">

                              <img className="h-44 w-28 max-h-28 mx-auto border-white shadow-lg object-cover"
                                src={!dataInvitation?.photo ? "https://ionicframework.com/docs/img/demos/avatar.svg" : dataInvitation?.photo} alt="Galeri" />
                            </a>
                          </div>
                        </div>
                        <div className="py-8 px-8 mx-auto max-w-auto pt-16">
                          <h2 className="text-center mb-5 text-[#122851] text-3xl sm:text-4xl">Cerita Kami</h2>
                          <div className="flex flex-col items-center text-center text-gray-50">
                            <div className="flex contents">
                              <div className="col-start-1 col-end-2 ml-4 mr-4 md:mx-auto relative">
                                <div className="">
                                  <div className="h-full pointer-events-none bg-[#122851]">
                                  </div>
                                </div>
                                <div
                                  className="w-6 h-6 bg-[#122851] absolute top-1/2 -mt-3 rounded-full shadow text-center justify-center flex items-center">
                                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24"
                                    height="24" className="text-white h-4 w-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                                    </path>
                                  </svg>
                                </div>
                              </div>
                              <div>
                                <div className="px-[20%]  mr-auto w-full text-black">
                                  <img src={dataInvitation?.photo} className="w-100 rounded-xl mb-2" />
                                  <h4 className="text-lg font-semibold mb-2 text-gray-700 tracking-wide">Perkenalan
                                  </h4>
                                  <div className="text-center">

                                    <p className="font-light text-center text-sm sm:text-base-wide mb-6">
                                      {dataInvitation?.story}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div >
                      <div className="relative">
                        <img className="absolute  z-10 top-0 left-0"
                          src="https://api.paleo.id/uploads/themes/decorations/f2-0r.png" alt="" />
                        <img className="absolute z-10 bottom-0 right-0"
                          src="https://api.paleo.id/uploads/themes/decorations/f2-2r.png" alt="" />
                        <div className="py-8">
                          <div name="banksContainer">
                            <div className="py-8 pt-12 px-8 lg:px-0 mx-auto max-w-xs">
                              <h2 className="text-center text-[#122851] text-3xl sm:text-4xl aos-init aos-animate"
                                data-aos="zoom-in-up" data-aos-duration="1000">Berikan Hadiah</h2>
                              <p data-aos="zoom-in-up" data-aos-duration="1000"
                                className="text-center font-light text-sm sm:text-base aos-init aos-animate">
                                Tanpa mengurangi rasa hormat, untuk melengkapi
                                kebahagiaan pengantin, Anda dapat memberikan tanda kasih melalui nomor
                                rekening / dompet digital berikut ini
                              </p>

                              <div className="">
                                <div className="mx-auto">
                                  <p className="text-center font-bold text-sm sm:text-base text-gray-600 aos-init aos-animate"
                                    data-aos="zoom-in-up" data-aos-duration="1000">
                                    {dataInvitation?.wallet_bank} An. {dataInvitation?.wallet_owner}</p>
                                  <p data-aos="zoom-in-up" data-aos-duration="1000"
                                    className="text-center rounded-lg border-[#122851] text-sm mt-4 sm:text-base px-4 py-2 border text-gray-600 font-bold aos-init aos-animate">
                                    {dataInvitation?.wallet_no}
                                  </p>

                                </div>
                              </div>
                            </div>
                          </div>

{/* 
                          <img className="mx-auto w-40 h-40" id='barcode'
                            src={qrcode} alt="" />
                          <p className="text-center mt-5">Tunjukan QR CODE ini  untuk isi buku tamu online</p> */}

                          <div name="guestContainer" className="py-8 px-8 lg:px-4 mx-auto max-w-lg pt-16">
                            <h2 className="text-center text-[#122851] text-3xl sm:text-4xl aos-init aos-animate"
                              data-aos="zoom-in-up" data-aos-duration="1000">Kirim Ucapan dan Do'a</h2>
                            <div className="flex justify-center">

                              <form className="w-full" >
                                <div className="mt-2"   >
                                  <input type="text"
                                    className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Nama" />
                                </div>
                                <div className="mt-2">
                                  <select v-model="greet.presence"
                                    className="rounded-lg  shadow focus:outline-none focus:ring focus:ring-blue-300 block w-full p-2.5">
                                    <option selected disabled>Kehadiran</option>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Tidak Hadir">Tidak Hadir</option>
                                  </select>
                                </div>
                                <div className="mt-2">
                                  <textarea v-model="greet.greeting" placeholder="Kirim ucapan dan doa" id="message" className="inline-block w-full rounded-xl bg-white p-2.5 leading-none text-black placeholder-stone-500 shadow focus:outline-none focus:ring focus:ring-blue-300" rows="3"></textarea>
                                </div>
                                <div className="my-4">
                                  <button type="submit"
                                    className="rounded-lg  bg-blue-900 shadow  text-white focus:outline-none focus:ring focus:ring-blue-300 block w-full p-2.5 aos-init aos-animate"
                                    data-aos="zoom-in-up" data-aos-duration="1000" disabled>kirim Ucapan</button>
                                </div>
                              </form>

                            </div>
                          </div>
                          <div className="py-8 px-4">
                            <p className="text-center text-2xl">Thank You!</p>
                            <p className="text-center font-light text-sm mt-2">Build with ❤️ by
                            </p>
                            <div className="flex justify-center mt-2">
                              {/* <img src={require('../../assets/logo/Logo-l.png')} width="200" alt="" /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-center text-sm text-gray-500 my-10">
              &copy; 2023 <a href="#" className="hover:underline">Wedding One</a>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;