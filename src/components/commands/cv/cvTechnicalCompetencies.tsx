/**
 * Renders a CV section that displays technical competencies.
 *
 * This React functional component outputs a structured layout featuring:
 * - A title labeled "Technical Competencies".
 * - An unordered list of general technical competencies (e.g., Statistical Analysis, Data Visualisation).
 * - An unordered list of programming languages (e.g., Python, SQL, Go).
 * - An unordered list of technologies (e.g., Azure, Snowflake, Databricks).
 *
 * The component leverages semantic HTML to improve accessibility and readability.
 */
export default function cvTechnicalCompetencies() {
  return (
    <div className="space-y-1">
      <span className="font-semibold">Technical Competencies</span>
      <div className="mt-2">
        <ul className="list-disc list-inside ml-4">
          <li>Statistical Analysis</li>
          <li>Data Visualisation</li>
          <li>Data Engineering</li>
          <li>Data Architecture</li>
          <li>Business Intelligence</li>
        </ul>
      </div>
      <div className="mt-2">
        Programming Languages:
        <ul className="list-disc list-inside ml-4">
          <li>Python</li>
          <li>SQL</li>
          <li>Go</li>
          <li>Typescript</li>
          <li>SAS</li>
          <li>VBA</li>
        </ul>
      </div>
      <div className="mt-2">
        Technologies:
        <ul className="list-disc list-inside ml-4">
          <li>Azure</li>
          <li>Snowflake</li>
          <li>Databricks</li>
          <li>Power BI</li>
          <li>Netezza</li>
          <li>MS SQL Server</li>
          <li>Mongo DB</li>
          <li>Git</li>
          <li>Linux systems</li>
          <li>Figma</li>
          <li>Pyspark</li>
          <li>Terraform</li>
        </ul>
      </div>
    </div>
  );
}
