import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function msd_das() {
  return (
    <div className="mt-2">
      <AccordionItem value="msd_das">
        <p>
          <span className="text-term-gray">organisation:</span> Ministry of
          Social Development (MSD)
        </p>
        <p>
          <span className="text-term-gray">position:</span> Data Analyst,
          Simplification
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2015 - 2017
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            I collaborated with business units and source system owners to
            understand reporting and analytical needs, translating these into
            tailored solutions, including automated ministerial reporting and
            benefits analysis. I facilitated Agile practices as a Scrum Master,
            led workshops, and supported end-users with training in analytical
            tools, while contributing to technical development and data
            warehousing tasks.
          </p>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
