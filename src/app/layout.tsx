import "./globals.css";
import { Providers } from "@/providers/QueryClientProvider";

import { getPageMetadata } from "@/helpers/getPageMetadata";
import { SuspenseComponent } from "@/components/SuspenseComponent";

export const metadata = getPageMetadata("Doctors | Sign In");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bgGrey">
        <Providers>
          <SuspenseComponent>
            <div className="h-[100vh]">{children}</div>
          </SuspenseComponent>
        </Providers>
      </body>
    </html>
  );
}
