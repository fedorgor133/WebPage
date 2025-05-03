import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../ui/custom/Input';
import Button from '../ui/custom/Button';
import { SignUpFormType, SignUpSchema } from '@/schemas/userSchemas';
import Select from '../ui/custom/Select';
import axiosClient from '@/config/axiosClient';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { User } from '@/config/types';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignUpFormType>({
    mode: 'onChange',
    resolver: zodResolver(SignUpSchema)
  });

  async function onSubmit(data: SignUpFormType) {
    axiosClient
      .post<User>('/users/signup', data)
      .then((resp) => {
        console.log(resp.data);

        toast.success(`User ${resp.data.name} created successfully`);
      })
      .catch((err: AxiosError) => {
        toast.error(err.response?.data?.message);
        console.log(err.response?.data);
      });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-20 mt-8 grid gap-4">
      <Input
        className="w-full"
        label="Name"
        type="text"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        placeholder="Olivia"
        {...register('name')}
        error={errors.name}
      />
      <Input
        className="w-full"
        label="Email"
        type="email"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        placeholder="olivia@email.com"
        {...register('email')}
        error={errors.email}
      />
      <Select
        className="w-full"
        label="What is your role?"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        {...register('role')}
      >
        <option value="guest">Guest</option>
        <option value="host">Host</option>
      </Select>
      <Input
        className="w-full"
        label="Password"
        type="password"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        placeholder="Your password here..."
        {...register('password')}
        error={errors.password}
      />
      <Input
        className="w-full"
        label="Repeat Password"
        type="password"
        labelPosition="above"
        labelClassName="text-gray-600 mb-1"
        placeholder="Repeat your password..."
        {...register('repeatPassword')}
        error={errors.repeatPassword}
      />
      <Button
        disabled={!isValid}
        className="disabled:opacity-50 disabled:cursor-not-allowed w-full mt-4"
        filled
      >
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
