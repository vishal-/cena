import { useState, useEffect } from "react";
import supabase from "../../utils/supabase";

// Footer component that displays copyright and social media links
const Footer = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.name || user.email);
      }
    };

    getUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUserName(session.user.user_metadata?.name || session.user.email);
      } else {
        setUserName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
