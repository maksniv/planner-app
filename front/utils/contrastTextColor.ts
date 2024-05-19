
export function contrastTextColor(color: string): string {
  if (!color) return "#000000";

  let red: number = 0, green: number = 0, blue: number = 0;

  if (color.match("rgb")) {
    const colorParts = color.split(",");
    colorParts.map((part) => (red = parseInt(part.replace(/\D/g, ""), 10)));
    green = parseInt(colorParts[1].replace(/\D/g, ""), 10);
    blue = parseInt(colorParts[2].replace(/\D/g, ""), 10);
  } else {
    red = parseInt(color.slice(1, 3), 16);
    green = parseInt(color.slice(3, 5), 16);
    blue = parseInt(color.slice(5), 16);
  }

  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    return "#000000";
  }

  return "#ffffff";
}