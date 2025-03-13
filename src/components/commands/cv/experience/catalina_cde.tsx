import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function catalina_cde() {
  return (
    <div className="mt-2">
      <AccordionItem value="catalina_cde">
        <p>
          <span className="text-term-gray">organisation:</span> Catalina UK
        </p>
        <p>
          <span className="text-term-gray">position:</span> Campaign Data
          Executive, Data Analytics
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2019 - 2021
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            This UK based role focused on delivering insights from campaign
            analysis and developing models to understand buyer behaviours and
            improve campaign performance. I led the migration to a new Netezza
            database, automating source data ingestion and designing data models
            for analysis and reporting. I developed digital tools to automate
            manual processes, improving quality and streamlining integration
            with customer processes and systems.
          </p>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
