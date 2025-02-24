
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
   

      navigate("/login");
    
    } catch (error) {
      toast.error(error.response?.data?.msg || "Registration failed.");
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2 className="sign-up-heading">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="input-field"
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input-field"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input-field"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="sign-up-link">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
