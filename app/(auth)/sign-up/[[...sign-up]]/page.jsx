import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export default function Page() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <SignUp appearance={{ baseTheme: dark }} />
    </div>
  );
}
