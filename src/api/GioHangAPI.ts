import GioHangModel from "../models/GioHangModel";
import { my_request } from "./Request";
import { laySachByMaGioHang } from "./SachAPI";

export async function layTatCaGioHangByMaNguoiDung(maNguoiDung: number): Promise<GioHangModel[]>{
    const duongDan = `http://localhost:8080/nguoi-dung/${maNguoiDung}/danhSachGioHang`
    try{
        const gioHangResponse = await my_request(duongDan)
        if(gioHangResponse){
            const gioHangResponseList: GioHangModel[]= await Promise.all(gioHangResponse._embedded.gioHangs.map(async (item: any)=>{
                const sachResponse = await laySachByMaGioHang(item.maGioHang)
                return {...item, sach: sachResponse}
            }))
            return gioHangResponseList
        }
    } catch(error){
        console.log(error)
    }
    return []
}