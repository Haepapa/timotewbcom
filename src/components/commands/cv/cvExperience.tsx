import { Accordion } from "@/components/ui/accordion";
import kpmg_ad from "./experience/kpmg_ad";
import kpmg_m from "./experience/kpmg_m";
import catalina_cde from "./experience/catalina_cde";
import anz_cs from "./experience/anz_sc";
import msd_das from "./experience/msd_das";
import fmg_ia from "./experience/fmg_ia";

export default function cvExperience() {
  return (
    <div className="space-y-1">
      <span className="font-semibold">My Experience</span>
      <Accordion type="single" collapsible className="w-full">
        {kpmg_ad()} {kpmg_m()} {catalina_cde()} {anz_cs()} {msd_das()}
        {fmg_ia()}
      </Accordion>
    </div>
  );
}
