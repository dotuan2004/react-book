import React, { useEffect, useState } from "react";

import SachModel from "../../../models/SachModel";
import CaroselItem from "./CaroselItem";
import { layToanBoSachMoiNhat } from "../../../api/SachApi";

const Carousel: React.FC = () => { 
    const[danhSachQuyenSach,setDanhSachQuyenSach] =useState<SachModel[]>([]);
    const[dangTaiDuLieu,setDangTaiDuLieu] =useState(true);
    const[baoloi,setBaoloi] =useState(null);

    useEffect(()=>{
        layToanBoSachMoiNhat().then(
            kq=>{
            setDanhSachQuyenSach(kq.KetQua);
            setDangTaiDuLieu(false);
        }
    

        ).catch(

        );
    },[]
)
 console.log(danhSachQuyenSach)
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

    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <CaroselItem key={0} book={danhSachQuyenSach[0]}/>
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                <CaroselItem key={1} book={danhSachQuyenSach[1]}/>
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                <CaroselItem key={2} book={danhSachQuyenSach[2]}/>
                </div>
                
                
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
export default Carousel;