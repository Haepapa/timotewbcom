import cvAbout from "./cv/cvAbout";
import cvTechnicalCompetencies from "./cv/cvTechnicalCompetencies";

/**
 * Renders a curriculum vitae view based on provided command-line flags.
 *
 * The input string is split into tokens using spaces. If only the command is present, a default CV overview is displayed,
 * including the title, usage instructions, and available options. When an additional token is provided, the function
 * renders a specific section based on the flag:
 *
 * - '-a' or '--about': Renders the "About Me" section.
 * - '-t' or '--technical-competencies': Renders the "Technical Competencies" section.
 *
 * If the flag does not match any recognized option, a message indicating the unknown option is displayed.
 *
 * @param flags - A space-separated string where the first token is the command and subsequent tokens (if any) specify the section to display.
 * @returns A React element representing the CV view for the specified option.
 */
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
