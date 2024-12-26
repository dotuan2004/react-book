import React, { useEffect, useState } from "react";
import { layCartByUser } from "../../../api/SachApi";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  sub: string;
}

interface CartItem {
  id: number;
  tenSach: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const Cart: React.FC = () => {
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<CartItem[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
   

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(jwt);
        const username = decodedToken.sub;
  
        if (username) {
          setDangTaiDuLieu(true); // Bắt đầu tải dữ liệu
          layCartByUser(username)
            .then((kq) => {
              if (kq) {
                setDanhSachQuyenSach(kq.KetquaCart);
              } else {
                setDanhSachQuyenSach([]);
              }
              setDangTaiDuLieu(false);
            
            })
            .catch((error) => {
              console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
              setDangTaiDuLieu(false);
            
            });
        }
      } catch (error) {
        console.error("Không thể giải mã token!", error);
        setDangTaiDuLieu(false);
        return; // Dừng nếu token không hợp lệ
      }
    } else {
      console.error("Token không tồn tại trong localStorage!");
      setDangTaiDuLieu(false);
      return; // Dừng nếu không có token
    }
  }, []); // Điều kiện dùng loaded chỉ để theo dõi trạng thái tải
   // Thêm loaded vào mảng phụ thuộc

   return (
    <div
      style={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "900px",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", textAlign: "center", color: "#343a40", fontSize: "24px", fontWeight: "600" }}>
        Giỏ Hàng của Người dùng
      </h1>
  
      {dangTaiDuLieu ? (
        <p>Đang tải dữ liệu...</p>
      ) : danhSachQuyenSach.length === 0 ? (
        <p>Giỏ hàng trống!</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
                  Ảnh
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
                  Tên Sách
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
                  Giá
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
                  Số Lượng
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
                  Tổng
                </th>
                <th style={{ borderBottom: "1px solid #ddd", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px" }}>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {danhSachQuyenSach.map((item) => (
                <tr key={item.id} style={{ backgroundColor: "#ffffff" }}>
                  <td style={{ padding: "12px" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.tenSach}
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </td>
                  <td style={{ padding: "12px", color: "#343a40" }}>{item.tenSach}</td>
                  <td style={{ padding: "12px", color: "#343a40" }}>{item.price.toLocaleString()}₫</td>
                  <td style={{ padding: "12px", color: "#343a40" }}>{item.quantity}</td>
                  <td style={{ padding: "12px", color: "#343a40" }}>
                    {(item.price * item.quantity).toLocaleString()}₫
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      style={{
                        backgroundColor: "#ff5733",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 15px",
                        cursor: "pointer",
                        fontSize: "14px",
                        transition: "background-color 0.3s ease",
                      }}
                     
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Hiển thị tổng giá */}
          <div style={{ marginTop: "20px", textAlign: "right", fontSize: "18px", fontWeight: "600", color: "#343a40" }}>
            <p>Tổng giá: <span style={{ color: "#ff5733" }}>{danhSachQuyenSach.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}₫</span></p>
          </div>
        </>
      )}
    </div>
  );
  
  
};

export default Cart;
