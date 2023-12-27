import React, { useRef, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  Image,
  Button,
  Checkbox,
  InputGroup,
  InputRightElement,
  Heading,
  FormErrorMessage,
  ChakraProvider,
} from "@chakra-ui/react";
import { CToaster, CToast } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { CgLogIn } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Config";
import showToast from "../../helper/toastFunction";
const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "must be at least 4 characters long"),
  });

  const handleLogin = () => {
    try {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userData) => {
          const user = userData.user;

          if (user) {
            navigate("/admin/dashboard");
            addToast(showToast);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          alert(err);

          setLoading(false);
        });
    } catch (error) {
      alert(error);
      console.log(error);
      setLoading(false);
    }
  };
  const [toast, addToast] = useState(0);
  const toaster = useRef();

  return (
    <ChakraProvider>
      <CToaster ref={toaster} push={toast} placement="top-end" />

      <Box
        width={"100%"}
        height={"100vh"}
        bgColor={"#454d55"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          width={"100%"}
          minHeight={"350.05px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          color={"#fff"}
        >
          <Box
            width={"360px"}
            h={"full"}
            color={"#fff"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Box marginBottom={"0.9rem"} textAlign={"center"}>
              <Image src={logo} height={50} backgroundSize={"cover"} />
            </Box>
            <Box
              borderTop={"3px solid #3f6791"}
              boxShadow={"0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)"}
              bgColor={"#343a40"}
              wordBreak={"break-word"}
              borderRadius={"0.25rem"}
              backgroundClip={"border-box"}
              width={"100%"}
              h={"full"}
            >
              <Box
                backgroundColor={"transparent"}
                borderBottom={"1px solid rgba(0,0,0,.125)"}
                padding={"0.75rem 1.25rem"}
                borderTopLeftRadius={"0.25rem"}
                borderTopRightRadius={"0.25rem"}
              >
                <Heading
                  as={"h3"}
                  fontSize={"1.1rem"}
                  fontWeight={"400"}
                  textAlign={"center"}
                >
                  Sign in to start your session
                </Heading>
                <Formik
                  enableReinitialize
                  initialValues={{
                    email,
                    password,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
                >
                  {(formik) => (
                    <Form>
                      <Box borderColor={"#6c757d"}>
                        <FormControl
                          w={"full"}
                          paddingTop={"20px"}
                          display={"grid"}
                          gridRowGap={"1rem"}
                          isInvalid={formik.errors.email}
                        >
                          <InputGroup display={"flex"} flexDirection={"column"}>
                            <Input
                              type={"email"}
                              name="email"
                              borderColor={"#6c757d"}
                              placeholder="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {formik.errors.email && (
                              <FormErrorMessage>
                                {formik.errors.email}
                              </FormErrorMessage>
                            )}

                            <InputRightElement width="4.5rem">
                              <MdOutlineMailOutline
                                fill="#777"
                                style={{ marginLeft: "20px" }}
                              />
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                        <FormControl
                          w={"full"}
                          paddingTop={"20px"}
                          display={"grid"}
                          gridRowGap={"1rem"}
                          marginBottom={"1rem"}
                          isInvalid={formik.errors.password}
                        >
                          <InputGroup display={"flex"} flexDirection={"column"}>
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              borderColor={"#6c757d"}
                              placeholder="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            {formik.errors.password && (
                              <FormErrorMessage>
                                {formik.errors.password}
                              </FormErrorMessage>
                            )}
                            <InputRightElement width="4.5rem">
                              {!showPassword ? (
                                <FaEye
                                  fill="#777"
                                  cursor={"pointer"}
                                  style={{ marginLeft: "20px" }}
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              ) : (
                                <FaEyeSlash
                                  fill="#777"
                                  cursor={"pointer"}
                                  style={{ marginLeft: "20px" }}
                                  onClick={() => setShowPassword(!showPassword)}
                                />
                              )}
                            </InputRightElement>
                            <FormErrorMessage></FormErrorMessage>
                          </InputGroup>
                        </FormControl>
                        <Box display={"flex"}>
                          <Checkbox flex={"1"}>Remember Me</Checkbox>
                          <Button
                            color={"#fff"}
                            loadingText="Loging in ..."
                            isLoading={loading}
                            bgColor={"#3f6791"}
                            _hover={{ opacity: "0.8" }}
                            _active={{ opacity: "0.8" }}
                            borderColor={"#3f6791"}
                            leftIcon={
                              <CgLogIn
                                size={22}
                                fontSize={"sm"}
                                style={{ marginTop: "3px" }}
                              />
                            }
                            rightIcon={"Sign In"}
                            type="submit"
                            borderRadius={"0"}
                            textAlign={"center"}
                          ></Button>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
