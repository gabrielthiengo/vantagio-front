import { useAuth } from '@/context/AuthProvider/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authenticateSchema, AuthSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<AuthSchema>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(authenticateSchema),
  });

  async function handleFormSubmit({ email, password }: AuthSchema): Promise<void | string> {
    setIsLoading(true);

    const { type, message } = await authenticate(email, password);

    if (type === 'error') {
      setIsLoading(false);
      toast.error(message);
      return '';
    }

    navigate('/');
  }

  return {
    isLoading,
    errors,
    isValid,
    register,
    handleSubmit,
    handleFormSubmit,
  };
};
