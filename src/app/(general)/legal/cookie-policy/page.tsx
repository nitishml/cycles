import { PolicyCta } from "../privacy-policy/privacy-cta";
import CookiesPolicy from "./cookies";


export default function AppPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">

      
        <CookiesPolicy/>
        <PolicyCta/>
     

      
    </div>
  );
}
