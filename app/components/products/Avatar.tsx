import Image from "next/image";
import { FaUserCircle } from 'react-icons/fa';

interface AvatarProps {
  src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return <Image src={src} className="rounded-full" width="30" height="30"  alt="Avatar" />
  }

  return <FaUserCircle size={24} />
}

export default Avatar;