export type PrimaryColorConfig = {
  name?: string;
  light?: string;
  main: string;
  dark?: string;
};

// Primary color config object
const primaryColorConfig: PrimaryColorConfig[] = [
  {
    name: "primary-1",
    light: "#A379FF",
    main: "#013334",
    dark: "#013334",
  },
];

export default primaryColorConfig;
