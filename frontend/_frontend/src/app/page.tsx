import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button variant={"contained"} color={"primary"}></Button>
      <Link href={"/about"}>About</Link>
    </>
  );
}
