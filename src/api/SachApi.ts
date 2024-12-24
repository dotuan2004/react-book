import React from "react";
import SachModel from "../models/SachModel";
import { promises } from "dns";
import myRequest from "./Request";
import Review from "../models/Review";

interface KetQuaInterface {
    KetQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number
}
interface ReviewInterface{
    KetquaReview:Review[];
}
async function  laySach(duongDan: string): Promise<KetQuaInterface> {
    const KetQua: SachModel[] = [];

    const response = await myRequest(duongDan);
    const responseData = response._embedded.books

    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    for (const Key in responseData) {   
        KetQua.push({
            maSach: responseData[Key].bookId,
            tenSach: responseData[Key].bookName,
            giaBan: responseData[Key].listPrice,
            giaNiemYet: responseData[Key].salePrice,
            moTa: responseData[Key].description,
            soLuong: responseData[Key].quantity,     
            tenTacGia: responseData[Key].author,
            trungBinhXepHang: responseData[Key].isbn,
            
        })
    }
    return { KetQua: KetQua, tongSoTrang: tongSoTrang, tongSoSach: tongSoSach };
}

export async function layToanBoSach(trangHienTai: number): Promise<KetQuaInterface> {
    const duongDan = `http://localhost:8000/book?sort=bookId,desc&size=8&page=${trangHienTai}`;
    return laySach(duongDan);
} export async function layToanBaSachMoiNhat(): Promise<KetQuaInterface> {
    const duongDan = 'http://localhost:8000/book?sort=bookId,desc*&page=0&size=3';
    return laySach(duongDan);
}
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {
    let duongDan = `http://localhost:8000/book`;
    if (tuKhoaTimKiem !== '' && maTheLoai == 0) {
        duongDan = `http://localhost:8000/book/search/findByBookNameContaining?sort=bookId,desc*&page=0&size=8&tenSach=${tuKhoaTimKiem}`;
    }
    else if (tuKhoaTimKiem === '' && maTheLoai > 0) {
        
        duongDan = `http://localhost:8000/book/search/findByCategories_CategoryId?sort=bookId,desc&page=0&size=8&maTheLoai=${maTheLoai}`;

    }
    else if (tuKhoaTimKiem !== '' && maTheLoai > 0) {
        duongDan = `http://localhost:8000/book/search/findByBookNameContainingAndCategories_CategoryId?sort=bookId,desc*&page=0&size=8&maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`;
    }
    return laySach(duongDan);
}

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {
    const duongDan = `http://localhost:8000/book/${maSach}`;
    try {
        const response = await fetch(duongDan);
        
        if (!response.ok) {
            throw new Error("Gặp lỗi trong quá trình gọi API lấy sách!");
        }

        const sachData = await response.json();
        
        return {
            maSach: sachData.bookId,
            tenSach: sachData.bookName,
            giaBan: sachData.listPrice,
            giaNiemYet: sachData.salePrice,
            moTa: sachData.description,
            soLuong: sachData.quantity,
            tenTacGia: sachData.author,
            trungBinhXepHang: sachData.isbn,
            ///
           
        };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
export async function layReviewSachByMa(maSach: number): Promise<ReviewInterface | null> {
    const duongDan = `http://localhost:8000/su-danh-gia/search/findByBook_BookId?maSach=${maSach}`;
    try {
        const response = await fetch(duongDan);
        
        if (!response.ok) {
            throw new Error("Gặp lỗi trong quá trình gọi API lấy đánh giá!");
        }  

        const responseData = await response.json();
        const reviewData = responseData._embedded?.reviews || [];

        console.log("api data", reviewData);

        const KetquaReview: Review[] = reviewData.map((review: any) => {
            return new Review(
                review.username, // Lấy username từ API
                review.content,  // Lấy content từ API
                review.id,       // Giả sử id của đánh giá là 'id'
                review.rating    // Lấy rating từ API
            );
        });

        return { KetquaReview };  // Trả về đúng kiểu ReviewInterface
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}



