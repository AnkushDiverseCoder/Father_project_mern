import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import {  Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { toast } from 'react-toastify';
import Iconify from '../../../components/iconify';
import { LoginRoute, verifyToken } from '../../../utils/ApiRoutes';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await axios.get(verifyToken,{withCredentials:true})
      if(data.status === "true"){
        navigate("/dashboard/app");
      }
    }
    checkUser()

  }, [navigate]);


  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, email } = values;
    if (email === "" && password === "") {
      toast.error("Email & Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(LoginRoute, {
        email,
        password,
      },{withCredentials: true});

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        (navigate("/dashboard/app"));
      }
    }
  };


  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3} className="mb-6">
        <TextField name="email" label="Email address" onChange={handleChange}/>

        <TextField
          name="password"
          label="Password"
          onChange={handleChange}
          autoComplete="false"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
    </>
  );
}
