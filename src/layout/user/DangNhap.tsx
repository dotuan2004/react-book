import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

function DangNhap() {
  const { setIsLoggedIn } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn form gửi đi theo cách mặc định

    try {
      const response = await fetch("http://localhost:8000/tai-khoan/dang-nhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const data = await response.json();
      const { jwt } = data;   

      // Lưu token vào localStorage
      localStorage.setItem("token", jwt);

      // Giải mã token và hiển thị thông tin
      const decodedToken = jwtDecode(jwt);
      console.log("Decoded Token:", decodedToken);

      // Cập nhật trạng thái đăng nhập
      setIsLoggedIn(true);

      // Chuyển hướng tới trang sách
      setError("Đăng nhập thành công");
      navigate("/sach");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <>
      <div style={{ height: "100vh", paddingTop: "2rem" }}>
        <div className="mx-auto" style={{ width: "30rem" }}>
          <div
            className="p-4"
            style={{
              backgroundColor: "#f8e6e9", // Hồng nhạt hơn
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 className="text-center">Đăng Nhập</h5>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className=""></label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Nhập tên đăng nhập"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>
              {error && (
                <div
                  style={{
                    color: "red",
                    marginTop: "10px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </div>
              )}
            </form>
            <div className="mt-3 text-center">
              <a href="#">Quên mật khẩu?</a>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          body {
            color: #fff;
          }
  
          h5 {
            color: #333;
          }
  
          .form-control {
            background-color: #fbe9e7; /* Hồng nhạt hơn */
            border: 1px solid #f48fb1;
            color: #333;
          }
  
          .form-control:focus {
            border-color: #f06292;
            box-shadow: 0 0 5px #f06292;
          }
  
          .btn-primary {
            background-color: #ec407a;
            border-color: #d81b60;
          }
  
          .btn-primary:hover {
            background-color: #d81b60;
          }
  
          .form-check-label {
            color: #333;
          }
  
          a {
            color: #ad1457;
          }
  
          a:hover {
            color: #880e4f;
          }
  
          .mx-auto {
            margin-top: 2rem; /* Tăng khoảng cách so với nav */
          }
        `}
      </style>
    </>
  );
  
  

}

export default DangNhap;
