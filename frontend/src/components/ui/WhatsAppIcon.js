import React from 'react';

const WhatsAppIcon = () => {
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number
    const phoneNumber = '6583308396'; // Replace with your actual WhatsApp number
    const message = 'Hello! I would like to know more about your services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const iconStyle = {
    position: 'fixed',
    bottom: '25px',
    left: '25px',
    backgroundColor: '#25D366',
    color: 'white',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    border: '2px solid white',
  };

  const iconHoverStyle = {
    ...iconStyle,
    transform: 'scale(1.1)',
    boxShadow: '0 6px 16px rgba(37, 211, 102, 0.4)',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={isHovered ? iconHoverStyle : iconStyle}
      onClick={handleWhatsAppClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Chat with us on WhatsApp"
    >
      <i className="bi bi-whatsapp" style={{ fontSize: '28px' }}></i>
    </div>
  );
};

export default WhatsAppIcon; 