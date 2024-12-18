import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "./product/DanhSachSanPham";
import { useParams } from "react-router-dom";
interface Homepage {
  tuKhoaTimKiem: string
}

const Homepage: React.FC<Homepage> = ({ tuKhoaTimKiem }) => {
  const { maTheLoai } = useParams()
  let maTheLoaiNumBer = 0;
  try {
    maTheLoaiNumBer = parseInt(maTheLoai + '');
  } catch (error) {
    maTheLoaiNumBer = 0
    console.log('error', error)
  }
  if (Number.isNaN(maTheLoaiNumBer)) maTheLoaiNumBer = 0;

  return (
    <div>
      <Banner />
      <Carousel />
      <DanhSachSanPham tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumBer} />
    </div>
  )
}
export default Homepage;