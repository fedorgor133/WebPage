import Input from '../ui/custom/Input';
import Button from '../ui/custom/Button';
import { useForm } from 'react-hook-form';
import { LoginFormType, LoginSchema } from '@/schemas/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosClient from '@/config/axiosClient';
import { User } from '@/config/types';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import useUserContext from '@/hooks/useUserContext';

function LoginForm() {
  const { logIn } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormType>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema)
  });

  async function onSubmit(data: LoginFormType) {
    axiosClient
      .post<User>('/users/login', data)
      .then((resp) => {
        logIn(resp.data);

        toast.success(`User ${resp.data.name} logged successfully`);
      })
      .catch((err: AxiosError<{ message?: string }>) => {
        toast.error(err.response?.data?.message || 'An unexpected error occurred');
        console.log(err.response?.data);
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-20 mt-8 grid gap-4">
      <Input
        className="w-full"
        label="Email"
        type="email"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        placeholder="Enter your email..."
        {...register('email')}
        error={errors.email}
      />
      <Input
        className="w-full"
        label="Password"
        type="password"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        placeholder="Enter your password..."
        {...register('password')}
        error={errors.password}
      />
      <Button
        disabled={!isValid}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-4"
        filled
      >
        Log in
      </Button>
    </form>
  );
}

export default LoginForm;
