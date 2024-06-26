import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { IEntity } from "../../modules/auth/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context";
import { alert } from "../../utils";

interface RegisterProps {}

const defaultTheme = createTheme();

const Register: FunctionComponent<RegisterProps> = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<IEntity.RegisterValues>({
    defaultValues: {
      name: "",
      email: "",
      key: "",
      secret: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: IEntity.RegisterValues) => {
    setLoading(true);
    try {
      const allData = {
        name: data.name,
        email: data.email,
        key: data.key,
        secret: data.secret,
      };

      const response = await axios.post(
        "https://no23.lavina.tech/signup",
        allData
      );

      if (response.status === 200) {
        auth(response.data.data);
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        alert.error("An error occurred");
      }
    } catch (error: any) {
      setLoading(false);
      alert.error(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          width="430px"
          display="flex"
          alignItems="center"
          flexDirection="column"
          mt={8}
          borderRadius="12px"
          padding="48px 28px"
          bgcolor="var(--foundation-white-white-50, #FEFEFE)"
        >
          <Typography
            fontSize="36px"
            fontStyle="normal"
            fontWeight="700"
            color="--foundation-grey-grey-900, #151515"
            lineHeight="normal"
          >
            Sign Up
          </Typography>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "4px",
              background: "none",
              width: "100%",
              height: "40px",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.16 12.1932C20.16 11.5905 20.1059 11.0109 20.0055 10.4546H12V13.7425H16.5745C16.3775 14.805 15.7786 15.7053 14.8784 16.308V18.4407H17.6254C19.2327 16.9609 20.16 14.7819 20.16 12.1932Z"
                fill="#4285F4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 20.5C14.295 20.5 16.2191 19.7389 17.6255 18.4407L14.8784 16.308C14.1173 16.818 13.1436 17.1193 12 17.1193C9.78612 17.1193 7.91226 15.6241 7.24384 13.615H4.40407V15.8173C5.80271 18.5953 8.67726 20.5 12 20.5Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.24385 13.6151C7.07385 13.105 6.97726 12.5603 6.97726 12C6.97726 11.4398 7.07385 10.895 7.24385 10.385V8.18277H4.40407C3.82839 9.33027 3.49998 10.6285 3.49998 12C3.49998 13.3716 3.82839 14.6698 4.40407 15.8173L7.24385 13.6151Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.88072C13.2479 6.88072 14.3684 7.30958 15.2493 8.15186L17.6873 5.7139C16.2152 4.3423 14.2911 3.50003 12 3.50003C8.67726 3.50003 5.80271 5.40481 4.40407 8.18277L7.24384 10.385C7.91225 8.37595 9.78612 6.88072 12 6.88072Z"
                fill="#EA4335"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "4px",
              background: "none",
              width: "100%",
              height: "40px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.5 20.9C6.25 20.15 3 16.45 3 12C3 7.05 7.05 3 12 3C16.95 3 21 7.05 21 12C21 16.45 17.75 20.15 13.5 20.9L13 20.5H11L10.5 20.9Z"
                fill="url(#paint0_linear_1336_146)"
              />
              <path
                d="M15.5 14.5L15.9 12H13.5V10.25C13.5 9.55 13.75 9 14.85 9H16V6.7C15.35 6.6 14.65 6.5 14 6.5C11.95 6.5 10.5 7.75 10.5 10V12H8.24999V14.5H10.5V20.85C11 20.95 11.5 21 12 21C12.5 21 13 20.95 13.5 20.85V14.5H15.5Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1336_146"
                  x1="12"
                  y1="20.377"
                  x2="12"
                  y2="3"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0062E0" />
                  <stop offset="1" stop-color="#19AFFF" />
                </linearGradient>
              </defs>
            </svg>{" "}
            <span>Continue with Facebook</span>
          </button>

          <Box mt={2}>
            <svg
              width="374"
              height="16"
              viewBox="0 0 374 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="7.5" x2="374" y2="7.5" stroke="#24272C" />
              <rect
                width="48"
                height="15"
                transform="translate(163 0.5)"
                fill="#FEFEFE"
              />
              <path
                d="M178.955 8.264C178.955 7.368 179.107 6.6 179.411 5.96C179.723 5.312 180.167 4.812 180.743 4.46C181.327 4.108 182.027 3.932 182.843 3.932C183.635 3.932 184.323 4.108 184.907 4.46C185.491 4.812 185.939 5.312 186.251 5.96C186.571 6.6 186.731 7.364 186.731 8.252C186.731 9.148 186.571 9.92 186.251 10.568C185.931 11.216 185.479 11.72 184.895 12.08C184.319 12.432 183.635 12.608 182.843 12.608C182.027 12.608 181.331 12.432 180.755 12.08C180.179 11.72 179.735 11.216 179.423 10.568C179.111 9.92 178.955 9.152 178.955 8.264ZM179.999 8.264C179.999 9.352 180.239 10.204 180.719 10.82C181.199 11.428 181.907 11.732 182.843 11.732C183.739 11.732 184.435 11.428 184.931 10.82C185.435 10.204 185.687 9.352 185.687 8.264C185.687 7.168 185.439 6.32 184.943 5.72C184.447 5.112 183.747 4.808 182.843 4.808C181.907 4.808 181.199 5.112 180.719 5.72C180.239 6.32 179.999 7.168 179.999 8.264ZM188.536 12.5V4.04H191.992C192.88 4.04 193.568 4.252 194.056 4.676C194.544 5.092 194.788 5.676 194.788 6.428C194.788 6.924 194.676 7.348 194.452 7.7C194.236 8.044 193.928 8.308 193.528 8.492C193.136 8.676 192.676 8.768 192.148 8.768L192.364 8.612H192.604C192.932 8.612 193.224 8.692 193.48 8.852C193.744 9.012 193.952 9.28 194.104 9.656L195.304 12.5H194.212L193.06 9.704C192.924 9.344 192.72 9.112 192.448 9.008C192.176 8.896 191.836 8.84 191.428 8.84H189.532V12.5H188.536ZM189.532 8.06H191.848C192.488 8.06 192.972 7.924 193.3 7.652C193.636 7.372 193.804 6.972 193.804 6.452C193.804 5.932 193.636 5.536 193.3 5.264C192.972 4.992 192.488 4.856 191.848 4.856H189.532V8.06Z"
                fill="#24272C"
              />
            </svg>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("name", {
                required: "Name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="dense"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              size="small"
              autoFocus
              InputLabelProps={{
                sx: {
                  color: "var(--foundation-grey-grey-900, #151515)",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "120%",
                },
              }}
              sx={{
                borderRadius: "6px",
                border: "1px solid #EBEBEB",
                background: "#FEFEFE",
                boxShadow: "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
              }}
            />

            <TextField
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              size="small"
              margin="dense"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              id="email"
              InputLabelProps={{
                sx: {
                  color: "var(--foundation-grey-grey-900, #151515)",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "120%",
                },
              }}
              sx={{
                borderRadius: "6px",
                border: "1px solid #EBEBEB",
                background: "#FEFEFE",
                boxShadow: "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
              }}
            />

            <TextField
              {...register("key", {
                required: "Key is required",
              })}
              error={!!errors.key}
              helperText={errors.key?.message}
              size="small"
              margin="dense"
              required
              fullWidth
              name="key"
              label="Key"
              type="key"
              id="key"
              InputLabelProps={{
                sx: {
                  color: "var(--foundation-grey-grey-900, #151515)",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "120%",
                },
              }}
              sx={{
                borderRadius: "6px",
                border: "1px solid #EBEBEB",
                background: "#FEFEFE",
                boxShadow: "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
              }}
            />

            <TextField
              {...register("secret", {
                required: "Secret is required",
              })}
              error={!!errors.secret}
              helperText={errors.secret?.message}
              size="small"
              margin="dense"
              required
              fullWidth
              name="secret"
              label="Secret"
              type="secret"
              id="secret"
              InputLabelProps={{
                sx: {
                  color: "var(--foundation-grey-grey-900, #151515)",
                  fontFeatureSettings: "'clig' off, 'liga' off",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "120%",
                },
              }}
              sx={{
                borderRadius: "6px",
                border: "1px solid #EBEBEB",
                background: "#FEFEFE",
                boxShadow: "0px 4px 18px 0px rgba(51, 51, 51, 0.04)",
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#6200EE" }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <span
                  color="--foundation-grey-grey-500, #333"
                  style={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    lineHeight: "120%",
                  }}
                >
                  Do you have an Account?{" "}
                </span>
                <Link href="/auth/login" variant="body2">
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
