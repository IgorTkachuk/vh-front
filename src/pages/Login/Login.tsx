import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { z } from 'zod';

import { useLoginMutation } from '../../api/authAPI/authApi';
import { useAppDispatch } from '../../hooks';
import { setCredentials } from '../../redux/slices/auth/auth';

import Logo from './vhs_logo.png';
import 'react-toastify/dist/ReactToastify.css';

const userSchema = z.object({
  user: z
    .string()
    .includes('.', { message: "Must contain symbol'.'." })
    .min(7, { message: 'Must be 7 or more character long' })
    .max(20, { message: 'Must be no more 20 character long.' }),
  password: z
    .string()
    .min(7, { message: 'Must be 7 or more character long.' })
    .max(20, { message: 'Must be no more 20 character long' }),
});

const Login: FC = () => {
  const loginRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log('from', location.state?.from);

  const [user, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errMsg, setErrMsg] = useState<string>('');

  const [errors, setErrors] = useState<
    z.ZodFormattedError<
      {
        user: string;
        password: string;
      },
      string
    >
  >({ _errors: [] });

  useEffect(() => {
    loginRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, password]);

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  };
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const validationResult = userSchema.safeParse({ user, password });

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      setErrors(errors);
      return;
    }

    login({
      login: user,
      password,
    })
      .unwrap()
      .then((userData) => {
        dispatch(setCredentials({ ...userData, user }));

        if (location.state !== null && 'from' in location.state) {
          navigate(location.state.from?.pathname);
        } else {
          navigate('/objupload');
        }
      })
      .catch((err) => {
        if (!('originalStatus' in err)) {
          setErrMsg('No server responce');
        } else if (err.originalStatus === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.originalStatus === 401) {
          toast.error('Невірний логін чи пароль!');
        } else {
          setErrMsg('Login Failed');
        }
      });
  };

  return (
    <div className="md:container h-screen flex flex-col justify-center items-center mx-auto">
      <div className="flex w-1/2 relative">
        <img src={Logo} className="mr-4 h-52" alt="logo" />
        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <p
            ref={errRef}
            className={errMsg !== '' ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <label className="block mb-2">
            <span className="text-sm font-medium">Login:</span>
            <input
              ref={loginRef}
              type="text"
              className="block border-2 border-indigo-600 rounded-lg hover:outline-blue-400 py-2 px-3 w-full"
              placeholder="Your login ..."
              value={user}
              onChange={handleLoginInput}
            />
            {errors.user !== null && (
              <span className="font-medium text-sm text-rose-600">
                {errors.user?._errors.join(', ')}
              </span>
            )}
          </label>
          <label className="block mb-5">
            <span className="text-sm font-medium">Password:</span>
            <input
              type="password"
              className="block border-2 border-indigo-600 rounded-lg hover:outline-blue-400 py-2 px-3 w-full"
              placeholder="Your password ..."
              value={password}
              onChange={handlePasswordInput}
            />
            {errors.password !== null && (
              <span className="font-medium text-sm text-rose-600">
                {errors.password?._errors.join(', ')}
              </span>
            )}
          </label>
          <button className="bg-indigo-500 py-2 px-3 rounded-md font-semibold text-white text-sm w-1/2 shadow-md hover:bg-indigo-700">
            Log in
          </button>
        </form>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default Login;
