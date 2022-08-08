import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { supabase } from "lib/supabase";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const LoginBox: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({ email, password });
    setLoading(false);

    if (error) setError(error.message);
    if (user) router.push("/");
  };

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "24rem",
        gap: "2rem",
        padding: "1.5rem",
      }}
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        marginBottom={2}
      >
        Login
      </Typography>

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

      {error && <Alert severity="error">{error}</Alert>}

      <Link href="/auth/signup" passHref>
        <a>
          <Typography color="Highlight">
            Don't have an account? Sign up here.
          </Typography>
        </a>
      </Link>

      <Button type="submit" variant="contained" disabled={loading}>
        Login
      </Button>
    </Paper>
  );
};

export default LoginBox;
