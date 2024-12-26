import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnhApi";
import { Link } from "react-router-dom";
import '../../../css/SachProps.css';
import { jwtDecode } from "jwt-decode";

interface BookProps {
    book: SachModel;
  }
  
  interface JwtPayload {
    sub: string;
  }
  
  const SachProps: React.FC<BookProps> = (props) => {
    const maSach: number = props.book.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoloi, setBaoloi] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");
  
    useEffect(() => {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        const decodedToken = jwtDecode<JwtPayload>(jwt);
        setUsername(decodedToken.sub);
      }
  
      const fetchData = async () => {
        try {
          const hinhAnhData = await layToanBoAnhCuaMotSach(maSach);
          setDanhSachAnh(hinhAnhData);
        } catch (error) {
          setBaoloi("Lỗi khi tải ảnh sản phẩm.");
        } finally {
          setDangTaiDuLieu(false);
        }
        };
  
      fetchData();
    }, [maSach]);
  
    if (dangTaiDuLieu) {
      return (
        <div>
          <h1>Đang Tải Dữ Liệu...</h1>
        </div>
      );
    }
  
    if (baoloi) {
      return (
        <div>
          <h1>{baoloi}</h1>
        </div>
      );
    }
  
    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].dulieuanh) {
      duLieuAnh = danhSachAnh[0].dulieuanh;
    }
  
    const themVaoGioHang = async () => {
      try {
        const API_URL = "http://localhost:8000/cart-detail/add"; // Thay đổi URL API thực tế của bạn
        const bodyData = {
          username: username,
          bookId: props.book.maSach,
        };
  
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });
  
        if (!response.ok) {
          throw new Error("Không thể thêm vào giỏ hàng");
        }
  
        const data = await response.json();
        return data; 
      } catch (error) {
       
      }
    };
  
    // Sự kiện thêm vào giỏ hàng
    const handleAddToCart = async (event: React.MouseEvent) => {
      event.preventDefault();
      try {
        await themVaoGioHang();
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      } catch (error) {
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
      }
    };
  
    return (
      <div className="col-md-3 mt-2">
        <div className="card">
          <Link to={`/sach/${props.book.maSach}`}>
            <img
              src={`${duLieuAnh}`}
              className="card-img-top"
              alt={props.book.tenSach}
            />
          </Link>
          <div className="card-body">
            <Link to={`/sach/${props.book.maSach}`} style={{ textDecoration: "none" }}>
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
                <a href="" className="btn btn-secondary btn-block">
                  <i className="fas fa-heart"> yêu thích</i>
                </a>
              </div>
              <div className="col-6">
                <a
                  onClick={handleAddToCart}
                  href="#"
                  className="btn btn-primary btn-block"
                >
                  <i className="fas fa-shopping-cart"> thêm vào giỏ hàng</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SachProps;