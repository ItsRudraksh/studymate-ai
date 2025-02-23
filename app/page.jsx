import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Home() {
  return (
    <>
      <div>Hello</div>
      <Button>Click here</Button>
      <UserButton appearance={dark} />
    </>
  );
}
