import { GET_INV_BY_ID } from '../../queries/invitation';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { React } from 'react';
import { useState } from "react";


function TemaAdd() {


        const [showModal, setShowModal] = useState(false);

        function formatDate(date) {
            return new Date(date).toLocaleDateString('id', 'ID')
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

        const { id } = useParams()
        const { data, loading, error } = useQuery(GET_INV_BY_ID, {
            variables: {
                getInvitationByIdId: id
            }
        })

        const inv = data?.getInvitationById
        const qrcode = `https://api.qrserver.com/v1/create-qr-code/?data=${id}`


        if (error) {
            return (
                <p className="text-lg text-red-500 pl-2 font-sm w-full capitalize mx-auto"> Error</p>
            )
        }

        let map = "https://maps.google.com/maps?q=-6.153017797692939,106.85972787624195&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        let location = "https://www.google.com/maps/search/?api=1&amp;query=-6.153017797692939,106.85972787624195"
        function playAudio(url) {
            new Audio(url).play();
        }


        let search = window.location.search;
        let params = new URLSearchParams(search);
        let guest = params.get('to');
        return (
            <>
                {showModal ? (
                    <>
                        <section name="fade">
                            <div id="modal" style={{
                                backgroundImage: `url(${inv?.photo})`
                            }}
                                className="overflow-x-hidden   bg-cover  bg-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none items-end">

                                <div className="absolute w-full h-full z-10 bg-gradient-to-t from-white to-transparent">
                                </div>
                                <div className="relative z-10 w-auto my-6 mx-auto max-w-3xl">
                                    <div
                                        className="border-0 mb-5 px-5  relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                                        <div>
                                            <p className="flex text-xl font-serif font-semibold items-center justify-center">Wedding Of</p>
                                            <div className="flex  items-center justify-center rounded-t">
                                                <h3 className="text-3xl font-serif text-center text-black font-semibold">
                                                    {inv?.groom_nick} <span className="mx-4">&amp;</span>
                                                    {inv?.bride_nick}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="relative p-3 text-center flex-auto">
                                            <p className="my-4 text-lg">
                                                Kepada Yth. Bapak/Ibu/Saudara/i
                                            </p>
                                            <p className="font-bold text-xl" >
                                                {guest} </p>
                                            <p className="my-4 text-md">
                                                ditempat
                                            </p>
                                            <p className="text-sm mt-5 mx-auto  w-[60%]"
                                            >
                                                *Mohon maaf apabila ada kesalahan pada
                                                penulisan nama dan gelar
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center p-6 rounded-b">
                                            <button onClick={() => {
                                                setShowModal(false)
                                                new Audio(inv?.Music.song_src).play();
                                            }}
                                                className="bg-[#122851] text-white hover:bg-[#1a73e8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button" >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" className="w-6 h-6 inline-block">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                                                </svg>
                                                <span> Buka Undangan</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : null}


                <div>
                    <div>
                        <div className="shadow-lg h-screen">
                            <div className="flex-wrap relative h-full">
                                <div className="absolute w-full h-full z-10 bg-gradient-to-t from-white to-transparent">
                                </div>
                                <img className="w-full h-full object-cover object-top z-10" src={inv?.photo} alt="" />
                                <div className="absolute w-full bottom-16">
                                    <p
                                        className="relative w-full text-center font-bold tracking-wider text-sm uppercase py-4 z-10 text-black">
                                        The Wedding Of</p>
                                    <p
                                        className="relative w-full text-center text-5xl tracking-wide z-10 md:text-7xl text-black">
                                        {inv?.groom_nick}
                                        <span className="mx-4">&amp;</span>
                                        {inv?.bride_nick}
                                    </p>
                                    <p
                                        className="relative w-full text-center font-bold tracking-wider text-lg uppercase py-4 z-10 #949494">
                                        {formatDate(inv?.ceremonial_date)} </p>
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
                                        {inv?.quote}</p>
                                    <p data-aos="zoom-in-up" data-aos-duration="1000"
                                        className="text-center font-semibold text-sm sm:text-base text-gray-700 aos-init aos-animate">
                                        {inv?.quote_src}</p>
                                </div>
                                <div name="brideGroomContainer" className="py-8 px-4 mx-auto max-w-sm">
                                    <div className="flex w-4/4 mx-auto">
                                        <img className="object-cover object-top w-[100px] h-[100px] border-2 border-[#122851] rounded-full shadow-lg aos-init aos-animate"
                                            src={inv?.groom_img} alt="Male" data-aos="fade-right" />
                                        <div className="pl-6">
                                            <p className="text-4xl">
                                                {inv?.groom_nick}</p>
                                            <p className="font-light text-sm sm:text-base pb-2">{inv?.groom}</p>
                                            <p className="font-light text-sm sm:text-base">Putra dari</p>
                                            <p className="font-light text-sm sm:text-base">{inv?.groom_father} &amp;</p>
                                            <p className="font-light text-sm sm:text-base">{inv?.groom_mother}</p>
                                        </div>
                                    </div>
                                    <div className="flex w-4/4 mx-auto">
                                        <img className="object-cover w-[100px] h-[100px] border-2 border-[#122851]  rounded-full shadow-lg aos-init aos-animate"
                                            src={inv?.bride_img} alt="Male" data-aos="fade-right" />
                                        <div className="pl-6">
                                            <p className="text-4xl">
                                                {inv?.bride_nick}</p>
                                            <p className="font-light text-sm sm:text-base pb-2">{inv?.bride}</p>
                                            <p className="font-light text-sm sm:text-base">Putri dari</p>
                                            <p className="font-light text-sm sm:text-base">{inv?.bride_father}
                                                &amp;</p>
                                            <p className="font-light text-sm sm:text-base">{inv?.bride_mother}</p>
                                        </div>
                                    </div>
                                </div>
                                <div name="eventsContainer" className="pb-16">
                                    <div className="py-8  px-[20%] ">
                                        <h2 className="text-center text-3xl sm:text-4xl aos-init aos-animate mb-2"
                                            data-aos="zoom-in-up" data-aos-duration="1000">{inv?.matrimony_name}</h2>

                                        <div className="px-2 flex justify-center aos-init aos-animate" data-aos="zoom-in-up"
                                            data-aos-duration="1000">
                                            <div className="relative w-min">
                                                <div className="top-6 right-16 w-max absolute">
                                                    <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 tracking-widest"
                                                    >{
                                                            formatDay(inv?.matrimony_date)
                                                        }</p>
                                                </div>
                                                <p className="text-md text-center uppercase text-gray-700 tracking-wide"
                                                >{
                                                        formatMonth(inv?.matrimony_date)
                                                    }</p>
                                                <p className="text-3xl font-semibold text-center text-gray-700 tracking-wide">{
                                                    formatDayn(inv?.matrimony_date)
                                                }</p>
                                                <p className="text-2xl sm:text-base text-center text-gray-700 tracking-wide">{
                                                    formatYear(inv?.matrimony_date)
                                                }</p>
                                                <div className="top-6 left-16 w-max absolute">
                                                    <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 text-gray-700 tracking-wide"
                                                    >{
                                                            inv?.matrimony_time_start
                                                        }:00 - {inv?.matrimony_time_end}:00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p data-aos="zoom-in-up" data-aos-duration="1000"
                                            className="text-center max-w-lg mx-auto font-light white-space text-sm sm:text-base px-6 pt-2 text-gray-700 tracking-wide aos-init aos-animate">
                                            {inv?.address_matrimony}</p>
                                    </div>
                                    <div className="py-8 px-[20%]">
                                        <h2 className="text-center text-3xl sm:text-4xl aos-init aos-animate mb-2"

                                            data-aos="zoom-in-up" data-aos-duration="1000">{inv?.ceremonial_name}</h2>

                                        <div className="px-2 flex justify-center aos-init aos-animate" data-aos="zoom-in-up"
                                            data-aos-duration="1000">
                                            <div className="relative w-min">
                                                <div className="top-6 right-16 w-max absolute">
                                                    <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 tracking-widest"
                                                    >{
                                                            formatDay(inv?.ceremonial_date)
                                                        }</p>
                                                </div>
                                                <p className="text-md text-center uppercase text-gray-700 tracking-wide"
                                                >{
                                                        formatMonth(inv?.ceremonial_date)
                                                    }</p>
                                                <p className="text-3xl font-semibold text-center text-gray-700 tracking-wide">{
                                                    formatDayn(inv?.ceremonial_date)
                                                }</p>
                                                <p className="text-2xl sm:text-base text-center text-gray-700 tracking-wide">{
                                                    formatYear(inv?.ceremonial_date)
                                                }</p>
                                                <div className="top-6 left-16 w-max absolute">
                                                    <p className="text-xs w-28 font-light text-center uppercase border-t border-b border-gray-900 py-2 px-2 text-gray-700 tracking-wide"
                                                    >{
                                                            inv?.ceremonial_time_start
                                                        }:00 - {inv?.ceremonial_time_end}:00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p data-aos="zoom-in-up" data-aos-duration="1000"
                                            className="text-center  max-w-lg mx-auto font-light white-space text-sm sm:text-base px-6 pt-2 text-gray-700 tracking-wide aos-init aos-animate">
                                            {inv?.address_ceremonial}</p>
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
                                                src={inv?.photo} alt="Galeri" />
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
                                                    <img src={inv?.photo} className="w-100 rounded-xl mb-2" />
                                                    <h4 className="text-lg font-semibold mb-2 text-gray-700 tracking-wide">Perkenalan
                                                    </h4>
                                                    <div className="text-center">

                                                        <p className="font-light text-center text-sm sm:text-base-wide mb-6">
                                                            {inv?.story}
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
                                                        {inv?.wallet_bank} An. {inv?.wallet_owner}</p>
                                                    <p data-aos="zoom-in-up" data-aos-duration="1000"
                                                        className="text-center rounded-lg border-[#122851] text-sm mt-4 sm:text-base px-4 py-2 border text-gray-600 font-bold aos-init aos-animate">
                                                        {inv?.wallet_no}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <img className="mx-auto w-40 h-40" id='barcode'
                                        src={qrcode} alt="" />
                                    <p className="text-center mt-5">Tunjukan QR CODE ini  untuk isi buku tamu online</p>

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
                                                        data-aos="zoom-in-up" data-aos-duration="1000">kirim Ucapan</button>
                                                </div>
                                            </form>

                                        </div>
                                        <div className="  overflow-hidden overflow-y-scroll  space-y-3 aos-init aos-animate"
                                            data-aos="zoom-in-up" data-aos-duration="1000"
                                            v-for="greet in dataInvitation.Greets">
                                            {inv?.Greets.map(e => {
                                                return (
                                                    <div className="relative flex items-start space-x-3">
                                                        <div className="relative">
                                                            <span
                                                                className="flex mx-auto mb-4 items-center justify-center h-8 w-8 rounded-full bg-gray-400">
                                                                <span className="text-sm sm:text-base font-normal leading-none text-white">
                                                                    {e.greet}
                                                                </span></span>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div>
                                                                <div className="text-md flex justify-start">
                                                                    <p className="font-bold text-gray-900 tracking-wide mr-2">
                                                                        {e.guest}
                                                                    </p> <span className="bg-blue-200 rounded-sm p-[2px]">
                                                                        {e.presence}
                                                                    </span>
                                                                </div>
                                                                <p className="font-sm text-gray-900 tracking-wide mr-2">
                                                                    {formatDate(e.date)}
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 font-light text-md text-gray-700 tracking-wide">
                                                                <p>
                                                                    {e.greeting}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                    <div className="py-8 px-4">
                                        <p className="text-center text-2xl">Thank You!</p>
                                        <p className="text-center font-light text-sm mt-2">Build with ❤️ by
                                        </p>
                                        <div className="flex justify-center mt-2">
                                            <img src={require('../../assets/logo/Logo-l.png')} width="200" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        );
    }

    export default TemaAdd;
