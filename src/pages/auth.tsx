import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../utils/appwrite";
import { useUser } from "../hooks/useUser";
import { AppPath } from "../lib/app.config";

const SignInSignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useUser();

  // Redirect to main app if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate(AppPath.WEEK, { replace: true });
    }
  }, [user, navigate]);

  const [signInData, setSignInData] = useState({
    email: "",
    password: ""
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignInSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await account.createEmailPasswordSession(
        signInData.email,
        signInData.password
      );
      // Redirect will happen automatically via useEffect when user state updates
    } catch (error) {
      alert(error instanceof Error ? error.message : "Login failed");
    }
    setLoading(false);
  };

  const handleSignUpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      await account.create(
        "unique()",
        signUpData.email,
        signUpData.password,
        signUpData.name
      );
      alert("Account created successfully!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Account creation failed");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto mt-9">
      <h2 className="text-2xl font-bold text-center mb-3">
        {isSignUp ? "Sign Up" : "Sign In"}
      </h2>

      {!isSignUp ? (
        <div className="px-3">
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Email Address"
            type="email"
            value={signInData.email}
            onChange={(e) =>
              setSignInData({ ...signInData, email: e.target.value })
            }
          />
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Password"
            type="password"
            value={signInData.password}
            onChange={(e) =>
              setSignInData({ ...signInData, password: e.target.value })
            }
          />
          <button
            onClick={handleSignInSubmit}
            disabled={loading}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285f4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34a853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#ea4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </div>
          </button>
        </div>
      ) : (
        <div className="px-3">
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Full Name"
            value={signUpData.name}
            onChange={(e) =>
              setSignUpData({ ...signUpData, name: e.target.value })
            }
          />
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Email Address"
            type="email"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Password"
            type="password"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
          <input
            className="w-full p-3 mt-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Confirm Password"
            type="password"
            value={signUpData.confirmPassword}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                confirmPassword: e.target.value
              })
            }
          />
          <button
            onClick={handleSignUpSubmit}
            disabled={loading}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      )}

      <p className="text-center mt-4 text-gray-600">
        {!isSignUp ? "Not a user?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
        >
          {!isSignUp ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
};

export default SignInSignUp;
