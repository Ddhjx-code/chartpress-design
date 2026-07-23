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
      { s: "S", chest: 18, length: 28, sleeve: 15.125 }, { s: "M", chest: 20, length: 29, sleeve: 16.5 },
      { s: "L", chest: 22, length: 30, sleeve: 18 }, { s: "XL", chest: 24, length: 31, sleeve: 19.5 },
      { s: "2XL", chest: 26, length: 32, sleeve: 21 }, { s: "3XL", chest: 28, length: 33, sleeve: 22.375 },
      { s: "4XL", chest: 30, length: 34, sleeve: 23.675 }, { s: "5XL", chest: 32, length: 35, sleeve: 25 },
    ],
  },
  gildan5000b: {
    brand: "Gildan", model: "5000B", name: "Youth Heavy Cotton Tee", slug: "gildan-5000b-youth", audience: "YOUTH",
    sizes: [
      { s: "XS", chest: 16, length: 20.5, sleeve: 13.25 }, { s: "S", chest: 17, length: 22, sleeve: 14.25 },
      { s: "M", chest: 18, length: 23.5, sleeve: 15.25 }, { s: "L", chest: 19, length: 25, sleeve: 16.25 },
      { s: "XL", chest: 20, length: 26.5, sleeve: 17.25 },
    ],
  },
  gildan5100p: {
    brand: "Gildan", model: "5100P", name: "Toddler Heavy Cotton Tee", slug: "gildan-5100p-toddler", audience: "TODDLER",
    sizes: [
      { s: "2T", chest: 11, length: 15, sleeve: 9 }, { s: "3T", chest: 12, length: 16, sleeve: 10 },
      { s: "4T", chest: 13, length: 17, sleeve: 11 }, { s: "5T", chest: 14, length: 18, sleeve: 11.5 },
      { s: "6T", chest: 15, length: 19, sleeve: 12.5 },
    ],
  },
  gildan5400b: {
    brand: "Gildan", model: "5400B", name: "Youth Long Sleeve Tee", slug: "gildan-5400b-youth", audience: "YOUTH",
    sizes: [
      { s: "XS", chest: 16, length: 20.5, sleeve: 23 }, { s: "S", chest: 17, length: 22, sleeve: 24.5 },
      { s: "M", chest: 18, length: 23.5, sleeve: 26.5 }, { s: "L", chest: 19, length: 25, sleeve: 29 },
      { s: "XL", chest: 20, length: 26.5, sleeve: 31 },
    ],
  },
  gildan64000: {
    brand: "Gildan", model: "64000", name: "Softstyle Tee", slug: "gildan-64000",
    sizes: [
      { s: "XS", chest: 16, length: 27, sleeve: 15.5 }, { s: "S", chest: 18, length: 28, sleeve: 16.625 },
      { s: "M", chest: 20, length: 29, sleeve: 17.75 }, { s: "L", chest: 22, length: 30, sleeve: 19 },
      { s: "XL", chest: 24, length: 31, sleeve: 20.25 }, { s: "2XL", chest: 26, length: 32, sleeve: 21.5 },
      { s: "3XL", chest: 28, length: 33, sleeve: 22.625 }, { s: "4XL", chest: 30, length: 34, sleeve: 23.75 },
      { s: "5XL", chest: 32, length: 35, sleeve: 25 },
    ],
  },
  gildan18500: {
    brand: "Gildan", model: "18500", name: "Heavy Blend Hoodie", slug: "gildan-18500",
    sizes: [
      { s: "XS", chest: 18, length: 26, sleeve: 32.5 }, { s: "S", chest: 20, length: 27, sleeve: 33.5 },
      { s: "M", chest: 22, length: 28, sleeve: 34.5 }, { s: "L", chest: 24, length: 29, sleeve: 35.5 },
      { s: "XL", chest: 26, length: 30, sleeve: 36.5 }, { s: "2XL", chest: 28, length: 31, sleeve: 37.5 },
      { s: "3XL", chest: 30, length: 32, sleeve: 38.5 }, { s: "4XL", chest: 32, length: 33, sleeve: 39.5 },
      { s: "5XL", chest: 34, length: 34, sleeve: 40.5 },
    ],
  },
  gildan18000: {
    brand: "Gildan", model: "18000", name: "Heavy Blend Crewneck", slug: "gildan-18000",
    sizes: [
      { s: "XS", chest: 18, length: 26, sleeve: 32.5 }, { s: "S", chest: 20, length: 27, sleeve: 33.5 },
      { s: "M", chest: 22, length: 28, sleeve: 34.5 }, { s: "L", chest: 24, length: 29, sleeve: 35.5 },
      { s: "XL", chest: 26, length: 30, sleeve: 36.5 }, { s: "2XL", chest: 28, length: 31, sleeve: 37.5 },
      { s: "3XL", chest: 30, length: 32, sleeve: 38.5 }, { s: "4XL", chest: 32, length: 33, sleeve: 39.5 },
      { s: "5XL", chest: 34, length: 34, sleeve: 40.5 },
    ],
  },
  gildan18000b: {
    brand: "Gildan", model: "18000B", name: "Youth Heavy Blend Crewneck", slug: "gildan-18000b-youth", audience: "YOUTH",
    sizes: [
      { s: "XS", chest: 16, length: 19.75, sleeve: 23.5 }, { s: "S", chest: 17, length: 21.25, sleeve: 26.5 },
      { s: "M", chest: 18, length: 22.5, sleeve: 27.75 }, { s: "L", chest: 19, length: 24, sleeve: 30.25 },
      { s: "XL", chest: 20, length: 25.5, sleeve: 33 },
    ],
  },
  bc3001: {
    brand: "Bella+Canvas", model: "3001", name: "Unisex Jersey Tee", slug: "bella-canvas-3001",
    sizes: [
      { s: "XS", chest: 16.5, length: 27 }, { s: "S", chest: 18, length: 28 },
      { s: "M", chest: 20, length: 29 }, { s: "L", chest: 22, length: 30 },
      { s: "XL", chest: 24, length: 31 }, { s: "2XL", chest: 26, length: 32 },
      { s: "3XL", chest: 28, length: 33 }, { s: "4XL", chest: 30, length: 34 },
      { s: "5XL", chest: 32, length: 35 },
    ],
  },
  cc1717: {
    brand: "Comfort Colors", model: "1717", name: "Garment-Dyed Heavyweight", slug: "comfort-colors-1717",
    sizes: [
      { s: "S", chest: 18.25, length: 26.625, sleeve: 16.25 }, { s: "M", chest: 20.25, length: 28, sleeve: 17.75 },
      { s: "L", chest: 22, length: 29.375, sleeve: 19 }, { s: "XL", chest: 24, length: 30.75, sleeve: 20.5 },
      { s: "2XL", chest: 26, length: 31.625, sleeve: 21.75 }, { s: "3XL", chest: 27.75, length: 32.5, sleeve: 23.25 },
      { s: "4XL", chest: 29.75, length: 33.5, sleeve: 24.625 },
    ],
  },
  nl3600: {
    brand: "Next Level", model: "3600", name: "Premium Fitted Tee", slug: "next-level-3600",
    sizes: [
      { s: "XS", chest: 17.5, length: 27 }, { s: "S", chest: 19, length: 28 },
      { s: "M", chest: 20.5, length: 29 }, { s: "L", chest: 22, length: 30 },
      { s: "XL", chest: 24, length: 31 }, { s: "2XL", chest: 26, length: 32 },
      { s: "3XL", chest: 28, length: 33 }, { s: "4XL", chest: 30, length: 34 },
      { s: "5XL", chest: 32, length: 35 }, { s: "6XL", chest: 34, length: 36 },
    ],
  },
  nl6210: {
    brand: "Next Level", model: "6210", name: "CVC Crew", slug: "next-level-6210",
    sizes: [
      { s: "XS", chest: 17.5, length: 27 }, { s: "S", chest: 19, length: 28 },
      { s: "M", chest: 20.5, length: 29 }, { s: "L", chest: 22, length: 30 },
      { s: "XL", chest: 24, length: 31 }, { s: "2XL", chest: 26, length: 32 },
      { s: "3XL", chest: 28, length: 33 }, { s: "4XL", chest: 30, length: 34 },
      { s: "5XL", chest: 32, length: 35 }, { s: "6XL", chest: 34, length: 36 },
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
