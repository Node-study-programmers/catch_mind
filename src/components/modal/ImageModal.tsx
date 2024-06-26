import React, { ChangeEvent, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { createPortal } from "react-dom";
import { User } from "../../types";
import { replaceProfileImage } from "../../api/replace.api";
import AlertModal from "./AlertModal";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  setUser: (user: User) => void;
}

const ImageModal = ({ open, onClose, user, setUser }: ImageModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null | ArrayBuffer>(
    ""
  );
  const avatarEditorRef = useRef<AvatarEditor | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [blob, setBlob] = useState<Blob | null>(null);

  const onChangeAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    const addfile = e.target.files?.[0];
    if (!addfile) return;
    const reader = new FileReader();
    reader.readAsDataURL(addfile);
    reader.addEventListener("load", () => setPreviewImage(reader.result));
  };

  const handleCropImage = () => {
    if (avatarEditorRef.current) {
      avatarEditorRef.current.getImageScaledToCanvas().toBlob((blob) => {
        if (blob) {
          setBlob(blob);
          const imageUrl = URL.createObjectURL(blob);
          setCroppedImage(imageUrl);
        }
      }, "image/jpeg");
    }
  };

  const handleSendFile = async () => {
    if (blob) {
      const formData = new FormData();
      formData.append("profileImage", blob, "profileImage.jpg");
      for (const entry of formData.entries()) {
        console.log(entry);
      }
      try {
        const response = await replaceProfileImage(formData);
        console.log(response);
        if (response.profileImage) {
          console.log(response.profileImage);
          setUser({
            ...user,
            profileImage: import.meta.env.VITE_IMG_URL + response.profileImage,
          });
          setCroppedImage("");
          setPreviewImage("");
          setBlob(null);
          onClose();
        }
      } catch (error: any) {
        return AlertModal(error);
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!open) {
    return null;
  }
  return createPortal(
    <div
      className="fixed w-screen h-screen top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)]"
      onClick={handleOverlayClick}>
      <div
        className="top-1/2 left-1/2 absolute bg-white w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5"
        ref={modalRef}>
        <div className="font-titleW mb-3 text-xl">이미지 변경하기</div>
        <input
          type="file"
          onChange={onChangeAddFile}
          accept="image/jpeg, image/jpg, image/png"
        />
        <div className="flex items-center">
          {previewImage && (
            <AvatarEditor
              ref={avatarEditorRef}
              image={previewImage as string}
              width={120}
              height={120}
              border={50}
              scale={2}
              style={{ display: "inline" }}
            />
          )}
          {croppedImage && (
            <img
              src={croppedImage}
              alt="cropped"
              width={100}
              height={100}
              className="ml-3 border-blue-500 border-4"
            />
          )}
        </div>
        <div className="absolute bottom-2 right-5">
          <button className="text-blue-300 pr-5" onClick={onClose}>
            취소
          </button>
          {previewImage && (
            <button className="text-blue-500 pr-5" onClick={handleCropImage}>
              이미지 자르기
            </button>
          )}
          {croppedImage && (
            <button className="text-blue-500" onClick={handleSendFile}>
              완료
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
