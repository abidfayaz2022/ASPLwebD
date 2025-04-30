export default function ServicesOffered() {
    return (
        <section className="services-offered py-5" style={{ backgroundColor: '#ffffff' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold text-dark mb-2">What We Offer</h2>
                    <div className="divider-center mb-4">
                        <span className="bg-primary"></span>
                    </div>
                    <p className="lead col-md-8 mx-auto text-dark">
                        Comprehensive incorporation services for your global business
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <div className="card border-0 shadow-lg rounded-4 border-top border-primary border-4">
                            <div className="card-body p-4 p-lg-5">
                                <div className="row g-4">
                                    {/* Service Item */}
                                    {[
                                        {
                                            icon: 'bi-clipboard-check',
                                            title: 'Jurisdiction-specific advisory',
                                            desc: 'Tailored guidance on the most suitable structure for your business objectives.',
                                        },
                                        {
                                            icon: 'bi-file-earmark-text',
                                            title: 'End-to-end incorporation',
                                            desc: 'Complete support with regulatory approvals and documentation.',
                                        },
                                        {
                                            icon: 'bi-people',
                                            title: 'Local nominee directors',
                                            desc: 'Professional representatives where required by local regulations.',
                                        },
                                        {
                                            icon: 'bi-bank',
                                            title: 'Bank account facilitation',
                                            desc: 'Assistance with corporate account setup in appropriate jurisdictions.',
                                        },
                                        {
                                            icon: 'bi-clipboard-data',
                                            title: 'Corporate compliance support',
                                            desc: "Regular maintenance of your company's statutory requirements.",
                                        },
                                        {
                                            icon: 'bi-gear',
                                            title: 'Operational integration',
                                            desc: 'Comprehensive business services to get your operations running smoothly.',
                                        },
                                    ].map((service, idx) => (
                                        <div className="col-md-6" key={idx}>
                                            <div
                                                className="service-item d-flex p-4 rounded-4 hover-lift border"
                                                style={{ borderColor: 'rgba(13, 110, 253, 0.1)' }}
                                            >
                                                <div className="flex-shrink-0 me-4">
                                                    <div
                                                        className="service-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                                                        style={{ width: '64px', height: '64px' }}
                                                    >
                                                        <i className={`bi ${service.icon} fs-3`}></i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="fw-bold text-dark mb-2">{service.title}</h4>
                                                    <p className="mb-0 text-dark">{service.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* End Service Item */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
