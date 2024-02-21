import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DangNhap = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [thongBao, setThongBao] = useState("")
    const navigate = useNavigate()
    const handleSubmit = () => {
        const loginRequest = {
            username: username,
            password: password
        };
            fetch('http://localhost:8080/tai-khoan/dang-nhap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginRequest)
            }
            )
            .then((response)=>{
                if(response.ok){
                    setThongBao("Đăng nhập thành công")
                    return response.json()
                    
                }else{
                    setThongBao("Sai tên đăng nhập hoặc mật khẩu")
                }
            }).then(
                (data)=>{
                    const {jwt} = data;
                    localStorage.setItem('token',jwt)
                    navigate("/")
                }
            ).catch((error)=>{
                console.log(error);
                
            })
        } 
        

    
    return (
<div className="container ">
    <h3 className="mt-3">Đăng Nhập</h3>
        <form className="form col-md-6 col-12 mt-4 mx-auto">
            
                <div className="form-outline">
                    <label className="form-label text-left">Username</label>
                    <input type="text" className="form-control"
                        value={username} onChange={(e) => setUsername(e.target.value)} />

                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" >Password</label>
                    <input type="password" id="form2Example2" className="form-control"
                        value={password} onChange={(e) => setPassword(e.target.value)} />

                </div>
                {thongBao && <div style={{ color: 'red' }}>{thongBao}</div>}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label className="form-check-label" > Remember me </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>

                <div className="text-center">
                    <p>Not a member? <a href="/dang-ky">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
           
        </form>
        </div>

    )
}

export default DangNhap;