class HinhAnhModel {
    maHinhAnh: number;
    tenHinhAnh?: string;
    laIcon?: boolean;
    duongDan?: string;
    dulieuanh?: string;

    // Constructor để khởi tạo các giá trị
    constructor(
        maHinhAnh: number,
        tenHinhAnh?: string,
        laIcon?: boolean,
        duongDan?: string,
        dulieuanh?: string
    ) {
        this.maHinhAnh = maHinhAnh;
        this.tenHinhAnh = tenHinhAnh;
        this.laIcon = laIcon;
        this.duongDan = duongDan;
        this.dulieuanh = dulieuanh;
    }
}

export default HinhAnhModel;