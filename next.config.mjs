/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * Legacy URL preservation.
   *
   * The previous TheAppSense site was a WordPress install with a different
   * URL structure. These permanent redirects keep existing inbound links and
   * search-engine equity pointed at the matching page in the new IA.
   *
   * If/when these move to WordPress, mirror this map in the CMS or keep it here.
   */
  async redirects() {
    return [
      // WordPress service pages -> /services/*
      { source: "/managed-wordpress-hosting", destination: "/services/managed-wordpress-hosting", permanent: true },
      { source: "/wordpress-malware-removal", destination: "/services/malware-removal", permanent: true },
      { source: "/wordpress-malware-removal-old", destination: "/services/malware-removal", permanent: true },
      { source: "/speed-optimization", destination: "/services/speed-optimization", permanent: true },
      { source: "/wordpress-support", destination: "/services/wordpress-support", permanent: true },
      { source: "/wordpress-support-2", destination: "/services/wordpress-support", permanent: true },
      { source: "/wordpress-development-support", destination: "/services/website-maintenance", permanent: true },

      // Older expertise / dev pages
      { source: "/frontend-web-development", destination: "/services/web-development", permanent: true },
      { source: "/application-development", destination: "/services/web-development", permanent: true },
      { source: "/crmerp-development", destination: "/services/web-development", permanent: true },
      { source: "/content-management-systems", destination: "/services/wordpress-development", permanent: true },
      { source: "/ecommerce-platforms", destination: "/services/ecommerce", permanent: true },
      { source: "/digital-marketing-and-lead-generation", destination: "/services", permanent: true },
      { source: "/b2b-b2c-travel-portal-development", destination: "/services", permanent: true },
      { source: "/us-travel-payment-gateway", destination: "/services", permanent: true },
      { source: "/testing-by-appsense", destination: "/services", permanent: true },
      { source: "/pay-per-bug-software-testing", destination: "/services", permanent: true },
      { source: "/expertise", destination: "/services", permanent: true },
      { source: "/expertise/:slug*", destination: "/services", permanent: true },

      // Portfolio -> work
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/best-portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:slug*", destination: "/work", permanent: true },

      // Team -> about
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/team-page", destination: "/about", permanent: true },

      // Contact / quote
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/freequote", destination: "/contact", permanent: true },

      // Legal
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
