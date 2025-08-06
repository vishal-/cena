// Footer component that displays copyright and social media links
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>

        <div className="footer-section">
          <div className="social-links">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
