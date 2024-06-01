import React from "react"
function About() {
	return (
		<div className='w-100 h-100 d-flex align-items-center justify-content-center flex-column m-5'>
			<div className='w-50 h-50 p-3 rounded-5 shadow-4-strong bg-light'>
				<h3 className='text-center text-black'>Giới thiệu về Bookstore</h3>
				<hr />
				<div className='row'>
					<div className='col-lg-8'>
						<p>
							<strong>Tên website: </strong>Bookstore
						</p>
						<p>
							<strong>Địa chỉ: </strong>Tổ 1 thị trấn Đông Anh, Hà Nội
						</p>
						<p>
							<strong>Số điện thoại: </strong>0355562752
						</p>
						<p>
							<strong>Email: </strong>zuoq2110@gmail.com
						</p>
					</div>
					
				</div>
			</div>
			<div className='w-50 h-50 p-3 rounded-5 shadow-4-strong bg-light mt-3'>
				<h3 className='text-center text-black'>Google maps</h3>
				<hr />
				<div className='d-flex align-items-center justify-content-center'>
                <div style={{width:"100%"}}><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%C4%90%C3%B4ng%20Anh,%20H%C3%A0%20N%E1%BB%99i,%20Vi%E1%BB%87t%20Nam+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps devices</a></iframe></div>
				</div>
			</div>
		</div>
	);
}

export default About;
