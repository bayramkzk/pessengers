import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { supabase } from "lib/supabase";
import Link from "next/link";
import React from "react";

interface SignupAccountStepProps {
  onNext: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignupAccountStep: React.FC<SignupAccountStepProps> = ({ onNext }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    const { user, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) setError(error.message);
    if (user) onNext(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        paddingBlock: "1.5rem",
      }}
    >
      <TextField
        type="email"
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link href="/auth/login" passHref>
        <a>
          <Typography color="Highlight">
            Already have an account? Login here.
          </Typography>
        </a>
      </Link>

      {error && <Alert severity="error">{error}</Alert>}

      <Button type="submit" variant="contained" disabled={loading}>
        Create Account
      </Button>
    </form>
  );
};

export default SignupAccountStep;
