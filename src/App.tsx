import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { layToanBoSach } from './api/SachAPI';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/product/ChiTietSanPham';
import DangKyNguoiDung from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from './layouts/user/Test';
import ThemSach_Admin from './layouts/admin/ThemSach';
import Error403 from './layouts/Error/Error403';
import UserCheck from './layouts/user/UserAccount';
import { GioHangProvider } from './layouts/utils/GioHangContext';
import DanhSachGioHang from './layouts/product/components/cart/DanhSachGioHang';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
import 'react-toastify/dist/ReactToastify.css';
import ToanBoSach from './layouts/product/components/ToanBoSach';
import SachYeuThich from './layouts/product/components/SachYeuThich';
import Dashboard from './layouts/admin/Dashboard';
import { AuthProvider } from './layouts/utils/AuthContext';
import Sidebar from './layouts/admin/Sidebar';
import BookManagement from './layouts/admin/components/Book/BookManagement';
import GenreManagement from './layouts/admin/components/genre/GenreManagement';
import UserManagementPage from './layouts/admin/components/user/UserManagement';
import OrderManagementPage from './layouts/admin/components/order/OrderManagement';
function MyRoutes() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  return (
    <AuthProvider>
      <GioHangProvider>
        <ConfirmProvider>
          {!isAdminPath && <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
          <Routes>

            <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/sach/:maSach' element={<ChiTietSanPham />}></Route>
            <Route path='/kho-sach' element={<ToanBoSach />}></Route>
            <Route path='/kho-sach/:maTheLoaiParam' element={<ToanBoSach />}></Route>
            <Route path='/dang-ky' element={<DangKyNguoiDung />} />
            <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
            <Route path='/dang-nhap' element={<DangNhap />} />
            <Route path='/sach-yeu-thich' element={<SachYeuThich />} />
            <Route path='/test' element={<Test />} />
            <Route path='/admin/them-sach' element={<ThemSach_Admin />} />
            <Route path='/bao-loi-403' element={<Error403 />} />
            <Route path='/gio-hang' element={<DanhSachGioHang />} />
            <Route path='/nguoi-dung' element={<UserCheck />} />

          </Routes>
          {!isAdminPath && <Footer />}
          {/* admin */}
          {isAdminPath && (
            <div className='row overflow-hidden w-100'>
              <div className='col-2 col-md-3 col-lg-2'>
                <Sidebar/>
              </div>
              <div className='col-lg-10 col-md-9'>
                <Routes>
                  <Route path='/admin' element={<Dashboard></Dashboard>} />
                  <Route path='/admin/dashboard' element={<Dashboard/>} />
                  <Route path='/admin/book' element={<BookManagement/>} />
                  <Route path='/admin/user' element={<UserManagementPage/>} />
                  <Route path='/admin/genre' element={<GenreManagement/>} />
                  <Route path='/admin/order' element={<OrderManagementPage/>} />

                </Routes>
              </div>

            </div>
          )}
          <ToastContainer
            position='bottom-center'
            autoClose={3000}
            pauseOnFocusLoss={false}
          />
        </ConfirmProvider>
      </GioHangProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MyRoutes></MyRoutes>
    </BrowserRouter>
  )
}

export default App;
