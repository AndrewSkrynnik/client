import { ReactNode } from "react";

import { UserSidebarMenu } from "@/components/ui/user/UserSidebarMenu";

export default async function OfficeLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section>
      <div className="container">
        <div className="relative flex w-full gap-x-[40px] py-[40px]">
          <UserSidebarMenu />
          {children}
        </div>
      </div>
    </section>
  );
}
