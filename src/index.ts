/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { BarcodeDetector as BarcodeDetectorPolyfill } from "barcode-detector";

try {
  // @ts-expect-error
  window.BarcodeDetector.getSupportedFormats();
} catch {
  // @ts-expect-error
  window.BarcodeDetector = BarcodeDetectorPolyfill;
}

export * from "./hooks";
export * from "./components";
