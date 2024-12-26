import React, { useEffect, useState } from "react";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPham {
    maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoloi, setBaoloi] = useState<string | null>(null);

    useEffect(() => {
        // Kiểm tra nếu maSach hợp lệ và đang tải dữ liệu
        if (maSach && dangTaiDuLieu) {
            layToanBoAnhCuaMotSach(maSach)
                .then((hinhAnhData) => {
                    console.log("Dữ liệu hình ảnh trả về:", hinhAnhData);

                    // Kiểm tra xem danh sách ảnh có thay đổi không
                    // Nếu thay đổi, cập nhật lại danh sách ảnh
                    if (hinhAnhData.length !== danhSachAnh.length ||
                        hinhAnhData.some((item, index) => item.maHinhAnh !== danhSachAnh[index]?.maHinhAnh ||
                            item.tenHinhAnh !== danhSachAnh[index]?.tenHinhAnh)) {
                        setDanhSachAnh(hinhAnhData);
                    }

                    // Đặt trạng thái đang tải dữ liệu là false sau khi dữ liệu được lấy
                    setDangTaiDuLieu(false);
                })
                .catch((error) => {
                    setDangTaiDuLieu(false);
                    setBaoloi(error.message);
                });
        }
    }, [maSach]);



    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang Tải Dữ Liệu</h1>
            </div>
        );
    }
    if (baoloi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoloi}</h1>
            </div>
        );
    }
    return (
        <div className="row">
            <div className="col-12">
                <Carousel showArrows={true} showIndicators={true}>
                    {danhSachAnh.map((hinhAnh, index) => (
                        <div key={index}>
                            <img
                                src={hinhAnh.dulieuanh}
                                alt={hinhAnh.tenHinhAnh}
                                style={{ maxWidth: "250px" }}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default HinhAnhSanPham;
