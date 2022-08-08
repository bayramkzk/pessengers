import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { supabase } from "lib/supabase";
import React from "react";
import useStoreSignup from "stores/signup";
import { definitions } from "types/supabase";
import RadioGroupRating from "./RadioGroupRating";

interface SignupProfileStepProps {
  onNext: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignupProfileStep: React.FC<SignupProfileStepProps> = ({ onNext }) => {
  const [tags, insertTag, updateTag, deleteTag] = useStoreSignup((state) => [
    state.tags,
    state.insertTag,
    state.updateTag,
    state.deleteTag,
  ]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const user = supabase.auth.user();
    console.log(user);
    if (!user) throw new Error("User not found in SignupProfileStep");
    await supabase
      .from<definitions["tags"]>("tags")
      .delete()
      .eq("user_id", user.id);
    const { error } = await supabase.from<definitions["tags"]>("tags").insert(
      tags
        .filter((tag) => tag.name !== "" && tag.weight !== null)
        .map((tag) => ({
          name: tag.name,
          weight: tag.weight as number,
          user_id: user.id,
        }))
    );
    setLoading(false);
    setErrors(error ? error.message : null);
    if (!error) onNext(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        paddingBlock: "1.5rem",
        maxHeight: "50vh",
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" fontWeight={700} textAlign="center">
        Tags
      </Typography>

      <Typography>
        Please list down a couple of the topics and rate your interest or
        disinterest concerning the topic.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {tags.map((tag, index) => (
          <Box key={index} sx={{ display: "flex", gap: "1em" }}>
            <TextField
              label="Topic name"
              placeholder="Programming, Math, etc."
              type="text"
              value={tag.name}
              onChange={(e) => {
                updateTag(index, { ...tags[index], name: e.target.value });

                if (index === tags.length - 1) {
                  if (e.target.value) {
                    insertTag(index + 1, { name: "", weight: 0 });
                  }

                  if (!e.target.value && tags.length !== 1) {
                    deleteTag(index);
                  }
                }
              }}
              variant="standard"
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RadioGroupRating
                value={tag.weight}
                onChange={(_, value) => {
                  updateTag(index, { ...tags[index], weight: value });
                }}
              />
            </Box>

            <IconButton
              size="large"
              onClick={() => {
                if (tags.length === 1) return;
                deleteTag(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Button type="submit" variant="contained" disabled={loading}>
        Submit topic interests
      </Button>
    </form>
  );
};

export default SignupProfileStep;
