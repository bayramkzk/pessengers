import CenterBox from "components/CenterBox";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const SignupBox = dynamic(() => import("components/SignupBox"), { ssr: false });

const LoginPage: NextPage = () => {
  return (
    <CenterBox>
      <SignupBox />
    </CenterBox>
  );
};

export default LoginPage;
