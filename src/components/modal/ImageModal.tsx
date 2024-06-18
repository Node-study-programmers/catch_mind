import React from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
}

const ImageModal = ({ open, onClose }: ImageModalProps) => {
  if (!open) return null;
  return createPortal(<div>ImageModal</div>, document.body);
};

export default ImageModal;
