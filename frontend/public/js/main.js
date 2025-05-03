// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Form validation enhancement
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Initialize financial chart if element exists
    const chartCanvas = document.getElementById('financialChart');
    if (chartCanvas) {
        let financialChart;

        // Function to update chart data
        const updateChart = async (period) => {
            try {
                const response = await fetch(`/api/financial-data/${period}`);
                const data = await response.json();

                if (financialChart) {
                    financialChart.destroy();
                }

                financialChart = new Chart(chartCanvas, {
                    type: 'line',
                    data: {
                        labels: data.labels,
                        datasets: [{
                            label: 'Revenue',
                            data: data.revenue,
                            borderColor: '#28a745',
                            backgroundColor: 'rgba(40, 167, 69, 0.1)',
                            fill: true
                        }, {
                            label: 'Expenses',
                            data: data.expenses,
                            borderColor: '#dc3545',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)',
                            fill: true
                        }, {
                            label: 'Profit',
                            data: data.profit,
                            borderColor: '#007bff',
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                top: 10,
                                right: 20,
                                bottom: 10,
                                left: 20
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    callback: function (value) {
                                        return '₹' + value.toLocaleString();
                                    }
                                }
                            }
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString();
                                    }
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        // Add click handlers for period buttons
        document.querySelectorAll('[data-period]').forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                updateChart(period);

                // Update active button state
                document.querySelectorAll('[data-period]').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            });
        });

        // Initialize with monthly data
        updateChart('monthly');
    }
});

// Navbar scroll behavior
// Workflow animation
document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to workflow steps sequentially
                const steps = entry.target.querySelectorAll('.workflow-step');
                steps.forEach((step, index) => {
                    setTimeout(() => {
                        step.classList.add('visible');
                    }, index * 300);
                });

                // Animate the connecting lines
                const lines = entry.target.querySelectorAll('.workflow-line');
                lines.forEach(line => {
                    line.classList.add('animate');
                });
            }
        });
    }, { threshold: 0.3 });

    // Observe the workflow container
    const workflowContainer = document.querySelector('.workflow-container');
    if (workflowContainer) {
        observer.observe(workflowContainer);
    }
});
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
