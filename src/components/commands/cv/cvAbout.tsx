/**
 * Renders the "About Me" section of a curriculum vitae.
 *
 * This React functional component returns a static block containing a header and two paragraphs.
 * The header displays a bold "About Me" title, while the paragraphs provide a brief overview of
 * the subject's experience as a technical lead in data analytics and engineering, along with their
 * career aspirations.
 */
export default function cvAbout() {
  return (
    <div className="space-y-1">
      <span className="font-semibold">About Me</span>
      <p className="mt-2">
        I am an experienced technical lead specialising in data analytics and
        engineering, with a proven track record in delivering, leading teams and
        mentoring individuals. Based in Wellington, I balance being a parent
        with my passion for continuous learning.
      </p>
      <p className="mt-2">
        I am now seeking a position focused on data which will allow me to
        further hone my skills, the skills of others, and contribute to
        impactful projects.
      </p>
    </div>
  );
}
