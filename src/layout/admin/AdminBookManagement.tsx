import React, { useEffect, useState } from 'react';
import { layToanBoSachAdmin } from '../../api/SachApi';
import SachModel from '../../models/SachModel';

const AdminBookManagement: React.FC = () => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);

    // Fetch danh sách sách
    useEffect(() => {
        layToanBoSachAdmin()
            .then((kq) => {
                setDanhSachQuyenSach(kq.KetQua);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách sách:', error);
            });
    }, []);

    // Hàm xử lý thêm sách
    const handleAddBook = () => {
        console.log("Thêm sách mới");
        // Logic thêm sách mới vào danh sách hoặc mở form nhập liệu
    };

    // Hàm xử lý sửa sách
    const handleEditBook = (maSach: number) => {
        console.log("Sửa sách có ID:", maSach);
        // Logic sửa sách, có thể hiển thị form sửa
    };

    // Hàm xử lý xóa sách
    const handleDeleteBook = (maSach: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
            console.log("Xóa sách có ID:", maSach);
            // Logic xóa sách
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '0 auto', maxWidth: '1200px', padding: '20px', backgroundColor: '#fdf0f6' }}>
            <div style={{ padding: '20px' }}>
                <h1 style={{ textAlign: 'center', color: '#d33f6a', marginBottom: '20px', fontSize: '32px' }}>Admin Book Management</h1>
    
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <button 
                        onClick={handleAddBook}
                        style={{
                            backgroundColor: '#d33f6a', color: 'white', padding: '10px 20px', fontSize: '16px',
                            border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b53255'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d33f6a'}
                    >
                        Add Book
                    </button>
                </div>
    
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>ID</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>ISBN</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>Author</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>Book Name</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>Description</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>List Price</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>Quantity</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>Sale Price</th>
                            <th style={{ padding: '12px 20px', textAlign: 'left', backgroundColor: '#d33f6a', color: 'white', fontWeight: 'bold', borderRadius: '5px' }}>Actions</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        {danhSachQuyenSach.map((book) => (
                            <tr key={book.maSach} style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0', transition: 'background-color 0.3s ease' }}>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>{book.maSach}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>{book.tenSach}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>{book.tenTacGia}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>{book.tenSach}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>{book.moTa}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>${book.giaNiemYet}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>{book.soLuong}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'left' }}>${book.giaBan}</td>
                                <td style={{ padding: '12px 20px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={() => handleEditBook(book.maSach)}
                                        style={{
                                            backgroundColor: '#f1c40f', color: 'white', padding: '8px 16px', margin: '0 5px',
                                            border: 'none', borderRadius: '5px', cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book.maSach)}
                                        style={{
                                            backgroundColor: '#e74c3c', color: 'white', padding: '8px 16px', margin: '0 5px',
                                            border: 'none', borderRadius: '5px', cursor: 'pointer',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};

export default AdminBookManagement;
