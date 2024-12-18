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
        layToanBoAnhCuaMotSach(maSach)
            .then((hinhAnhData) => {
                console.log(hinhAnhData); // Kiểm tra dữ liệu trả về
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            })
            .catch((error) => {
                setDangTaiDuLieu(false);
                setBaoloi(error.message); // Access the error message correctly
            });
    }, [maSach]); // Adding maSach as a dependency so the effect runs when it changes

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
