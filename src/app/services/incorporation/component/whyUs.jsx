export default function WhyUs() {
    return (
        <section className="why-us py-5" style={{ backgroundColor: '#EAF2FD' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="display-4 fw-bold text-dark mb-2">Why ASPL Consultancy?</h2>
                    <div className="divider-center mb-4">
                        <span className="bg-primary"></span>
                    </div>
                    <p className="lead col-md-8 mx-auto text-dark">
                        Our competitive advantages in global incorporation services
                    </p>
                </div>

                <div className="row justify-content-center g-4">
                    {[
                        {
                            icon: 'bi-globe-americas',
                            title: 'Multi-market Expertise',
                            desc:
                                "Deep understanding of each jurisdiction's regulatory and tax environment.",
                            badge: 'Global Network',
                        },
                        {
                            icon: 'bi-pin-map-fill',
                            title: 'Localized Execution',
                            desc: 'On-ground partners and professionals ensure timely and compliant setup.',
                            badge: 'Local Knowledge',
                        },
                        {
                            icon: 'bi-puzzle-fill',
                            title: 'Integrated Services',
                            desc:
                                'From incorporation to accounting, tax, and advisory—we support your business lifecycle.',
                            badge: 'Complete Support',
                        },
                    ].map((item, idx) => (
                        <div className="col-md-4" key={idx}>
                            <div className="card h-100 border-0 shadow-lg feature-card rounded-4 overflow-hidden">
                                <div className="card-body text-center p-5">
                                    <div
                                        className="icon-circle mx-auto mb-4 d-inline-flex align-items-center justify-content-center bg-primary rounded-circle shadow-lg"
                                        style={{ width: '100px', height: '100px' }}
                                    >
                                        <i className={`bi ${item.icon} fs-1 text-white`}></i>
                                    </div>
                                    <h3 className="mb-3 fw-bold text-dark">{item.title}</h3>
                                    <p className="mb-4 text-dark">{item.desc}</p>
                                    <div className="feature-badge">
                                        <span className="badge bg-primary px-3 py-2 rounded-pill fw-semibold">
                                            {item.badge}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
