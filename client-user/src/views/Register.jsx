import { Link, useNavigate } from "react-router-dom";
import {
  HiChatBubbleLeftEllipsis,
  HiEnvelope,
  HiLockClosed,
  HiUser,
  HiPhone,
  HiHome
} from "react-icons/hi2";
import bride from "../bride.png";
import logo from "../assets/logo/Logo-l.png";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../queries/user";

const Register = () => {
  const navigate = useNavigate()
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [dataUser, { loading, error }] = useMutation(REGISTER_USER)

  const submitRegister = (e) => {
    e.preventDefault();
    dataUser({
      variables: {
        form: dataRegister
      }
    })
    navigate('/login')
  }
  return (
    <>
      <section className="fixed flex w-full border-b-[1px] bg-white shadow-md z-20">
        <div className="flex w-full mx-[70px] justify-between items-center h-14">
          <div className="h-full flex items-center">
            <Link to={"/"} className="judul">
              <img src={logo} alt="" width={120} />
            </Link>
          </div>
          <div className="h-10 flex h-full">
            <div className="flex mx-8 font-light h-full ">
              <Link to={"/products"}>
                <button className="mx-4 hover:border-b-2 hover:border-[#00425A] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#00425A] h-full duration-300">
                  Products
                </button>
              </Link>
              <button className="mx-4 hover:border-b-2 hover:border-[#00425A] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#00425A] h-full duration-300">
                Invitations
              </button>
              <button className="mx-4 hover:border-b-2 hover:border-[#00425A] border-b-2 border-white font-[500] focus:border-b-2 focus:border-[#00425A] h-full duration-300">
                Favorite
              </button>
            </div>
          </div>
          <div className="flex mx-8">
            <button className="mx-2 text-xl">
              <HiChatBubbleLeftEllipsis />
            </button>
            <button className="mx-2 w-8">
              {" "}
              <img src={bride} alt="" />
            </button>
          </div>
        </div>
      </section>
      <section className="pt-14 w-full min-h-[100vh]">
        <div className="w-full flex px-[300px] mt-[50px] justify-center">
          <div className="w-[50%] bg-white shadow rounded-lg flex flex-col">
            <div className="w-full p-10 h-[90%]">
              <div className="w-full mt-2 mb-6">
                <p className="text-xl font-semibold">REGISTER</p>
              </div>
              <div className="w-full">
                {/* FORM */}
              <form action="">
                <div className="w-full flex flex-col">
                  <p className="text-sm">username</p>
                  <div className="relative group flex mt-[1px]">
                    <HiUser className="absolute text-[#00425A] top-[12px] left-[7px]" />
                    <input
                      className="pl-10 duration-300 focus:outline-none outline-none focus:border-[#00425A] border-b-2 w-full py-2 font-light"
                      type="text"
                      placeholder="username"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          name: e.target.value,
                        });
                      }}
                      
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col mt-4">
                  <p className="text-sm">email</p>
                  <div className="relative group flex mt-[1px]">
                    <HiEnvelope className="absolute text-[#00425A] top-[12px] left-[7px]" />
                    <input
                      className="pl-10 duration-300 focus:outline-none outline-none focus:border-[#00425A] border-b-2 w-full py-2 font-light"
                      type="text"
                      placeholder="email address"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col mt-4">
                  <p className="text-sm">password</p>
                  <div className="relative group flex mt-[1px]">
                    <HiLockClosed className="absolute text-[#00425A] top-[12px] left-[7px]" />
                    <input
                      className="pl-10 duration-300 focus:outline-none outline-none focus:border-[#00425A] border-b-2 w-full py-2 font-light"
                      type="password"
                      placeholder="password"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col mt-4">
                  <p className="text-sm">phone number</p>
                  <div className="relative group flex mt-[1px]">
                    <HiPhone className="absolute text-[#00425A] top-[12px] left-[7px]" />
                    <input
                      className="pl-10 duration-300 focus:outline-none outline-none focus:border-[#00425A] border-b-2 w-full py-2 font-light"
                      type="text"
                      placeholder="phone number"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          phone: e.target.value,
                        });

                      }}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col mt-4">
                  <p className="text-sm">Address</p>
                  <div className="relative group flex mt-[1px]">
                    <HiHome className="absolute text-[#00425A] top-[12px] left-[7px]" />
                    <input
                      className="pl-10 duration-300 focus:outline-none outline-none focus:border-[#00425A] border-b-2 w-full py-2 font-light"
                      type="text"
                      placeholder="address"
                      name=""
                      id=""
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          address: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <button onClick={submitRegister} className="w-full items-center justify-center flex mt-8 bg-[#645CBB] hover:bg-[#674188] duration-200 h-[40px] text-white rounded-lg">
                  <p className="">Register</p>
                </button>
              </form>
              <div className="w-full flex justify-center text-[14px] mt-4">
                <p>Back to <Link to={'/login'} className="text-red-700 hover:underline">Login</Link></p>
              </div>
              </div>
            </div>
            <div className="w-full bg-gray-100 h-[10%] rounded-b-lg flex items-center justify-center mt-4">
                <div className="text-[12px]">Punya bisnis terkait pernikahan? <a href="" className="text-red-700 hover:underline">bergabung sebagai vendor</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
