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
          <aside className="border-border-body shadow-box-shadow sticky top-0 h-[502px] w-full max-w-[280px] rounded-lg border border-solid border-[#e5e5e5] p-2 text-lg">
            <UserSidebarMenu />
          </aside>
          {children}
        </div>
      </div>
    </section>
  );
}
