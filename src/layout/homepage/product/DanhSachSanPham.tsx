import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { layToanBoSach, timKiemSach } from "../../../api/SachApi";
import SachProps from "../components/SachProps";
import { PhanTrang } from "../../util/PhanTrang";
import { error } from "console";

interface DanhSachSanPham{
    tuKhoaTimKiem :string
    maTheLoai:number
}

function DanhSachSanPham({tuKhoaTimKiem,maTheLoai}:DanhSachSanPham) {
    const[danhSachQuyenSach,setDanhSachQuyenSach] =useState<SachModel[]>([]);
    const[dangTaiDuLieu,setDangTaiDuLieu] =useState(true);
    const[baoloi,setBaoloi] =useState(null);
    const[trangHienTai,setTrangHienTai]=useState(1);
    const[tongSoTrang,setTongSoTrang] =useState(0);
    useEffect(()=>{
        if(tuKhoaTimKiem===''&&maTheLoai==0){
        layToanBoSach(trangHienTai).then(
            kq=>{
            setDanhSachQuyenSach(kq.KetQua);
            setTongSoTrang(kq.tongSoTrang)
            setDangTaiDuLieu(false);
        }

        ).catch(
            error =>{
                setDangTaiDuLieu(false)
                setBaoloi(error)
            }
        );
    }
    else{
        timKiemSach(tuKhoaTimKiem,maTheLoai).then(
            kq=>{
            setDanhSachQuyenSach(kq.KetQua);
            setTongSoTrang(kq.tongSoTrang)
            setDangTaiDuLieu(false);
        }

        ).catch(

        );
    }
    },[trangHienTai,tuKhoaTimKiem,maTheLoai] //khi nội dung trong thay đổi thì load lại   
)
    const phanTrang =(trang:number)=>{
        setTrangHienTai(trang);
    }
    if(dangTaiDuLieu){
        return(
            <div>
                <h1>Đang Tải Dữ Liệu</h1>
            </div>
        )
    }
    if(baoloi){
        return(
            <div>
                <h1>gặp lỗi : {baoloi}</h1>
            </div>
        )
    }
    console.log(danhSachQuyenSach)
    return (
        
        <div className="container">
            <div className="row mt-4">
                {
                    danhSachQuyenSach.map((book) => (
                        <SachProps key={book.maSach} book={book} />
                    )


                    )
                }
            </div>
                <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    )
}
export default DanhSachSanPham;