import { redirect } from "next/navigation"
import { LogoLoader } from "@component/Loaders"

export default function Home() {
  return redirect("/dashboard")
  // return <LogoLoader />
}
