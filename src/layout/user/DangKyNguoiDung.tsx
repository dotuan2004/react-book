import React, { useState } from "react";

export function DangKyNguoiDung() {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [hinhAnh, setHinhAnh] = useState<File | null>(null);

    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorSoDienThoai, setErrorSoDienThoai] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [thongBao, setThongBao] = useState("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,12}$/;

    const handleHinhAnhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setHinhAnh(file);
    };

    const validateForm = () => {
        let isValid = true;

        if (!tenDangNhap) {
            setErrorTenDangNhap("Tên đăng nhập không được để trống!");
            isValid = false;
        } else if (tenDangNhap.length < 4 || tenDangNhap.length > 20) {
            setErrorTenDangNhap("Tên đăng nhập phải từ 4 đến 20 ký tự!");
            isValid = false;
        }

        if (!email) {
            setErrorEmail("Email không được để trống!");
            isValid = false;
        } else if (!emailPattern.test(email)) {
            setErrorEmail("Email không đúng định dạng!");
            isValid = false;
        }

        if (!soDienThoai) {
            setErrorSoDienThoai("Số điện thoại không được để trống!");
            isValid = false;
        } else if (!phonePattern.test(soDienThoai)) {
            setErrorSoDienThoai("Số điện thoại phải từ 10 đến 12 chữ số!");
            isValid = false;
        }

        if (!matKhau) {
            setErrorMatKhau("Mật khẩu không được để trống!");
            isValid = false;
        } else if (matKhau.length < 6) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 6 ký tự!");
            isValid = false;
        } else if (matKhau !== matKhauLapLai) {
            setErrorMatKhau("Mật khẩu và xác nhận mật khẩu không khớp!");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset errors
        setErrorTenDangNhap("");
        setErrorEmail("");
        setErrorSoDienThoai("");
        setErrorMatKhau("");
        setThongBao("");

        // Validate form
        if (!validateForm()) return;

        const getBase64 = (file: File): Promise<string | null> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result ? (reader.result as string).split(',')[1] : null);
                reader.onerror = (error) => reject(error);
            });
        };
        

        const base64Avatar = hinhAnh ? await getBase64(hinhAnh) : null
        try {
            console.log({
                tenDangNhap: tenDangNhap,
                email: email,
                soDienThoai: soDienThoai,
                matKhau: matKhau,
                avatar: base64Avatar
            });
            const url = 'http://localhost:8000/tai-khoan/dang-ky'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: tenDangNhap,
                    email: email,
                    phoneNumber: soDienThoai,
                    password: matKhau,
                    avatar: base64Avatar
                }),
            });

            if (response.ok) {
                setThongBao("Đăng ký thành công!");
            } else {
                const responseBody = await response.json(); // Lấy dữ liệu chi tiết phản hồi từ server
                console.log("Server error response:", responseBody); // Ghi log để xem lỗi
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký.");
            }
        } catch (error) {
            setThongBao("Lỗi kết nối đến server.");
            console.log(error)
        }
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div
                className="card shadow-lg p-4"
                style={{ maxWidth: "600px", width: "100%", borderRadius: "15px" }}
            >
                <h2 className="text-center mb-4">Đăng Ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control rounded-pill ${errorTenDangNhap ? "is-invalid" : ""}`}
                            placeholder="Tên Đăng Nhập"
                            value={tenDangNhap}
                            onChange={(e) => {
                                setTenDangNhap(e.target.value);
                                setErrorTenDangNhap("");
                            }}
                        />
                        <label>Tên Đăng Nhập</label>
                        {errorTenDangNhap && (
                            <div className="invalid-feedback">{errorTenDangNhap}</div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className={`form-control rounded-pill ${errorEmail ? "is-invalid" : ""}`}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorEmail("");
                            }}
                        />
                        <label>Email</label>
                        {errorEmail && <div className="invalid-feedback">{errorEmail}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className={`form-control rounded-pill ${errorSoDienThoai ? "is-invalid" : ""}`}
                            placeholder="Số Điện Thoại"
                            value={soDienThoai}
                            onChange={(e) => {
                                setSoDienThoai(e.target.value);
                                setErrorSoDienThoai("");
                            }}
                        />
                        <label>Số Điện Thoại</label>
                        {errorSoDienThoai && (
                            <div className="invalid-feedback">{errorSoDienThoai}</div>
                        )}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className={`form-control rounded-pill ${errorMatKhau ? "is-invalid" : ""}`}
                            placeholder="Mật Khẩu"
                            value={matKhau}
                            onChange={(e) => {
                                setMatKhau(e.target.value);
                                setErrorMatKhau("");
                            }}
                        />
                        <label>Mật Khẩu</label>
                        {errorMatKhau && <div className="invalid-feedback">{errorMatKhau}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control rounded-pill"
                            placeholder="Xác Nhận Mật Khẩu"
                            value={matKhauLapLai}
                            onChange={(e) => setMatKhauLapLai(e.target.value)}
                        />
                        <label>Xác Nhận Mật Khẩu</label>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Upload Ảnh Đại Diện</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleHinhAnhChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill">
                        Đăng Ký
                    </button>
                    <div style={{ color: "green" }}>{thongBao}

                    </div>
                </form>
            </div>
        </div>
    );
}
