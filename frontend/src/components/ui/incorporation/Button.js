import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from '../../styles/Button.module.css'; // Adjust the path as necessary

const Button = ({ onClick, children, href, disabled = false, variant = 'primary' }) => {
  const className = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'green', 'outline']),
};

export default Button;
