import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


const Logo = ({
  width = 150,
  height = 150,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="Ethic"
        width={width}
        height={height}
        className={cn("h-[100px]", className)}
      />
    </Link>
  );
};

export default Logo;
