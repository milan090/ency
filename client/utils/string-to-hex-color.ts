const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }
  return hash;
};

// function intToRGB(i: number): string {
//   const c = (i & 0x00ffffff).toString(16).toUpperCase();

//   return "00000".substring(0, 6 - c.length) + c;
// }

export const colors = ["#F4D6FF", "#D6DDFF", "#D4EDED", "#D5F6BF", "#FDF1C7", "#FFE3E3"];

export const randomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const stringToBrightHexColor = (str: string): string => {
  const num = Math.abs(hashCode(str)) % colors.length;

  return colors[num];
};

export const hexToSixDigit = (hex: string): string => {
  if (hex.length === 3) {
    let newHex = "";
    for (let i = 0; i < hex.length; i++) {
      newHex += hex.charAt(i) + hex.charAt(i);
    }
    return newHex;
  } else {
    return hex;
  }
};
