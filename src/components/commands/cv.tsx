import cvAbout from "./cv/cvAbout";
import cvTechnicalCompetencies from "./cv/cvTechnicalCompetencies";

export default function cv(flags: string) {
  if (!flags) {
    flags = "";
  }
  const args = flags.split(" ");
  const option = args.length > 1 ? args[1].toLowerCase() : "";
  if (args.length === 1) {
    return (
      <div className="space-y-1">
        <p className="font-semibold">My Curriculum Vitae:</p>
        <p className="mt-2">
          Usage: <span className="cust-command-style">cv</span> [option]
        </p>
        <p>Options:</p>
        <p className="ml-4">-a, --about - About me</p>
        <p className="ml-4">
          -t, --technical-competencies - My technical competencies
        </p>
      </div>
    );
  } else {
    const arg = args[1].toLowerCase();
    if (option === "-a" || option === "--about") {
      return cvAbout();
    } else if (arg === "-t" || arg === "--technical-competencies") {
      return cvTechnicalCompetencies();
    } else {
      return <div className="space-y-1">Unknown option {option}.</div>;
    }
  }
}
