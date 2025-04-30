import Link from 'next/link';

export default function ContactCTA() {
    return (<>
        <section
            className="contact-cta position-relative py-5 text-white"
            style={{
                background: 'linear-gradient(45deg, var(--primary-color), #e59b00, #ffc107)',
            }}
        >
            {/* Diagonal Lines Background Pattern */}
            <div className="diagonal-lines"></div>

            <div className="container position-relative z-index-1 py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="cta-card bg-white bg-opacity-10 p-5 rounded-4 backdrop-blur border border-white border-opacity-10 shadow-lg">
                            <div className="row align-items-center">
                                <div className="col-lg-8 mb-4 mb-lg-0">
                                    <h2 className="display-4 fw-bold mb-3 text-white">
                                        Ready to Start Your Global Business?
                                    </h2>
                                    <p className="lead mb-0 text-white">
                                        Contact our incorporation specialists to discuss your specific requirements.
                                    </p>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <Link href="/contact"
                                        className="btn btn-light btn-lg px-4 py-3 fw-semibold rounded-pill shadow-sm">
                                        <i className="bi bi-rocket-takeoff-fill me-2"></i> Get Started Today

                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="floating-elements">
                <div className="float-element float-1"></div>
                <div className="float-element float-2"></div>
                <div className="float-element float-3"></div>
                <div className="float-element float-4"></div>
            </div>
        </section>
        <style jsx>{`
        :global(:root) {
          --primary-color: #fcb900;
        }

        /* CTA Section */
.z-index-1 {
    z-index: 1;
}

.backdrop-blur {
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
}

.diagonal-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                     linear-gradient(225deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                     linear-gradient(315deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
                     linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%);
    background-size: 100px 100px;
    z-index: 0;
}

.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.float-element {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
}

.float-1 {
    width: 120px;
    height: 120px;
    top: 10%;
    left: 10%;
    animation: float 15s infinite ease-in-out;
}

.float-2 {
    width: 80px;
    height: 80px;
    top: 60%;
    left: 15%;
    animation: float 20s infinite ease-in-out reverse;
}

.float-3 {
    width: 50px;
    height: 50px;
    top: 30%;
    right: 20%;
    animation: float 18s infinite ease-in-out 1s;
}

.float-4 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    right: 10%;
    animation: float 22s infinite ease-in-out 2s;
}

@keyframes float {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }
    25% {
        transform: translate(20px, -20px) rotate(90deg);
    }
    50% {
        transform: translate(0, 40px) rotate(180deg);
    }
    75% {
        transform: translate(-20px, -20px) rotate(270deg);
    }
    100% {
        transform: translate(0, 0) rotate(360deg);
    }
}
      `}</style>
    </>
    );
}
