import { Logo } from "@/components/layout/logo";
import { CartButton } from "@/components/layout/cartbutton";
import { UserNav } from "@/components/layout/user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-10 shadow bg-orange-300">
      <div className="container ms-auto p-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center justify-center space-x-4">
          <CartButton />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
