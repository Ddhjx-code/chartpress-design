/**
 * ChartPress — single source of truth for blank garment data.
 * Used by both the browser (main tool) and Node (SEO build script).
 *
 * All measurements are FLAT GARMENT measurements in INCHES.
 * chest = flat width across chest (display x2 for body circumference).
 *
 * ⚠️  Measurements are commonly-published values and MUST be verified
 *     against official manufacturer spec sheets before launch.
 */
const BLANKS = {
  gildan5000: {
    brand: "Gildan", model: "5000", name: "Heavy Cotton Tee", slug: "gildan-5000",
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 15.5 }, { s: "M", chest: 20, length: 29, sleeve: 16.5 },
      { s: "L", chest: 22, length: 30, sleeve: 17.5 }, { s: "XL", chest: 24, length: 31, sleeve: 18.5 },
      { s: "2XL", chest: 26, length: 32, sleeve: 19.5 }, { s: "3XL", chest: 28, length: 33, sleeve: 20.5 },
    ],
  },
  gildan5000b: {
    brand: "Gildan", model: "5000B", name: "Youth Heavy Cotton Tee", slug: "gildan-5000b-youth", audience: "YOUTH",
    sizes: [
      { s: "S", chest: 15, length: 22, sleeve: 12.5 }, { s: "M", chest: 16.5, length: 24, sleeve: 13.5 },
      { s: "L", chest: 18, length: 26, sleeve: 14.5 }, { s: "XL", chest: 19.5, length: 28, sleeve: 15.5 },
    ],
  },
  gildan64000: {
    brand: "Gildan", model: "64000", name: "Softstyle Tee", slug: "gildan-64000",
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 15.75 }, { s: "M", chest: 20, length: 29, sleeve: 16.5 },
      { s: "L", chest: 22, length: 30, sleeve: 17.25 }, { s: "XL", chest: 24, length: 31, sleeve: 18 },
      { s: "2XL", chest: 26, length: 32, sleeve: 18.75 }, { s: "3XL", chest: 28, length: 33, sleeve: 19.5 },
    ],
  },
  gildan18500: {
    brand: "Gildan", model: "18500", name: "Heavy Blend Crewneck", slug: "gildan-18500",
    sizes: [
      { s: "S", chest: 20, length: 27, sleeve: 23.5 }, { s: "M", chest: 22, length: 28, sleeve: 24 },
      { s: "L", chest: 24, length: 29, sleeve: 24.5 }, { s: "XL", chest: 26, length: 30, sleeve: 25 },
      { s: "2XL", chest: 28, length: 31, sleeve: 25.5 }, { s: "3XL", chest: 30, length: 32, sleeve: 26 },
    ],
  },
  gildan18000: {
    brand: "Gildan", model: "18000", name: "Heavy Blend Hoodie", slug: "gildan-18000",
    sizes: [
      { s: "S", chest: 20, length: 27, sleeve: 23.5 }, { s: "M", chest: 22, length: 28, sleeve: 24 },
      { s: "L", chest: 24, length: 29, sleeve: 24.5 }, { s: "XL", chest: 26, length: 30, sleeve: 25 },
      { s: "2XL", chest: 28, length: 31, sleeve: 25.5 }, { s: "3XL", chest: 30, length: 32, sleeve: 26 },
    ],
  },
  gildan18000b: {
    brand: "Gildan", model: "18000B", name: "Youth Heavy Blend Hoodie", slug: "gildan-18000b-youth", audience: "YOUTH",
    sizes: [
      { s: "S", chest: 16, length: 21, sleeve: 19 }, { s: "M", chest: 18, length: 23, sleeve: 20.5 },
      { s: "L", chest: 20, length: 25, sleeve: 22 }, { s: "XL", chest: 22, length: 27, sleeve: 23.5 },
    ],
  },
  bc3001: {
    brand: "Bella+Canvas", model: "3001", name: "Unisex Jersey Tee", slug: "bella-canvas-3001",
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 15.75 }, { s: "M", chest: 20, length: 29, sleeve: 16.5 },
      { s: "L", chest: 22, length: 30, sleeve: 17.25 }, { s: "XL", chest: 24, length: 31, sleeve: 18 },
      { s: "2XL", chest: 26, length: 32, sleeve: 18.75 }, { s: "3XL", chest: 28, length: 33, sleeve: 19.5 },
    ],
  },
  cc1717: {
    brand: "Comfort Colors", model: "1717", name: "Garment-Dyed Heavyweight", slug: "comfort-colors-1717",
    sizes: [
      { s: "S", chest: 18.25, length: 28.5, sleeve: 15.5 }, { s: "M", chest: 20.25, length: 29.5, sleeve: 16.25 },
      { s: "L", chest: 22.25, length: 30.5, sleeve: 17 }, { s: "XL", chest: 24.25, length: 31.5, sleeve: 17.75 },
      { s: "2XL", chest: 26.25, length: 32.5, sleeve: 18.5 }, { s: "3XL", chest: 28.25, length: 33.5, sleeve: 19.25 },
    ],
  },
  nl3600: {
    brand: "Next Level", model: "3600", name: "Premium Fitted Tee", slug: "next-level-3600",
    sizes: [
      { s: "S", chest: 17.75, length: 27.5, sleeve: 15.5 }, { s: "M", chest: 19.75, length: 28.5, sleeve: 16.25 },
      { s: "L", chest: 21.75, length: 29.5, sleeve: 17 }, { s: "XL", chest: 23.75, length: 30.5, sleeve: 17.75 },
      { s: "2XL", chest: 25.75, length: 31.5, sleeve: 18.5 }, { s: "3XL", chest: 27.75, length: 32.5, sleeve: 19.25 },
    ],
  },
  nl6210: {
    brand: "Next Level", model: "6210", name: "CVC Crew", slug: "next-level-6210",
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 16 }, { s: "M", chest: 20, length: 29, sleeve: 16.75 },
      { s: "L", chest: 22, length: 30, sleeve: 17.5 }, { s: "XL", chest: 24, length: 31, sleeve: 18.25 },
      { s: "2XL", chest: 26, length: 32, sleeve: 19 }, { s: "3XL", chest: 28, length: 33, sleeve: 19.75 },
    ],
  },
  ascolour001: {
    brand: "AS Colour", model: "001", name: "Staple Tee", slug: "as-colour-001",
    sizes: [
      { s: "S", chest: 18.5, length: 28, sleeve: 15.75 }, { s: "M", chest: 20.5, length: 29, sleeve: 16.5 },
      { s: "L", chest: 22.5, length: 30, sleeve: 17.25 }, { s: "XL", chest: 24.5, length: 31, sleeve: 18 },
      { s: "2XL", chest: 26.5, length: 32, sleeve: 18.75 }, { s: "3XL", chest: 28.5, length: 33, sleeve: 19.5 },
    ],
  },
  championS700: {
    brand: "Champion", model: "S700", name: "Powerblend Hoodie", slug: "champion-s700",
    sizes: [
      { s: "S", chest: 20, length: 27, sleeve: 24 }, { s: "M", chest: 22, length: 28, sleeve: 24.5 },
      { s: "L", chest: 24, length: 29, sleeve: 25 }, { s: "XL", chest: 26, length: 30, sleeve: 25.5 },
      { s: "2XL", chest: 28, length: 31, sleeve: 26 },
    ],
  },
  russell017M: {
    brand: "Russell Athletic", model: "017M", name: "Dri-Power Tee", slug: "russell-athletic-017m",
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 15.5 }, { s: "M", chest: 20, length: 29, sleeve: 16.25 },
      { s: "L", chest: 22, length: 30, sleeve: 17 }, { s: "XL", chest: 24, length: 31, sleeve: 17.75 },
      { s: "2XL", chest: 26, length: 32, sleeve: 18.5 }, { s: "3XL", chest: 28, length: 33, sleeve: 19.25 },
    ],
  },
  hanes5180: {
    brand: "Hanes", model: "5180", name: "Beefy-T", slug: "hanes-5180",
    sizes: [
      { s: "S", chest: 18, length: 28, sleeve: 16 }, { s: "M", chest: 20, length: 29, sleeve: 17 },
      { s: "L", chest: 22, length: 30, sleeve: 18 }, { s: "XL", chest: 24, length: 31, sleeve: 19 },
      { s: "2XL", chest: 26, length: 32, sleeve: 20 }, { s: "3XL", chest: 28, length: 33, sleeve: 21 },
    ],
  },
};

const THEMES = {
  ink:   { bg: "#16191F", fg: "#F6F5F0", ac: "#E8432A", name: "Ink" },
  paper: { bg: "#FFFFFF", fg: "#16191F", ac: "#2B4BC8", name: "Paper" },
  kraft: { bg: "#E8D9BC", fg: "#3D2E1C", ac: "#C4501F", name: "Kraft" },
  mint:  { bg: "#DDEDE2", fg: "#17352A", ac: "#1F7A53", name: "Mint" },
  blush: { bg: "#F6E3E1", fg: "#4A2320", ac: "#C2402F", name: "Blush" },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { BLANKS, THEMES };
}
