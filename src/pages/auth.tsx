import React, { useState } from "react";

const SignInSignUp: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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

  const handleSignInSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Sign In:", signInData);
  };

  const handleSignUpSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Sign Up:", signUpData);
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
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
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
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
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
