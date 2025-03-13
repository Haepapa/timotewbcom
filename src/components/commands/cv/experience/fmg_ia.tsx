import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function fmg_ia() {
  return (
    <div className="mt-2">
      <AccordionItem value="fmg_ia">
        <p>
          <span className="text-term-gray">organisation:</span> Farmers Mutual
          Group (FMG)
        </p>
        <p>
          <span className="text-term-gray">position:</span> Information Analyst,
          Workflow Manager, Platform Administrator
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2012 - 2015
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            I managed the prioritisation and allocation of tasks for the team,
            facilitated Agile practices, and collaborated with stakeholders to
            address analytical and reporting needs, including the development of
            data products for senior management and operational users. I
            maintained and optimised the BI and Data Warehouse platform,
            overseeing user authentication, data backups, batch scheduling, and
            hardware maintenance, while ensuring seamless integration with IT
            infrastructure and external vendors.
          </p>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
