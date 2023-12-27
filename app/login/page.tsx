import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/products/FormWrap";
import LoginForm from "./LoginForm";
import { SafeUser } from "@/types";

const Login = async () => {
  const currentUser = await getCurrentUser() as SafeUser;
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  )
}

export default Login;