import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// mocks_
import account from "../../../_mock/account";
import { verifyToken } from "../../../utils/ApiRoutes";



// Date
// Customer Name
// Amount Credited
// Narration 

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const navigate = useNavigate();
  const [email, setEmail] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token")
      const {data}  = await axios.post(verifyToken,{
        token
      });

      if(data.status==="false"){
        navigate("/login");
      }
        setEmail(data.email);
    }
    checkUser()

  }, [navigate]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };


  const handleClose = async (label) => {
    if(label === "Bank Entry"){
      navigate("/dashboard/BankingEntry")
    }else if(label === "Dashboard"){
      navigate("/dashboard");
    }
    setOpen(null);
  };

  const MENU_OPTIONS = [
    {
      label: "Dashboard",
      icon: "eva:home-fill",
    },
  ];
  if (email === "bagathsingh59@gmail.com") {
    MENU_OPTIONS.push({
      label: "Bank Entry",
      icon: "eva:home-fill",
    })
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/Login')
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>handleClose(option.label)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />
         
        <Stack sx={{ p: 1 }}>

        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap onClick={handleLogout} className="cursor-pointer">
            <p>Logout</p>
          </Typography>
        </Box>
        </Stack>
      </Popover>
    </>
  );
}
