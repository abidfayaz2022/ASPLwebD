'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function ServicesSection() {

    const prevRef = useRef(null);
    const nextRef = useRef(null);


    return (<>
        <section className="services-section py-4 py-md-5 bg-light">
            <div className="container">
                <div className="row align-items-center mb-4 mb-md-5">
                    <div className="col-12 col-md-8 mb-3 mb-md-0">
                        <h2 className="display-5 fw-bold mb-2 mb-md-3" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
                            Our Comprehensive Services
                        </h2>
                        <p className="lead mb-0" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                            Discover our full range of financial and accounting solutions designed for global businesses and NRIs
                        </p>
                    </div>
                    <div className="col-12 col-md-4 text-md-end">
                        <Link href="/services" className="btn btn-outline-primary px-4 btn-responsive">
                            View All Services <i className="bi bi-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>

                <div className="services-slider-wrapper position-relative mb-4" data-aos="fade-up">


                    <div className="services-slider d-flex">

                    <div className="services-slider-nav">
                        <button  ref={prevRef} className="slider-arrow prev-arrow services-prev" aria-label="Previous services">
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        
                        <button ref={nextRef} className="slider-arrow next-arrow services-next" aria-label="Next services">
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>

                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            slidesPerView={3}
                            spaceBetween={5}

                        
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onInit={(swiper) => {
                                // Must be done in onInit to avoid null refs
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                         
                        >


                            <SwiperSlide>
                                <div className="px-2">
                                    <Link href="/services/incorporation" className="text-decoration-none">
                                        <div className="service-card h-100 position-relative p-4">
                                            <div className="position-absolute top-0 end-0 mt-3 me-3">
                                                <span className="badge badge-orange rounded-pill px-3 py-2">Featured</span>
                                            </div>
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-building fs-1"></i>
                                                </div>
                                                <h4 className="mb-0">Incorporation Services</h4>
                                            </div>
                                            <p className="mb-4">
                                                Seamless company setup across Singapore, UAE, Hong Kong, BVI, Cayman Islands, and more.
                                            </p>
                                            <ul className="list-unstyled mb-4">
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Multiple Jurisdictions</li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>End-to-End Support</li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i>Tax-Efficient Structures</li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>

                            {/* Service Card 2 */}
                            <SwiperSlide>
                                <div className="px-2">
                                    <Link href="/services" className="text-decoration-none">
                                        <div className="service-card h-100 p-4">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-file-earmark-text fs-1"></i>
                                                </div>
                                                <h4 className="mb-0">Corporate Secretarial</h4>
                                            </div>
                                            <p className="mb-4">
                                                End-to-end governance and compliance support to keep your business fully aligned with regulations.
                                            </p>
                                            <ul className="list-unstyled mb-4">
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Corporate Governance</li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Statutory Compliance</li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i>Regulatory Advisory</li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>

                            {/* Service Card 3 */}
                            <SwiperSlide>
                                <div className="px-2">
                                    <Link href="/services" className="text-decoration-none">
                                        <div className="service-card h-100 p-4">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-calculator fs-1"></i>
                                                </div>
                                                <h4 className="mb-0">Accounting Services</h4>
                                            </div>
                                            <p className="mb-4">
                                                Accurate, timely, and insightful accounting solutions to empower smart business decisions.
                                            </p>
                                            <ul className="list-unstyled mb-4">
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Financial Reporting</li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Management Accounts</li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i>Streamlined Bookkeeping</li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>

                            {/* Service Card 4 */}
                            <SwiperSlide>
                                <div className="px-2">
                                    <Link href="/services" className="text-decoration-none">
                                        <div className="service-card h-100 p-4">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-cash-coin fs-1"></i>
                                                </div>
                                                <h4 className="mb-0">Tax Advisory</h4>
                                            </div>
                                            <p className="mb-4">
                                                Tailored tax planning and compliance services for businesses and individuals across jurisdictions.
                                            </p>
                                            <ul className="list-unstyled mb-4">
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Tax Optimization</li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Cross-Border Planning</li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i>Compliance Management</li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>

                            {/* Service Card 5 */}
                            <SwiperSlide>
                                <div className="px-2">
                                    <Link href="/services" className="text-decoration-none">
                                        <div className="service-card h-100 p-4">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-people fs-1"></i>
                                                </div>
                                                <h4 className="mb-0">Legacy Planning</h4>
                                            </div>
                                            <p className="mb-4">
                                                Structuring personal and family wealth for protection, succession, and long-term sustainability.
                                            </p>
                                            <ul className="list-unstyled mb-4">
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Family Trust Structures</li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Wealth Protection</li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i>Succession Planning</li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>

                            {/* Service Card 6 */}
                            <SwiperSlide>
                                <div className="px-2">
                                    <Link href="/services" className="text-decoration-none">
                                        <div className="service-card h-100 p-4">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-graph-up fs-1"></i>
                                                </div>
                                                <h4 className="mb-0">Fund Administration</h4>
                                            </div>
                                            <p className="mb-4">
                                                Efficient, compliant, and customized administrative solutions for investment funds and family offices.
                                            </p>
                                            <ul className="list-unstyled mb-4">
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>NAV Calculation</li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i>Investor Reporting</li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i>Compliance Support</li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>


                        </Swiper>
                    </div>

                    {/* Slider Arrows */}
                  
                </div>
            </div>
        </section>

        <style jsx>
            {`
            /* Custom Styles for Homepage */
    .service-card h4,
    .service-card p,
    .service-card span {
        color: #333 !important; /* or use var(--text-dark) if you have it defined */
    }

    .service-icon i {
        color: #f7c600 !important; /* keep the icon yellow */
    }

    .service-card .bi-check-circle-fill {
        color: #f7c600 !important; /* keep check icons yellow */
    }

/* Arrow Fixes */
    /* Ensure slider container is relative */
    .services-slider-container {
        border-radius: 30px;
        overflow: hidden; 
        position: relative;
    }

    /* Fix the arrow wrapper to cover full slider area */
    .slider-controls {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        pointer-events: none; /* Prevent blocking interaction */
    }

    /* Arrows styling and proper vertical centering */

/* Button Fix */
.card-body {
    padding-bottom: 2.5rem;
}

.btn-orange {
    background-color: #f7c600;
    color: #000;
    border: none;
    border-radius: 30px;
    transition: 0.3s ease;
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.btn-orange:hover {
    background-color: #e6b800;
}

/* Other Styling (unchanged, included for continuity) */
.review-stack {
    position: relative;
}

.review-box {
    max-width: 90%;
}

.object-fit-cover {
    object-fit: cover;
}

.tools-section .badge {
    font-size: 0.8rem;
}

.service-icon {
    font-size: 2rem;
    color: var(--primary-color);
}

.service-card {
    transition: all var(--transition-speed) ease;
    position: relative;
    background-color: white;
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    height: 100%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    padding: 1.0rem; /* reduce padding inside cards */
    min-height: 320px; /* set a lower minimum height */
    height: auto; /* let them adjust naturally */
}


.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

    .service-card p {
        margin-bottom: 1rem; /* reduce space after paragraph */
    }

    .service-card ul {
        margin-bottom: 1rem; /* reduce space after list */
    }

    .service-card ul li {
        margin-bottom: 0.5rem; /* reduce gap between list items */
    }

.service-card .btn {
    opacity: 0.9;
    transition: all var(--transition-speed) ease;
}

.service-card:hover .btn {
    opacity: 1;
    transform: translateY(-3px);
}

/* Remove text underline inside featured slider cards */
.featured-service-card,
.featured-service-card *,
.featured-service-card h5,
.featured-service-card h6,
.featured-service-card span,
.featured-service-card li,
.featured-service-card a {
    text-decoration: none !important;
}

/* Responsive adjustments */
@media (max-width: 992px) {
    .review-box {
        max-width: 100%;
    }

    .service-card {
        margin-bottom: 1.5rem;
    }
}
        `}
        </style>

    </>

    );
}
