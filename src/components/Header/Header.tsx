import Image from "next/image";
import Logo from "../../../public/assets/logo.svg";
const Header = () => {
  return (
    <div className="px-20 py-2 bg-white">
      <Image alt="Logo" src={Logo} />
    </div>
  );
};

export { Header };
