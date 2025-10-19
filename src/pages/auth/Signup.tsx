import CRForm from '@/components/form/CRForm';
import CRInput from '@/components/form/CRInput';
import CARButton from '@/components/ui/CARButton';
import { useSignupMutation } from '@/redux/features/auths/authApi';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


// interface ISignup{
//     name:string;
//     email:string;
//     phone:string; // need check backend
//     address:string;
//     password:string;
// }

const Signup = () => {
    const navigate = useNavigate();
    const [signup]=useSignupMutation()


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data:any)=>{
        const toastId = toast.loading('Sign up in process');

        const userInfo = {...data,role:"user"}
      
        try{
            const res = await signup(userInfo)
            if(res.data.success){
                toast.success(res.data.message,{id:toastId,duration:2000})
                navigate('/login');
            }
        }catch (err) {
      toast.error(`Something went wrong`, { id: toastId, duration: 2000 });
    }
        
        
        
    }

    return (
        <div className='2xl:p-20 p-4'>
            <div className='2xl:w-[60vw] md:w-[70vw] md:flex mx-auto 2xl:h-[80vh] my-auto rounded-3xl shadow-2xl  bg-primary/5'>
            
            <div className='w-full space-y-6 p-4 md:p-8  2xl:p-20'>
       <div className=''>
       <h4 className='text-3xl font-bold'>Create Account</h4>
       <p>Get Car Wash </p>
       </div>


<CRForm onSubmit={onSubmit}>
    <CRInput type='text' name='name' label='Full Name' />
    <div className='flex justify-between gap-4 '>
    <CRInput type='email' className='w-full' name='email' label='Email' />
    <CRInput type='text' className='w-full' name='phone' label='Phone' />
    </div>
    <CRInput type='text' name='address' label='Full Address' />
    <CRInput type='password' name='password' label='Password' />
    
    <CARButton className='text-xl px-4 p-1.5' text='Sign Up'/>
</CRForm>

             
            </div>
            <div className='md:py-20 py-10 px-4 w-full'>
                <div className='flex items-center gap-6'>
                <p>Already a member</p>
                <Link to='/login'>
                <CARButton text='Login' className='md:text-2xl px-8 md:px-8 p-2'/>
                </Link>
                </div>
                <img className='w-96 rounded-bl-[50px] rounded-tl-[150px] opacity-20 rounded-br-[180px] rounded-tr-[100px] my-10' src='https://i.postimg.cc/SK7SGMt0/sign-up.png' />
            </div>
            
            </div>
        </div>
    );
};

export default Signup;