import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div>Hello</div>
      <Button>Click here</Button>
      <UserButton />
    </>
  );
}
