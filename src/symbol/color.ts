export type ColorKeys =
  | "background"
  | "backgroundOffset"
  | "cards"
  | "pageMarker"
  | "expansion"
  | "button"
  | "text"
  | "white"
  | "buttonText"
  | "error";

export const COLOR: { [key in ColorKeys]: string } = {
  background: "#121212",
  backgroundOffset: "#000000",
  cards: "#2f2f2f",
  pageMarker: "#3f3f3f",
  expansion: "#444444",
  button: "#666666",
  text: "#dddddd",
  white: "#ffffff",
  buttonText: "#555555",
  error: "#CC4466",
};
