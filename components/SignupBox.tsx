import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import useStoreSignup from "stores/signup";
import SignupAccountStep from "./SignupAccountStep";
import SignupProfileStep from "./SignupProfileStep";

const steps = [
  { label: "Create account", component: SignupAccountStep },
  { label: "Set up profile", component: SignupProfileStep },
];

const SignupBox: React.FC = () => {
  const router = useRouter();
  const { activeStep, nextStep } = useStoreSignup((state) => state);
  const currentStep = steps[activeStep];

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "28rem",
        width: "100%",
        gap: "2rem",
        padding: "1.5rem",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        marginBottom={2}
      >
        Sign Up
      </Typography>

      <Stepper activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <currentStep.component
        onNext={() => {
          if (activeStep === steps.length - 1) {
            router.push("/seatmap");
          } else {
            nextStep();
          }
        }}
      />
    </Paper>
  );
};

export default SignupBox;
