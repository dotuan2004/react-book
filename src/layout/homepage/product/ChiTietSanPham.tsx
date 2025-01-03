import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import SachModel from "../../../models/SachModel";
import { laySachTheoMaSach } from "../../../api/SachApi";
import { error } from "console";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";
import HinhAnhSanPham from "../components/HinhAnhSanPham";
import Review from "../../../models/Review";
import DanhGia from "../components/Review";

const ChiTietSanPham: React.FC = () => {
    // Lấy mã sách từ URL và đảm bảo là số
    const { maSach } = useParams();
    const maSachNumber = maSach ? parseInt(maSach) : 0;

    // Khai báo state
    const [sach, setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState<string | null>(null);
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);

    useEffect(() => {
        if (maSachNumber !== 0) {
            laySachTheoMaSach(maSachNumber)
                .then((sach) => {
                    setSach(sach);
                    setDangTaiDuLieu(false);
                })
                .catch((error) => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                });
            // You can handle this response as needed
        }
    }, []);
    console.log(sach)
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang Tải Dữ Liệu...</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại</h1>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Cột hiển thị hình ảnh sách */}
                <div className="col-md-4">
                    <HinhAnhSanPham maSach={maSachNumber} />
                </div>

                {/* Cột hiển thị thông tin sách */}
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">{sach.tenSach}</h2>
                            <h5 className="card-subtitle mb-2 text-muted">Tác giả: {sach.tenTacGia}</h5>
                            <p className="card-text">{sach.moTa}</p>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <strong>Giá niêm yết:</strong> {sach.giaNiemYet} VNĐ
                                </li>
                                <li className="list-group-item">
                                    <strong>Giá bán:</strong> {sach.giaBan} VNĐ
                                </li>
                                <li className="list-group-item">
                                    <strong>Số lượng còn:</strong> {sach.soLuong}
                                </li>
                                <li className="list-group-item">
                                    <strong>Xếp hạng trung bình:</strong> {sach.trungBinhXepHang}
                                </li>
                            </ul>

                            
                            <div className="mt-3 d-flex justify-content-between">
                                <NavLink to="/mua-ngay" className="btn btn-primary">
                                    Mua ngay
                                </NavLink>
                                <NavLink to="/gio-hang" className="btn btn-secondary">
                                    Thêm vào giỏ hàng
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <DanhGia />
            </div>
        </div>
    );
};

export default ChiTietSanPham;
