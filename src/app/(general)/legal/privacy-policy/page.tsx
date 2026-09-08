import PrivacyPolicy from "./policy";
import { PolicyCta } from "./privacy-cta";

export default function AppPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">

      
        <PrivacyPolicy />
        <PolicyCta/>
     

      
    </div>
  );
}

