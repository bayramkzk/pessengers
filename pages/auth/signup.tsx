import CenterBox from "components/CenterBox";
import SignupBox from "components/SignupBox";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <CenterBox>
      <SignupBox />
    </CenterBox>
  );
};

export default LoginPage;
