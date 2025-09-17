import { useUser } from "../../hooks/useUser";

// Footer component that displays copyright and social media links
const Footer = () => {
  const { userName } = useUser();

  return (
    <footer className="footer p-3">
      <div className="footer-content">
        <div className="footer-section">
          {userName && (
            <p className="text-sm text-gray-600">Logged in as: {userName}</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
