import React from "react";

interface PhanTrangInterface {
    trangHienTai: number;
    tongSoTrang: number;
    phanTrang: any
}

export const PhanTrang: React.FC<PhanTrangInterface> = (props) => {

    const danhSachTrang = [];
    if (props.trangHienTai === 1) {
        danhSachTrang.push(props.trangHienTai);
        if (props.tongSoTrang >= props.trangHienTai + 1) {
            danhSachTrang.push(props.trangHienTai + 1)
        }
        if (props.tongSoTrang >= props.trangHienTai + 2) {
            danhSachTrang.push(props.trangHienTai + 2)
        }

    }
    else if (props.trangHienTai > 1) {

        if (props.trangHienTai >= 3) {
            danhSachTrang.push(props.trangHienTai - 2);
        } if (props.trangHienTai >= 2) {
            danhSachTrang.push(props.trangHienTai - 1);
        }
        danhSachTrang.push(props.trangHienTai)
        if (props.tongSoTrang >= props.trangHienTai + 1) {
            danhSachTrang.push(props.trangHienTai + 1)
        }
        if (props.tongSoTrang >= props.trangHienTai + 2) {
            danhSachTrang.push(props.trangHienTai + 2)
        }
    }

    return (

        <nav aria-label="Pagination">
    <ul className="pagination pagination-lg justify-content-center">
        <li className="page-item " onClick={() => props.phanTrang(1)}>
            <button
                className="page-link"
                
            >
                Trang đầu
            </button>
        </li>
        {danhSachTrang.map(trang => (
            <li
                className={`page-item ${props.trangHienTai === trang ? 'active' : ''}`}
                key={trang}
                onClick={() => props.phanTrang(trang)}
            >
                <button className="page-link">
                    {trang}
                </button>
            </li>
        ))}
        <li className={`page-item ${props.trangHienTai === props.tongSoTrang ? 'disabled' : ''}`}>
            <button
                className="page-link"
                onClick={() => props.phanTrang(props.tongSoTrang)}
            >
                Trang cuối
            </button>
        </li>
    </ul>
</nav>

    )
}