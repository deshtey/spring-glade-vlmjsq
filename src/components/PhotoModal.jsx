import { saveAs } from "file-saver";
import { PiXBold } from "react-icons/pi";
import { PiDownloadSimpleFill } from "react-icons/pi";
import clsx from "clsx";

const PhotoModal = ({
  modalRef,
  modalPhotoData,
  handleClosePhotoModal,
  modalPhotoLoading,
  handleOnLoad,
  handleOnError,
  modalLoadingError,
}) => {
  const { url, title } = modalPhotoData;
  const photoUrl = `${url}b.jpg`;

  const downloadPhoto = () => {
    if (!modalLoadingError) {
      saveAs(photoUrl, "flickr_image.jpg");
    }
  };

  // Dynamic CSS classes

  const dialogClassName = clsx(
    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] max-h-[80vh] m-0",
    {
      hidden: modalPhotoLoading,
      block: !modalPhotoLoading,
    }
  );

  const buttonClassName = clsx(
    "ml-auto group/download flex flex-row justify-end items-center rounded-md py-1 pl-3 pr-3 text-lg text-white",
    {
      "cursor-not-allowed bg-zinc-300 text-zinc-200": modalLoadingError,
      "transition bg-blue-800 hover:bg-blue-900": !modalLoadingError,
    }
  );

  const iconClassName = clsx("mt-px mr-2 h-5 w-5 text-white", {
    "transition group-hover/download:translate-y-0.5 group-hover/download:text-gray-100":
      !modalLoadingError,
    "text-zinc-200": modalLoadingError,
  });

  const spanClassName = clsx("font-semibold", {
    "transition group-hover/download:text-gray-100": !modalLoadingError,
  });

  return (
    <div className="fixed top-0 w-full h-full bg-black/80 no-document-scroll">
      <dialog className={dialogClassName} ref={modalRef}>
        <button
          className="group/close bg-blue-800 transition hover:bg-blue-900 rounded-full absolute -top-3 -right-3 w-6 h-6 md:-top-5 md:-right-5 md:w-10 md:h-10 text-center flex justify-center items-center"
          onClick={handleClosePhotoModal}
        >
          <PiXBold className="w-5 h-5 md:w-7 md:h-7 text-white transition group-hover/close:scale-110 group-hover/close:text-gray-100" />
        </button>
        <div>
          <img
            className="max-w-[90vw] max-h-[80vh]"
            alt={title}
            src={photoUrl}
            onLoad={handleOnLoad}
            onError={handleOnError}
          />
        </div>
        <div className="flex p-2 md:p-4 items-start absolute bottom-0 bg-black/50 w-full">
          <p className="italic text-white mr-4">{title}</p>
          <button className={buttonClassName} onClick={downloadPhoto}>
            <PiDownloadSimpleFill className={iconClassName} />
            <span className={spanClassName}>Download</span>
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default PhotoModal;
