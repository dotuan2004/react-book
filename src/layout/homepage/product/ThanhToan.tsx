import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { layCartByUser } from "../../../api/SachApi";

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

interface OrderDetailDTO {
  bookId: number;
  quantity: number;
  price: number;
}

function ThanhToan() {
  const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<CartItem[]>([]);
  const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const tongTien = danhSachQuyenSach.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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

  const handlePayment = async () => {
    if (billingAddress.trim() === "" || shippingAddress.trim() === "" || phoneNumber.trim() === "") {
      alert("Vui lòng nhập đầy đủ thông tin địa chỉ nhận hàng và số điện thoại!");
      return;
    }

    // Prepare the order details
    const orderDetails: OrderDetailDTO[] = danhSachQuyenSach.map(item => ({
      bookId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const orderPayload = {
      userId: userId,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      totalAmount: tongTien,
      paymentStatus: "PENDING", // Assume the payment status is pending
      deliveryStatus: "PENDING", // Assume the delivery status is pending
      orderDetails: orderDetails,
    };

    try {
      const url = 'http://localhost:8000/donhang/dathang'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
    
        },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Thanh toán thành công!\nĐịa chỉ thanh toán: ${billingAddress}\nĐịa chỉ nhận hàng: ${shippingAddress}\nSố điện thoại: ${phoneNumber}`);
        // Clear the input fields after successful payment
        setBillingAddress("");
        setShippingAddress("");
        setPhoneNumber("");
      } else {
        alert("Đã xảy ra lỗi khi thanh toán!");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Lỗi khi thanh toán! Vui lòng thử lại.");
    }
  };

  return (
    <div className="container" style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Thông Tin Thanh Toán</h1>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2>Nhập Thông Tin Thanh Toán</h2>

        <input
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          placeholder="Nhập địa chỉ thanh toán..."
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Nhập địa chỉ nhận hàng..."
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Nhập số điện thoại..."
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <h2>Chi tiết đơn hàng</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Sản phẩm</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Số lượng</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Giá</th>
              <th style={{ padding: "10px", textAlign: "right" }}>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {danhSachQuyenSach.map((item) => (
              <tr key={item.id} style={{ backgroundColor: "#f8f9fa" }}>
                <td style={{ padding: "10px" }}>{item.tenSach}</td>
                <td style={{ padding: "10px", textAlign: "right" }}>{item.quantity}</td>
                <td style={{ padding: "10px", textAlign: "right" }}>{item.price.toLocaleString()}₫</td>
                <td style={{ padding: "10px", textAlign: "right" }}>
                  {(item.price * item.quantity).toLocaleString()}₫
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>Tổng tiền:</td>
              <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold" }}>
                {tongTien.toLocaleString()}₫
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          onClick={handlePayment}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default ThanhToan;
