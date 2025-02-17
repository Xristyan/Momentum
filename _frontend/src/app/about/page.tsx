import { Typography } from "@mui/material";

export default async function About() {
  //   let users = null;
  //   try {
  //     const response = await fetch("http://backend:8000/users");
  //     if (!response.ok) {
  //       return <Typography>Failed to fetch users</Typography>;
  //     }
  //     users = await response.json();
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (err: unknown) {
  //     return <Typography>Failed to fetch users</Typography>;
  //   }

  return (
    <>
      <Typography variant={"h1"}>About</Typography>
      {/* {users &&
        users.map((user: { id: number; name: string }) => (
          <Typography key={user.id}>{user.name}</Typography>
        ))} */}
    </>
  );
}
