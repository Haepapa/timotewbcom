import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function kpmg_m() {
  return (
    <div className="mt-2">
      <AccordionItem value="kpmg_m">
        <p>
          <span className="text-term-gray">organisation:</span> KPMG
        </p>
        <p>
          <span className="text-term-gray">position:</span> Manager, Lighthouse
        </p>
        <p>
          <span className="text-term-gray">period:</span> 2021 - 2022
        </p>
        <AccordionTrigger>more</AccordionTrigger>
        <AccordionContent>
          <p>
            Led the delivery of high-quality data solutions, providing technical
            leadership and mentorship to the team.
          </p>
          <div className="mt-2">
            <ul className="list-disc list-inside ml-4">
              <li>
                <span className="font-semibold">Team Management</span>: Mentored
                junior staff, enhancing their technical and consulting skills,
                and supported their development pathways. Managed hiring for
                junior, graduate, and intern roles, including technical testing
                and interviewing.
              </li>
              <li>
                <span className="font-semibold">Client Engagement</span>:
                Contributed to business development by building client
                relationships and developing tailored solutions to address
                client needs.
              </li>
              <li>
                <span className="font-semibold">Project Delivery</span>: Led the
                implementation of small to mid-sized projects, ensuring quality
                and providing guidance to junior team members.
              </li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
