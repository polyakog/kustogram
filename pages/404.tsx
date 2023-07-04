import Image from "next/image";
import {getLayout} from "../components/Layout/BaseLayout/BaseLayout";
import Link from "next/link";

const NotFound = () => {
  return <div>
    <Image
    src="/404.svg"
    alt="Next.js Logo"
    width={1280}
    height={720}
    priority
  />
    <div>
      <Link href={'/'}>Back Main</Link>
    </div>

  </div>

}
NotFound.getLayout = getLayout
export default NotFound