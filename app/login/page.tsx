import Container from "../components/Container";
import FormWrap from "../components/products/FormWrap";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  )
}

export default Login;