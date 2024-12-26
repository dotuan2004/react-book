import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../user/AuthContext";
import { jwtDecode } from "jwt-decode";
import { layAvatar } from "../../api/UserApi";
import UserModel from "../../models/UserModel";

interface NavbarProps {
  tuKhoaTimKiem: string;
  setTuKhoaTimKiem: (tuKhoa: string) => void;
}

function Navbar({ tuKhoaTimKiem, setTuKhoaTimKiem }: NavbarProps) {
  const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [anh, setAnh] = useState<UserModel[] >([]); // Chỉ lưu URL của avatar
  
  const onChangeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTuKhoaTamThoi(e.target.value);
  };

  const handleSearch = () => {
    setTuKhoaTimKiem(tuKhoaTamThoi);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/dangnhap");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      const decodedToken: any = jwtDecode(token);
      const username = decodedToken.sub;

      layAvatar(username)
        .then((data) => {
          if (data.length > 0 && data[0].avatar) {
            setAnh(data); // Lấy avatar đầu tiên
          } 
        })
        .catch((error) => {
          console.error("Lỗi khi lấy avatar:", error);
         
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  let duLieuAnh: string = "";
  if(anh[0]&&anh[0].avatar){
    duLieuAnh=anh[0].avatar;
  }

  // Kiểm tra xem anh[0] có tồn tại và có thuộc tính avatar hay không
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Thể loại sách
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li>
                  <NavLink className="dropdown-item" to="/1">
                    Thể loại 1
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/2">
                    Thể loại 2
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/3">
                    Thể loại 3
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Chức Năng Admin
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li>
                  <NavLink className="dropdown-item" to="/1">
                    1
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/2">
                    2
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/3">
                   3
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={onChangeInputChange}
              value={tuKhoaTamThoi}
            />
            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
              Search
            </button>
          </div>
          {isLoggedIn ? (
            
            <div className="d-flex align-items-center">
              <img
                src={`data:image/png;base64,${duLieuAnh}`} // Avatar từ state hoặc mặc định
                // alt="User Avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Đăng xuất
              </button>
            </div>
          ) : (
            <NavLink className="btn btn-primary ms-3" to="/dangnhap">
              <i className="bi bi-box-arrow-in-right"></i> Đăng nhập
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;