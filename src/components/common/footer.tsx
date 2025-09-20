import { useUser } from "../../hooks/useUser";

// Footer component that displays copyright and social media links
const Footer = () => {
  const { user, logout } = useUser();

  return (
    <footer className="footer p-3">
      <div className="footer-content">
        <div className="footer-section flex justify-between items-center">
          {user && (
            <>
              <p className="text-sm text-gray-600">
                Logged in as: {user.name || user.email}
              </p>
              <button
                onClick={logout}
                className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer bg-transparent border-none"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
