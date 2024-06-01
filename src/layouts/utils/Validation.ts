export const checkExistUsername = async (setErrorUsername: any, username: string) => {
    if (username.trim() === "") {
       return false;
    }
    if (username.trim().length < 8) {
       setErrorUsername("Tên đăng nhập phải chứa ít nhất 8 ký tự");
       return true;
    }
    const endpoint = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${username}`;
    // Call api
    try {
       const response = await fetch(endpoint);
       const data = await response.text();
 
       if (data === "true") {
          setErrorUsername("Username đã tồn tại!");
          return true;
       }
       return false;
    } catch (error) {
       console.log("Lỗi api khi gọi hàm kiểm tra username");
    }
 };
 export const checkExistEmail = async (setErrorEmail: any, email: string) => {
    const endpoint = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`
    // Call api
    try {
       const response = await fetch(endpoint);
       const data = await response.text();
       if (data === "true") {
          setErrorEmail("Email đã tồn tại!");
          return true;
       }
       return false;
    } catch (error) {
       console.log("Lỗi api khi gọi hàm kiểm tra email");
    }
 };
 

 export const checkPassword = (setErrorPassword: any, password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (password === "") {
       return false;
    } else if (!passwordRegex.test(password)) {
       setErrorPassword(
          "Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ và số."
       );
       return true;
    } else {
       setErrorPassword("");
       return false;
    }
 };
 export const checkRepeatPassword = (setErrorRepeatPassword: any, repeatPassword: string, password: string) => {
   if (repeatPassword !== password) {
      setErrorRepeatPassword("Mật khẩu không khớp.");
      return true;
   } else {
      setErrorRepeatPassword("");
      return false;
   }
};

 export const checkPhoneNumber = (setErrorPhoneNumber: any, phoneNumber: string) => {
   const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
   if (phoneNumber.trim() === "") {
      return false;
   } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
      setErrorPhoneNumber("Số điện thoại không đúng.");
      return true;
   } else {
      setErrorPhoneNumber("");
      return false;
   }
};