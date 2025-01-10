import { type FunctionComponent, useEffect, useRef } from "react";
import { useCamera, useScanning, type ScanOptions } from "../hooks";
import { type DetectedBarcode } from "../types";

interface ScannerProps extends React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> {
  options?: ScanOptions;
  onCapture?: (barcodes: DetectedBarcode[]) => void;
  /**
   * Function called when the camera device is successfully initialized.
   * @returns {void}
   */
  onCameraInitialized?: () => void;
  /**
   * Function called when the camera device is unavailable.
   * @returns {void}
   */
  onCameraUnavailable?: () => any;
  trackConstraints?: MediaTrackConstraints;
}

const BarcodeScanner: FunctionComponent<ScannerProps> = ({
  options,
  onCapture,
  trackConstraints,
  onCameraInitialized,
  onCameraUnavailable,
  ...props
}) => {
  const instance = useRef<HTMLVideoElement>(null);
  const [isCameraSupport] = useCamera(instance, trackConstraints);
  const [detected, open, close] = useScanning(instance, options);

  useEffect(() => {
    if (isCameraSupport) {
      open();
      onCameraInitialized?.();
    } else {
      close();
      onCameraUnavailable?.();
    }
  }, [close, isCameraSupport, open, onCameraInitialized, onCameraUnavailable]);

  useEffect(() => {
    if (detected !== undefined) {
      onCapture?.(detected);
    }
  }, [detected, onCapture]);

  return (
    <video
      ref={instance}
      /**
       * `object-fit: cover` will automatically fill the entire video,
       * if the aspect ratio not match with camera,
       * it will cause enlargement screen, so user need consider it
       */
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      autoPlay
      muted
      /**
       * set video play in element to fix iOS black screen error
       */
      playsInline
      {...props}
    />
  );
};

export default BarcodeScanner;
