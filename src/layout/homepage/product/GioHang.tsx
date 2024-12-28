import React, { useEffect, useState } from "react";
import { layCartByUser } from "../../../api/SachApi";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  sub: string;
  userId: string;
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
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(jwt);
        const username = decodedToken.sub;
        setUserId(decodedToken.userId);
        if (username) {
          setDangTaiDuLieu(true);
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
      }
    } else {
      console.error("Token không tồn tại trong localStorage!");
      setDangTaiDuLieu(false);
    }
  }, []);

  const XoaSanPham = async (bookId: number) => {
    try {
      const API_URL = "http://localhost:8000/cart-detail/remove"; // Thay đổi URL API thực tế của bạn
      const bodyData = {
        bookId,
        userId,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handle = async (event: React.MouseEvent, bookId: number) => {
    event.preventDefault();
    try {
      await XoaSanPham(bookId);
      alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
      setDanhSachQuyenSach((prev) => prev.filter((item) => item.id !== bookId));
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  return (
    <div className="container">
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center", fontSize: "24px", color: "#333" }}>
          Giỏ Hàng của Người dùng
        </h1>

        {dangTaiDuLieu ? (
          <p>Đang tải dữ liệu...</p>
        ) : danhSachQuyenSach.length === 0 ? (
          <p>Giỏ hàng trống!</p>
        ) : (
          <>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  <th style={{ padding: "12px" }}>Ảnh</th>
                  <th style={{ padding: "12px" }}>Tên Sách</th>
                  <th style={{ padding: "12px" }}>Giá</th>
                  <th style={{ padding: "12px" }}>Số Lượng</th>
                  <th style={{ padding: "12px" }}>Tổng</th>
                  <th style={{ padding: "12px" }}>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {danhSachQuyenSach.map((item) => (
                  <tr key={item.id} style={{ backgroundColor: "#fff" }}>
                    <td style={{ padding: "12px" }}>
                      <img
                        src={item.imageUrl}
                        alt={item.tenSach}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    </td>
                    <td style={{ padding: "12px" }}>{item.tenSach}</td>
                    <td style={{ padding: "12px" }}>{item.price.toLocaleString()}₫</td>
                    <td style={{ padding: "12px" }}>{item.quantity}</td>
                    <td style={{ padding: "12px" }}>
                      {(item.price * item.quantity).toLocaleString()}₫
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={(event) => handle(event, item.id)}
                        style={{
                          backgroundColor: "#ff5733",
                          color: "white",
                          border: "none",
                          padding: "8px 15px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "20px", textAlign: "right", fontWeight: "bold" }}>
              <p>
                Tổng giá:{" "}
                {danhSachQuyenSach
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toLocaleString()}
                ₫
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
