import cvAbout from "./cv/cvAbout";
import cvTechnicalCompetencies from "./cv/cvTechnicalCompetencies";

export default function cv(flags: string) {
  const args = flags.split(" ");
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
          -tc, --technical-competencies - My technical competencies
        </p>
      </div>
    );
  } else {
    if (args[1].toLowerCase() === "-a" || args[1].toLowerCase() === "--about") {
      return cvAbout();
    } else if (
      args[1].toLowerCase() === "-t" ||
      args[1].toLowerCase() === "--technical-competencies"
    ) {
      return cvTechnicalCompetencies();
    } else {
      return (
        <div className="space-y-1">Unknown option {args[1].toLowerCase()}.</div>
      );
    }
  }
}
