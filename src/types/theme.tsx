export type themeClassesType = {
  name?: string;
  header: string;
  tab: Tab;
  content: string;
  footer: string;
  text: Text;
};

type Tab = {
  active: string;
  inactive: string;
};
type Text = {
  heading: string;
  command: string;
};
