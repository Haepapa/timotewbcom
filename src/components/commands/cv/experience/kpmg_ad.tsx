import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function kpmg_ad() {
  return (
    <div className="mt-2">
      <AccordionItem value="kpmg_ad">
        <p>
          <span className="text-term-gray">organisation:</span> KPMG
        </p>
        <p>
          <span className="text-term-gray">position:</span> Associate Director,
          Data Analytics & Engineering
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2022 - current
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            Lead the growth of the Data & Analytics practice by building team
            capability, driving business development initiatives, and delivering
            quality data solutions that create value for our clients.
          </p>
          <div className="mt-2">
            <ul className="list-disc list-inside ml-4">
              <li>
                <span className="font-semibold">Practice Leadership</span>: Data
                Science & Analytics Chapter Lead; driving practice growth
                through developing offerings, recruiting & defining career
                pathways, setting quality standards and setting strategic
                direction.
              </li>
              <li>
                <span className="font-semibold">Client Engagement</span>: Lead
                business development for justice sector clients and contract
                negotiations including risk, commercials, scope, and legal
                conditions.
              </li>
              <li>
                <span className="font-semibold">Project Delivery</span>: Lead
                the implementation of business intelligence, data modelling,
                cloud data platforms, and managed services across public and
                private sector clients.
              </li>
              <li>
                <span className="font-semibold">Team Management</span>: Manage a
                team of five direct reports, providing coaching to enhance their
                technical skills, foster career growth, and address performance
                challenges.
              </li>
              <li>
                <span className="font-semibold">Technical Expertise</span>: Act
                as a subject matter expert in data analytics and engineering,
                contributing to technical deliverables and supporting other team
                members.
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
