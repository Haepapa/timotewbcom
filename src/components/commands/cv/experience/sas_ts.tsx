import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function sas_ts() {
  return (
    <div className="mt-2">
      <AccordionItem value="sas_ts">
        <p>
          <span className="text-term-gray">organisation:</span> SAS Institute
          New Zealand
        </p>
        <p>
          <span className="text-term-gray">position:</span> Technical
          Specialist, Platform Installation, Consultant
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2011 - 2012
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            I provided technical support and onsite consulting for SAS clients
            across the public and private sector, delivering training to
            optimise their use of SAS products. I supported internal IT
            operations, and worked in the implementation and maintenance of SAS
            software platforms for clients.
          </p>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
