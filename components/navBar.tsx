import Image from "next/image";
import Logo from "@/public/Logo.png";

export default function Navbar() {
  return (
    <nav>
      <Image 
        src={Logo} 
        alt="Logo da Empresa" 
        width={100} 
        height={40} 
      />
    </nav>
  );
}