import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";

interface CaroselItem {
    book: SachModel;
}
const CaroselItem: React.FC<CaroselItem> = (props) => {
    
    const maSach: number = props.book.maSach
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoloi, setBaoloi] = useState(null);
    
    
    useEffect(() => {
        lay1AnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            }

        ).catch(

        );
    }, []
    )
    

    
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang Tải Dữ Liệu</h1>
            </div>
        )
    }
    if (baoloi) {
        return (
            <div>
                <h1>gặp lỗi : {baoloi}</h1>
            </div>
        )
    }
    let duLieuAnh:string="";
    if(danhSachAnh[0]&&danhSachAnh[0].dulieuanh){
        duLieuAnh=danhSachAnh[0].dulieuanh;
    }

    return (
        <div className="row align-items-center">
        <div className="col-5">
                <img src={duLieuAnh} className="float-end" style={{ width: '200px' }} alt="..." />
            </div>
            <div className="col-7">
                <h5>{props.book.tenSach}</h5>
                <p>{props.book.moTa}</p>
            </div>
        </div>
    );
}
export default CaroselItem;