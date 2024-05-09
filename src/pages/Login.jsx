import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import { object, string } from "yup";
// import { login } from "../services/useApiRequest";
import useApiRequest from "../services/useApiRequest";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Login = () => {
  const { login } = useApiRequest();
  const loginSchema = object({
    password: string()
      .required("şifresiz olmaz")
      .matches(/\d+/, "şifre en az 1 rakam içermelidir")
      .matches(/[a-z]/, "şifre en az 1 küçük harf içermelidir")
      .matches(/[A-Z]/, "şifre en az 1 büyük harf içermelidir")
      .matches(/[@$!%*?&]+/, "şifre en az 1 özel karakter(@$!%*?&) içermelidir")
      .min(8, "en az 8 karakter olmalıdır"),

    email: string()
      .email("geçerli bir email giriniz")
      .required("email zorunludur"),
  });
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Typography
                      
                      variant="body2"
                    >
                      test2@test.com
                      <ContentCopyIcon onClick={() => {
                        navigator.clipboard.writeText("test2@test.com");
                      }}
                      style={{ cursor: "pointer" }}/>
                    </Typography>
                    <TextField
                      label="Email"
                      name="email"
                      id="email"
                      type="email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Typography
                      
                      variant="body2"
                    >
                      Aa!12345
                      <ContentCopyIcon onClick={() => {
                        navigator.clipboard.writeText("Aa!12345");
                      }}
                      style={{ cursor: "pointer" }}/>
                    </Typography>
                    <TextField
                      label="password"
                      name="password"
                      id="password"
                      type="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
