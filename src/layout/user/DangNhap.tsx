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
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Đăng Nhập</h5>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Tên đăng nhập</label>
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
              <label htmlFor="password" className="form-label">Mật khẩu</label>
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
            {error && <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</div>}
          </form>
          <div className="mt-3 text-center">
            <a href="#">Quên mật khẩu?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DangNhap;
