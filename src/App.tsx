import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from './layout/user/test';
import { AuthProvider } from './layout/user/AuthContext';
import Navbar from './layout/header-footer/Navbar';
import Homepage from './layout/homepage/Homepage';
import About from './layout/About/About,';
import { DangKyNguoiDung } from './layout/user/DangKyNguoiDung';
import ChiTietSanPham from './layout/homepage/product/ChiTietSanPham';
import DangNhap from './layout/user/DangNhap';
import Footer from './layout/header-footer/Footer';
import Chat from './layout/homepage/components/Chat';
import SachForm_Admin from './layout/admin/SachForm';
import ReviewComponent from './layout/homepage/components/Review';
import Review from './layout/homepage/components/Review';
import Cart from './layout/homepage/product/GioHang';
import AdminBookManagement from './layout/admin/AdminBookManagement';
import ThanhToan from './layout/homepage/product/ThanhToan';


function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
          <Routes>
            <Route path="/" element={<Homepage tuKhoaTimKiem={tuKhoaTimKiem} />} />
            <Route path="/:maTheLoai" element={<Homepage tuKhoaTimKiem={tuKhoaTimKiem} />} />
            <Route path="/about" element={<About />} />
            <Route path="/dangky" element={<DangKyNguoiDung />} />
            <Route path="/sach/:maSach" element={<ChiTietSanPham />} />
            <Route path="/dangnhap" element={<DangNhap />} />
            <Route path="/test" element={<Test />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/admin/them-sach" element={<SachForm_Admin />} />
            <Route path="/danhgia/:maSach" element={<Review />} />
            <Route path="/giohang" element={<Cart/>} />
            <Route path="/thanhtoan" element={<ThanhToan/>} />
            <Route path="/admin" element={<AdminBookManagement/>} />
            
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
