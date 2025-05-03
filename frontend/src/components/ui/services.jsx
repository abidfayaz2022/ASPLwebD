'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

export default function ServicesSection() {

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);

    useEffect(() => {
        if (
            swiperInstance &&
            prevRef.current &&
            nextRef.current &&
            swiperInstance.params.navigation
        ) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.destroy();
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance, prevRef, nextRef]);

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


                    <div className="services-slider">
                        <button ref={prevRef} className="slider-arrow prev-arrow services-prev slick-arrow" aria-label="Previous services">
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <Swiper
                         loop={true}
                            modules={[Autoplay, Navigation]}
                            autoplay={{ delay: 2000 }}
                           
                            slidesPerView={3}
                            spaceBetween={5}
                            breakpoints={{
                                0: { slidesPerView: 1, spaceBetween: 8 },
                                770: { slidesPerView: 2, spaceBetween: 8 },
                                990: { slidesPerView: 3, spaceBetween: 12 },
                               
                            }}
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
                            onSwiper={setSwiperInstance}
                         
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
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Multiple Jurisdictions</span></li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>End-to-End Support</span></li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i> <span>Tax-Efficient Structures</span></li>
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
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Corporate Governance</span></li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Statutory Compliance</span></li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i> <span>Regulatory Advisory</span></li>
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
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Financial Reporting</span></li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Management Accounts</span></li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i> <span>Streamlined Bookkeeping</span></li>
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
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Tax Optimization</span></li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Cross-Border Planning</span></li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i><span>Compliance Management</span></li>
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
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i><span>Family Trust Structures</span></li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Wealth Protection</span></li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i> <span>Succession Planning</span></li>
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
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>NAV Calculation</span></li>
                                                <li className="d-flex align-items-center mb-2"><i className="bi bi-check-circle-fill me-2"></i> <span>Investor Reporting</span></li>
                                                <li className="d-flex align-items-center"><i className="bi bi-check-circle-fill me-2"></i> <span>Compliance Support</span></li>
                                            </ul>
                                            <div className="d-flex justify-content-end">
                                                <span className="btn btn-orange rounded-pill px-4">Learn More <i className="bi bi-arrow-right ms-2"></i></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>


                        </Swiper>
                        <button ref={nextRef} className="slider-arrow next-arrow services-next slick-arrow" aria-label="Next services">
                            <i className="bi bi-chevron-right"></i>
                        </button>
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

    .services-slider-container {
        border-radius: 30px;
        overflow: hidden; 
        position: relative;
    }

    .slider-controls {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        pointer-events: none; /* Prevent blocking interaction */
    }


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
    padding-bottom: 0rem;
    min-height: 400px; /* increased from 350px to 400px */
    height: auto; /* let them adjust naturally */
}


.service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

    .service-card p {
        margin-bottom: 1rem; /* reduce space after paragraph */
        color: #000 !important;
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

.services-slider-wrapper {
    position: relative;
    padding: 0 40px; /* Add padding to container */
    margin: 0 -40px; /* Compensate for padding to maintain layout */
}

.services-slider {
    position: relative;
    width: 100%;
}

.slider-arrow {
    position: absolute;
    top: 50%;

    opacity: 0.5;
    z-index: 999; /* Very high z-index */
    transform: translateY(-50%);
    background: #fff;
    border: 1px solid #eee;
    color: #f7c600;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
}

.prev-arrow {
    left: 0;
}

.next-arrow {
    right: 0;
}

.slider-arrow:hover {
    background: #f7c600;
    color: #fff;
    opacity: 1;
}

@media (max-width: 767px) {
    .services-slider-wrapper {
        padding: 0 30px;
        margin: 0 -30px;
    }
    
    .slider-arrow {
        width: 32px;
        height: 32px;
        font-size: 1.1rem;
    }
}

@media (max-width: 767px) {
    .service-card {
        padding: 0.75rem !important;
        min-height: 220px;
    }
    .service-card h4 {
        font-size: 1rem;
    }
    .service-card p,
    .service-card ul {
        font-size: 0.95rem;
    }
    .btn-orange {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
    }
}
        `}
        </style>

    </>

    );
}
