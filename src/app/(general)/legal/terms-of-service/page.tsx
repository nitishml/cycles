import { PolicyCta } from "../privacy-policy/privacy-cta";
import TermsAndConditions from "./terms";


export default function AppPage() {
  return (
    <div className="min-h-screen flex flex-col w-full">

      
       
     <TermsAndConditions/>

      <PolicyCta/>
    </div>
  );
}

