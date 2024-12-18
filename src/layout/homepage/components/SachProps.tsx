import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Link } from "react-router-dom";
import '../../../css/SachProps.css';

interface BookProps {
    book: SachModel;
}
const SachProps: React.FC<BookProps> = (props) => {

    const maSach: number = props.book.maSach
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoloi, setBaoloi] = useState(null);

    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
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
        <div className="col-md-3 mt-2">
    <div className="card">
        <Link to={`/sach/${props.book.maSach}`} >
            <img
                src={`${duLieuAnh}`}
                className="card-img-top"
                alt={props.book.tenSach}
                
            />
        </Link>
        <div className="card-body">
            <Link to={`/sach/${props.book.maSach}`} style={{ textDecoration: 'none' }}>
                <h5 className="card-title">{props.book.tenSach}</h5>
                <p className="card-text">{props.book.moTa}</p>
            </Link>
            <div className="price">
                <span className="original-price">
                    <del>{props.book.giaBan} đ</del>
                </span>
                <span className="discounted-price">
                    <strong>{props.book.giaNiemYet} đ</strong>
                </span>
            </div>
            <div className="row mt-2" role="group">
                <div className="col-6">
                    <a href="#" className="btn btn-secondary btn-block">
                        <i className="fas fa-heart"></i>
                    </a>
                </div>
                <div className="col-6">
                    <a href="#" className="btn btn-primary btn-block">
                        <i className="fas fa-shopping-cart"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}
export default SachProps;