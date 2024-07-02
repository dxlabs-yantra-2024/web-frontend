import { getPageMetadata } from "@/helpers/getPageMetadata";
export const metadata = getPageMetadata("Doctors | Prescription");

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
