import CRForm from '@/components/form/CRForm';
import CRInput from '@/components/form/CRInput';
import CARButton from '@/components/ui/CARButton';
import { useLoginMutation } from '@/redux/features/auths/authApi';
import { setUser, TUser } from '@/redux/features/auths/authSlice';
import { useAppDispatch } from '@/redux/hook';
import { verifyToken } from '@/utils/verifyToken';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading('Logging in');

    try {
      console.log('Attempting login with:', data);
      const res = await login(data).unwrap();
      console.log("Login Response:", res); // Debug line

      // FIX: Handle different response formats
      const token = res.token || res.data?.token || res.data?.accessToken;
      //const userData = res.user || res.data?.user;

      if (!token) {
        throw new Error('No token received from server');
      }

      const user = verifyToken(token) as TUser;
      dispatch(setUser({ user: user, token: token }));
      toast.success('Logged in successfully', { id: toastId, duration: 2000 });

      if (res.data?.needsPasswordChange) {
        // navigate('/change-password')
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error("Login error details:", err);
      
      // Better error handling for different types of errors
      let errorMessage = 'Something went wrong';
      
      if (err?.status === 'FETCH_ERROR') {
        errorMessage = 'Network error: Cannot reach the server. Please check if the backend is running.';
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="2xl:p-20 p-4">
      <div className="2xl:w-[60vw] md:w-[70vw] md:flex mx-auto 2xl:h-[80vh] my-auto rounded-3xl shadow-2xl  bg-primary/5">
        <div className="w-full space-y-6 p-4 md:p-8  2xl:p-20">
          <div className="">
            <h4 className="text-3xl font-bold">Login Now</h4>
            <p>Get Car Wash </p>
          </div>

          <CRForm onSubmit={onSubmit}>
            <CRInput type="email" name="email"  label="Email" />
            <CRInput type="password" name="password"  label="Password" />

            <CARButton className="text-xl px-4 p-1.5" text="Login" />
          </CRForm>
          
          <div className='flex gap-4'>
            <button onClick={() => onSubmit({
              email: "admin@programming-hero.com",
              password: "ph-password"
            })} className='md:p-2 px-2 p-1 md:px-4 bg-button-gradient rounded-md text-white'>
              Login as admin
            </button>
            <button onClick={() => onSubmit({
              email: "reviewer@carwash.com",
              password: "12345678"
            })} className='md:p-2 px-2 p-1 md:px-4 bg-button-gradient rounded-md text-white'>
              Login as user
            </button>
          </div>
        </div>
        <div className="md:py-20 py-10 px-4 w-full">
          <div className="flex items-center gap-6">
            <p>If Not Register Please sign up</p>
            <Link to="/signup">
              <CARButton
                text="Sign Up"
                className="md:text-xl px-2 md:px-4 p-2"
              />
            </Link>
          </div>
          <img
            className="w-96 rounded-bl-[50px] rounded-tl-[150px] opacity-20 rounded-r-[200px] my-10"
            src="https://i.postimg.cc/vTSHVw2c/Login-page.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;