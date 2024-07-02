import { getPageMetadata } from "@/helpers/getPageMetadata";
export const metadata = getPageMetadata("Users | Sign up");

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
