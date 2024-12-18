import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequiredAdmin";


const SachForm: React.FC = () => {
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        trungBinhXepHang: 0,
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
      
        // Gửi request đến API
        try {
          const response = await fetch('http://localhost:8000/book', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(sach),
          });
      
          // Kiểm tra trạng thái phản hồi
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // Xử lý dữ liệu phản hồi (nếu cần)
          const data = await response.json();
          console.log('Thành công:', data);
      
          // Thực hiện các hành động sau khi lưu sách thành công, ví dụ:
          alert('Lưu sách thành công!');
          setSach({
            maSach: 0,
            tenSach: '',
            giaBan: 0,
            giaNiemYet: 0,
            moTa: '',
            soLuong: 0,
            tenTacGia: '',
            trungBinhXepHang: 0,
          });
        } catch (error) {
          console.error('Lỗi khi lưu sách:', error);
          alert('Lưu sách thất bại. Vui lòng thử lại!');
        }
      };
      

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Thêm Sách</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="tenSach" className="form-label">Tên Sách:</label>
                    <input
                        type="text"
                        id="tenSach"
                        className="form-control"
                        value={sach.tenSach}
                        onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="giaBan" className="form-label">Giá Bán:</label>
                    <input
                        type="number"
                        id="giaBan"
                        className="form-control"
                        value={sach.giaBan}
                        onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) || 0 })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="giaNiemYet" className="form-label">Giá Niêm Yết:</label>
                    <input
                        type="number"
                        id="giaNiemYet"
                        className="form-control"
                        value={sach.giaNiemYet}
                        onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) || 0 })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="moTa" className="form-label">Mô Tả:</label>
                    <textarea
                        id="moTa"
                        className="form-control"
                        value={sach.moTa}
                        onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="soLuong" className="form-label">Số Lượng:</label>
                    <input
                        type="number"
                        id="soLuong"
                        className="form-control"
                        value={sach.soLuong}
                        onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) || 0 })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tenTacGia" className="form-label">Tên Tác Giả:</label>
                    <input
                        type="text"
                        id="tenTacGia"
                        className="form-control"
                        value={sach.tenTacGia}
                        onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="trungBinhXepHang" className="form-label">Trung Bình Xếp Hạng:</label>
                    <input
                        type="number"
                        id="trungBinhXepHang"
                        className="form-control"
                        value={sach.trungBinhXepHang}
                        onChange={(e) => setSach({ ...sach, trungBinhXepHang: parseFloat(e.target.value) || 0 })}
                        step="0.1"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Lưu</button>
            </form>
        </div>
    );
};
const SachForm_Admin=RequireAdmin(SachForm)
export default SachForm_Admin;
