import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Header from "components/Header";
import { NextPage } from "next";

const SeatmapPage: NextPage = () => {
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          paddingBlock: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Typography variant="h3" fontWeight={700} marginBottom={1}>
          Seat Map
        </Typography>

        <Typography variant="h4" fontWeight={700} marginBottom={1}>
          Boeing 737 Seatmap of Pessengers Users
        </Typography>

        <img src="https://media.united.com/images/Media%20Database/SDL/Travel/inflight/aircraft/737-800/737_800_(16_150)_V2_Vyku_1136x325px.jpg" />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" fontWeight={700} marginBottom={1}>
            Double adjacent seat groups (8)
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                {Array(2)
                  .fill(null)
                  .map((_, i) => (
                    <TableCell key={":2-" + i}>#{i + 1} Interests</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <TableRow>
                  {Array(2)
                    .fill(null)
                    .map((_, j) => (
                      <TableCell key={"::2-" + j}>-</TableCell>
                    ))}
                </TableRow>
              ))}
          </Table>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" fontWeight={700} marginBottom={1}>
            Triple adjacent seat groups (50)
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <TableCell key={":3" + i}>#{i + 1} Interests</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array(50)
                .fill(null)
                .map((_, i) => (
                  <TableRow>
                    {Array(3)
                      .fill(null)
                      .map((_, j) => (
                        <TableCell key={"::3" + j}>-</TableCell>
                      ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>

        <Button sx={{ width: "100%" }}>Reorganize with AI</Button>
      </Container>
    </>
  );
};

export default SeatmapPage;
