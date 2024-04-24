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
                            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7718648167253!2d106.71648955933027!3d10.804613354430936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAx!5e0!3m2!1svi!2s!4v1699964965789!5m2!1svi!2s'
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