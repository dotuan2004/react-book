import React from "react";
import SachModel from "../models/SachModel";
import myRequest from "./Request";
import Review from "../models/Review";

interface KetQuaInterface {
    KetQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

interface ReviewInterface {
    KetquaReview: Review[];
}

interface CartItem {
    id: number;
    tenSach: string;
    price: number;
    quantity: number;
    imageUrl: string; // Đường dẫn ảnh của sản phẩm
}

interface CartInterface {
    KetquaCart: CartItem[];
}

async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const KetQua: SachModel[] = [];

    const response = await myRequest(duongDan);
    const responseData = response._embedded.books;

    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    for (const key in responseData) {
        KetQua.push({
            maSach: responseData[key].bookId,
            tenSach: responseData[key].bookName,
            giaBan: responseData[key].listPrice,
            giaNiemYet: responseData[key].salePrice,
            moTa: responseData[key].description,
            soLuong: responseData[key].quantity,
            tenTacGia: responseData[key].author,
            trungBinhXepHang: responseData[key].isbn,
        });
    }
    return { KetQua, tongSoTrang, tongSoSach };
}

export async function layToanBoSach(trangHienTai: number): Promise<KetQuaInterface> {
    const duongDan = `http://localhost:8000/book?sort=bookId,desc&size=8&page=${trangHienTai}`;
    return laySach(duongDan);
}

export async function layToanBoSachMoiNhat(): Promise<KetQuaInterface> {
    const duongDan = 'http://localhost:8000/book?sort=bookId,desc&page=0&size=3';
    return laySach(duongDan);
}

export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<KetQuaInterface> {
    let duongDan = `http://localhost:8000/book`;
    if (tuKhoaTimKiem !== '' && maTheLoai === 0) {
        duongDan = `http://localhost:8000/book/search/findByBookNameContaining?sort=bookId,desc&page=0&size=8&tenSach=${tuKhoaTimKiem}`;
    } else if (tuKhoaTimKiem === '' && maTheLoai > 0) {
        duongDan = `http://localhost:8000/book/search/findByCategories_CategoryId?sort=bookId,desc&page=0&size=8&maTheLoai=${maTheLoai}`;
    } else if (tuKhoaTimKiem !== '' && maTheLoai > 0) {
        duongDan = `http://localhost:8000/book/search/findByBookNameContainingAndCategories_CategoryId?sort=bookId,desc&page=0&size=8&maTheLoai=${maTheLoai}&tenSach=${tuKhoaTimKiem}`;
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

        console.log("API data", reviewData);

        const KetquaReview: Review[] = reviewData.map((review: any) => {
            return new Review(
                review.username,
                review.content,
                review.id,
                review.rating
            );
        });

        return { KetquaReview };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}

export async function layCartByUser(username: string): Promise<CartInterface | null> {
    const duongDan = `http://localhost:8000/cart-detail/view?username=${username}`;
    try {
        const response = await fetch(duongDan);

        if (!response.ok) {
            throw new Error("Gặp lỗi trong quá trình gọi API lấy giỏ hàng!");
        }

        const responseData = await response.json();

        console.log("API data", responseData);

        const KetquaCart: CartItem[] = responseData.map((item: any) => ({
            id: item.id,
            tenSach: item.tenSach,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
        }));

        return { KetquaCart };
    } catch (error) {
        console.error("Error", error);
        return null;
    }
}
