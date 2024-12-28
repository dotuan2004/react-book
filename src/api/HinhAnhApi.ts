import React from "react";
import SachModel from "../models/SachModel";
import { promises } from "dns";
import myRequest from "./Request";
import HinhAnhModel from "../models/HinhAnhModel";
export async function layAnhCua1Sach(duongDan:string):Promise<HinhAnhModel[]> {
    const KetQua: HinhAnhModel[] = [];
    
    const response = await myRequest(duongDan);
    console.log("Phản hồi từ API:", response);
    const responseData = response._embedded.images;
    console.log("Dữ liệu hình ảnh:", responseData);
    for (const Key in responseData) {
        KetQua.push({

            maHinhAnh:responseData[Key].imageId,
            tenHinhAnh: responseData[Key].imageName,
            laIcon: responseData[Key].icon,
            duongDan: responseData[Key].link,
            dulieuanh: responseData[Key].imageData,
 
        });
    }
    return KetQua;
}

export async function layToanBoAnhCuaMotSach(maSach:number):Promise<HinhAnhModel[]> {
    
    const duongDan = `http://localhost:8000/book/${maSach}/images`;
    return layAnhCua1Sach(duongDan);
}
export async function lay1AnhCuaMotSach(maSach:number):Promise<HinhAnhModel[]> {
    const duongDan = `http://localhost:8000/book/${maSach}/images?sort=imageId,asc&page=0&size=1`;
    return layAnhCua1Sach(duongDan);
}
