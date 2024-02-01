import React from "react";
export async function my_request(duongDan: string){
    const response = await fetch(duongDan);

    if(!response.ok){
        throw new Error(`Không thể lấy dữ liệu từ ${duongDan}`)
    }
    return response.json();
}