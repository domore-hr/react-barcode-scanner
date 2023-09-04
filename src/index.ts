/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
// import { BarcodeDetectorPolyfill } from "@undecaf/barcode-detector-polyfill";

try {
  // @ts-expect-error
  window.BarcodeDetector.getSupportedFormats();
} catch {
  // // @ts-expect-error
  // window.BarcodeDetector = BarcodeDetectorPolyfill;
}

export * from "./hooks";
export * from "./components";
