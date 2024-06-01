import React from "react"

function Footer() {
    return (


        <footer className="text-center pt-5" style={{ backgroundColor: "#3b71ca"}}>
            <div className="container ">
                <section className='mb-4'>
                    {/* <!-- Facebook --> */}
                    <a
                        className='btn btn-outline-light btn-floating m-1'
                        href='#!'
                        role='button'
                    >
                        <i className='fab fa-facebook-f'></i>
                    </a>

                    {/* <!-- Twitter --> */}
                    <a
                        className='btn btn-outline-light btn-floating m-1'
                        href='#!'
                        role='button'
                    >
                        <i className='fab fa-twitter'></i>
                    </a>

                    {/* <!-- Google --> */}
                    <a
                        className='btn btn-outline-light btn-floating m-1'
                        href='#!'
                        role='button'
                    >
                        <i className='fab fa-google'></i>
                    </a>

                    {/* <!-- Instagram --> */}
                    <a
                        className='btn btn-outline-light btn-floating m-1'
                        href='#!'
                        role='button'
                    >
                        <i className='fab fa-instagram'></i>
                    </a>

                    {/* <!-- Linkedin --> */}
                    <a
                        className='btn btn-outline-light btn-floating m-1'
                        href='#!'
                        role='button'
                    >
                        <i className='fab fa-linkedin-in'></i>
                    </a>

                    {/* <!-- Github --> */}
                    <a
                        className='btn btn-outline-light btn-floating m-1'
                        href='#!'
                        role='button'
                    >
                        <i className='fab fa-github'></i>
                    </a>
                </section>
                <div className="row  text-white">
                    <div className="col-6 col-md-2 mb-3 ">
                        <h5>Section</h5>
                        <ul className="nav flex-column " >
                            <li className="nav-item mb-2"><a href="#" className=" nav-link p-0 text-white" >Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className=" nav-link p-0 text-white">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className=" nav-link p-0 text-white">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className=" nav-link p-0 text-white">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className=" nav-link p-0 text-white">About</a></li>
                           
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About</a></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-2 mb-3">
                        <h5>Section</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Home</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Features</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Pricing</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">FAQs</a></li>
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About</a></li>
                        </ul>
                    </div>
                    <div className='col-lg-6 col-md-12'>
                        <iframe
                            title='map'
                            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%C4%90%C3%B4ng%20Anh,%20H%C3%A0%20N%E1%BB%99i,%20Vi%E1%BB%87t%20Nam+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            width='500'
                            height='200'
                            style={{ border: 0 }}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        ></iframe>
                    </div>
                    
                </div>
            </div>
            <div className="text-center p-3 text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        <p>&copy; 2023 Company, Inc. All rights reserved.</p>

                    </div>
        </footer>

    );
}
export default Footer;