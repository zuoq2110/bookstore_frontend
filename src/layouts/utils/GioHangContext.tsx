import { createContext, useContext, useEffect, useState } from "react";
import GioHangModel from "../../models/GioHangModel";
interface GioHangProps{
    children: React.ReactNode
}
interface GioHangType{
    gioHangList: GioHangModel[];
    setGioHangList: any;
    tongGioHang: number;
    setTongGioHang: any;
}

export const GioHangItem = createContext<GioHangType|undefined>(undefined);

export const GioHangProvider: React.FC<GioHangProps>=(props) =>{
const [gioHangList, setGioHangList] = useState<GioHangModel[]>([])
const [tongGioHang, setTongGioHang] = useState(0)

useEffect(()=>{
   const gioHangData = localStorage.getItem('cart')
   let gioHang = gioHangData?JSON.parse(gioHangData):[]
   setGioHangList(gioHang)
   setTongGioHang(gioHang.length)
},[])
return(
    <GioHangItem.Provider value={{gioHangList, setGioHangList, tongGioHang, setTongGioHang}}>
        {props.children}
    </GioHangItem.Provider>
)
}

export const useGioHangItem = ()=>{
    const context = useContext(GioHangItem);
    if(!context){
        throw new Error("Lỗi context");
    }
    return context;
}