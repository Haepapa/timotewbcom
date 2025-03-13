import cvAbout from "./cv/cvAbout";
import cvTechnicalCompetencies from "./cv/cvTechnicalCompetencies";

/**
 * Renders a Curriculum Vitae view based on provided command-like flags.
 *
 * When no option is specified, it displays a usage guide with available CV sections. Specifying "-a" or "--about" returns the "About Me" section, while "-t" or "--technical-competencies" returns the technical competencies section. Any unrecognized option yields an error message.
 *
 * @param flags A space-separated string of options determining which CV section to display.
 *
 * @returns A JSX element corresponding to the selected CV section or the usage guide.
 */
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
