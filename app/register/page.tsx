import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/products/FormWrap";
import RegisterForm from "./RegisterForm";
import { SafeUser } from "@/types";

const Register = async () => {
  const currentUser = await getCurrentUser() as SafeUser;
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  )
}

export default Register;