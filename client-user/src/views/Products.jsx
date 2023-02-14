import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_ACTIVE } from "../queries/product";
import CardProducts from "../components/CardProducts";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GET_CATEGORY } from "../queries/category";
import loadingin from "../assets/53735-cart-icon-loader.gif";


const Products = () => {
    const { data, loading, error } = useQuery(GET_PRODUCT_ACTIVE);
    console.log(data);
    const { data: dataCategory, loading: loadingCategory, error: errorCategory } = useQuery(GET_CATEGORY);
    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState([]);
    const [filter, setFilter] = useState({
        category: 'All',
        city: '',
        price: '',
        rating: 'All',
    })
    
    const [age, setAge] = React.useState('');
    
      useEffect(() => {
        if (filter.category !== 'All' ) {
            if (filter.rating !== "All") {
                const temp = data?.getProductActive.filter((item) => {
                    return item.Category.name === filter.category && item.rating >= filter.rating
                })
                setNewData(temp)
            } else {
                const temp = data?.getProductActive.filter((item) => {
                    return item?.Category?.name === filter.category
                  })
                  setNewData(temp)
            }
        } else if (filter.category === 'All') {
            if (filter.rating !== "All") {
                const temp = data?.getProductActive.filter((item) => {
                    return item.rating >= filter.rating
                })
                setNewData(temp)
            } else {
                setNewData(data?.getProductActive)
                // console.log(data);
            }
        }

        // if (filter.rating !== "All") {
        //     const temp = data?.getProductActive?.filter((item) => {
        //         return item.rating >= filter.rating
        //     })
        //     setNewData(temp)
        // } else {
        //     setNewData(data?.getProductActive)
        //     console.log(data);
        // }
        


        }, [filter, data])

        const handleChangeCategory = (event) => {
            setFilter({
                ...filter,
                category: event.target.value
            });
        };
        
        const handleChangeRating = (event) => {
            setFilter({
                ...filter,
                rating: event.target.value
            });
        };
        
        const [open, setOpen] = React.useState(false);

        if (loading || loadingCategory) {
            
            return (
                <div className="min-h-[100vh] bg-white flex justify-center items-center pb-20">
                    <img src={loadingin} className="w-[200px]" alt="" />
                </div>
                // <div>sdsad</div>
            )
        }
        
        
        return (
            <section className="min-h-[100vh] bg-gray-50 flex flex-col items-center pb-20">
                {/* <img src={loadingin} alt="" className="w-[200px]" />sads */}
            <div className="mt-8 w-full flex justify-center">
            </div>
            <div className="flex h-full flex-col items-center mt-4">
                <div className="flex w-full bg-white py-2 px-4 rounded flex-col">
                    <p className="ml-2 my-2">
                        Filter
                    </p>
                    <div className="flex w-full">
                    <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                        <InputLabel id="demo-select-small">Category</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={filter.category}
                            label="category"
                            onChange={handleChangeCategory}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {/* {dataCategory?.getCategory.map((item) => {
                                return (
                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                )
                            } */}
                            <MenuItem value={'Photographer'}>Photography</MenuItem>
                            <MenuItem value={'Catering'}>Cathering</MenuItem>
                            <MenuItem value={'Venue'}>Venue</MenuItem>
                            <MenuItem value={'Entertainment'}>Entertaiment</MenuItem>
                            <MenuItem value={'Make up artist'}>Make Up Artist</MenuItem>
                            <MenuItem value={'EO Package'}>Paket EO</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Rating</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={filter.rating}
                            label="category"
                            onChange={handleChangeRating}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            <MenuItem value={3}>3 moremore</MenuItem>
                            <MenuItem value={4}>4 moremore</MenuItem>
                            {/* <MenuItem value={5}>5</MenuItem> */}
                        </Select>
                    </FormControl>


                        {/* <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'All'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>All</p>
                        </button>
                        <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'Photographer'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>Photography</p>
                        </button>
                        <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'Catering'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>Cathering</p>
                        </button>
                        <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'Gedung'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>Venue</p>
                        </button>
                        <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'Entertainment'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>Entertaiment</p>
                        </button>
                        <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'Make up artist'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>Make-Up</p>
                        </button>
                        <button onClick={() => {
                            setFilter({
                                ...filter,
                                category: 'Paket EO'
                            })
                        }} className="flex items-center text-gray-500 cursor-pointer focus:text-gray-900 font-semibold border-b-2 focus:border-gray-900 mx-2">
                            <p>Paket EO</p>
                        </button> */}
                        {/* <button onClick={openCategory} className=" relative mx-4 bg-white w-[130px] h-[48px] rounded-xl flex items-center justify-center pr-2 shadow-md hover:bg-[#00425A] focus:bg-[#00425A] group duration-300 text-[#00425A]"> <HiSquares2X2 className="group-hover:text-white group-focus:text-white"/> <p className="ml-2 group-hover:text-white group-focus:text-white"> Category</p>
                        </button>
                        { show ? 
                        <div className="fixed flex flex-col bg-white absolute top-[170px] w-[550px] items-center rounded-lg px-6 py-2">
                            <div className="w-full flex justify-end text-red-700 mb-2"><button onClick={closeCategory}>close</button> </div>
                            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiRestaurantLine className="text-xl"/> <p className="ml-2 text-md">Cathering and Cake</p></div>
                                <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiBuildingLine className="text-xl"/> <p className="ml-2 text-md">Reception Venue</p></div>
                                <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiUserHeartLine className="text-xl"/> <p className="ml-2 text-md">Makeup Artist</p></div>
                                <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiCamera3Line className="text-xl"/> <p className="ml-2 text-md">Wedding Photographer</p></div>
                                <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiVidiconLine className="text-xl"/> <p className="ml-2 text-md">Entertaiment</p></div>
                                <div className="cursor-pointer flex items-center text-[#00425A] rounded-lg border-b-2 border-white hover:border-b-2 hover:border-gray-200 h-[40px] px-2"><RiTeamLine className="text-xl"/> <p className="ml-2 text-md">Wedding Organizer</p></div>
                            </div>
                        </div>
                        : ''} */}

                        {/* PRICE */}
                        


                        <div className='bg-white w-[300px] h-[48px] rounded-xl flex items-center pl-6 pr-2 shadow-md ml-4'>
                            <input type="text" name="" id="" placeholder='search name' className='pr-2 w-[83%] h-full focus:outline-none' />
                            <div className='bg-[#645CBB] hover:bg-[#BFACE2] cursor-pointer h-[80%] w-[17%] rounded-xl flex items-center justify-center'><i className="text-white fa-solid fa-magnifying-glass"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex justify-center w-full">
                <div className=" w-[75%] grid grid-cols-4 gap-x-8 gap-y-6">
                    {newData?.map((product) => {
                        console.log(product)
                        if(product.CategoryId !== 7){
                        return (
                            <CardProducts key={product.id} product={product} />
                        )

                        }
                    })}
                </div>
            </div>
        </section>
    )
}

export default Products