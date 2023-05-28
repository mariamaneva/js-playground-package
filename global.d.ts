export {};

declare global {
  interface NavConfigItem {
    id: string;
    name: string;
    code?: () => void;
    children?: this[];
  }
}
