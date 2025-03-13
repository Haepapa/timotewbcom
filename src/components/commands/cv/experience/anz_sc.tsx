import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function anz_cs() {
  return (
    <div className="mt-2">
      <AccordionItem value="anz_cs">
        <p>
          <span className="text-term-gray">organisation:</span> Australia New
          Zealand Bank (ANZ)
        </p>
        <p>
          <span className="text-term-gray">position:</span> SAS Contractor
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2018
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            I optimised legacy code into efficient SAS data pipelines and
            redesigned the underlying data model to improve ad-hoc analysis. I
            worked closely with the business to understand their needs,
            documenting processes, as well as functional and non-functional
            requirements.
          </p>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
