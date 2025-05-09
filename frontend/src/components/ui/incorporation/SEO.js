import Head from 'next/head';
import PropTypes from 'prop-types';

const SEO = ({
  title,
  description = 'The Angel Services - Professional business incorporation and registration services',
  keywords = 'business, incorporation, registration, services, company, Angel Services'
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string
};

export default SEO;
