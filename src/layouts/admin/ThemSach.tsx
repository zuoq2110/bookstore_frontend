import { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAmdin";

const ThemSach = () => {
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: "",
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        isbn: '',
        trungBinhXepHang: 0,

    })
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        try {
            fetch(`http://localhost:8080/sach`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(sach)
                })
                .then((response) => {
                    if (response.ok) {
                        alert("Thêm sách thành công");
                        setSach({
                            maSach: 0,
                            tenSach: "",
                            giaBan: 0,
                            giaNiemYet: 0,
                            moTa: '',
                            soLuong: 0,
                            tenTacGia: '',
                            isbn: '',
                            trungBinhXepHang: 0,
                        })
                    }
                })
        } catch (error) {
            alert("Đã gặp lỗi trong quá trình thêm sách")
        }
    }
    return (
        <div className="container">
            <h2 className="mt-5 text-center">Thêm sách</h2>
            <div className="col-md-6 col-12 mb-3 mx-auto">
                <form className="form" onSubmit={handleSubmit}>
                    <input className="form-control" type="hidden" value={sach.maSach}></input>
                    <label htmlFor="tenSach" className="form-label">Tên sách</label>
                    <input className="form-control" type="text" value={sach.tenSach}
                        onChange={e => setSach({ ...sach, tenSach: e.target.value })} required></input>
                    <label htmlFor="giaBan" className="form-label">Giá bán</label>
                    <input className="form-control" type="number" value={sach.giaBan}
                        onChange={e => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}></input>
                    <label htmlFor="giaNiemYet" className="form-label">Giá niêm yết</label>
                    <input className="form-control" type="number" value={sach.giaNiemYet}
                        onChange={e => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}></input>
                    <label htmlFor="moTa" className="form-label">Mô tả</label>
                    <input className="form-control" type="text" value={sach.moTa}
                        onChange={e => setSach({ ...sach, moTa: (e.target.value) })}></input>
                    <label htmlFor="soLuong" className="form-label">Số lượng</label>
                    <input className="form-control" type="number" value={sach.soLuong}
                        onChange={e => setSach({ ...sach, soLuong: parseInt(e.target.value) })}></input>
                    <label htmlFor="tenTacGia" className="form-label">Tên tác giả</label>
                    <input className="form-control" type="text" value={sach.tenTacGia}
                        onChange={e => setSach({ ...sach, tenTacGia: (e.target.value) })}></input>
                    <label htmlFor="isbn" className="form-label">isbn</label>
                    <input className="form-control" type="text" value={sach.isbn}
                        onChange={e => setSach({ ...sach, isbn: (e.target.value) })}></input>
                    <label htmlFor="trungBinhXepHang" className="form-label">Trung bình xếp hạng</label>
                    <input className="form-control" type="number" value={sach.trungBinhXepHang}
                        onChange={e => setSach({ ...sach, trungBinhXepHang: parseFloat(e.target.value) })}></input>

                    <div className="text-center">
                        <button type="submit" className="btn btn-success mt-2">Thêm sách</button>

                    </div>
                </form>
            </div>
        </div>
    )
}
const ThemSach_Admin = RequireAdmin(ThemSach);
export default ThemSach_Admin;