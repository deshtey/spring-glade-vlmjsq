import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import PhotoModal from "./components/PhotoModal";
import { useDebouncedCallback } from "use-debounce";
import { fetchData } from "./utils/fetchData";
import { apiURL } from "./lib/api";
import "./index.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch states
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  // Modal states
  const [modalPhotoData, setModalPhotoData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPhotoLoading, setModalPhotoLoading] = useState(false);
  const [modalLoadingError, setModalLoadingError] = useState(false);

  const observerRef = useRef();
  const modalRef = useRef(null);

  // // // // // // // // // // //
  // Search functions and handlers
  // // // // // // // // // // //

  useEffect(() => {
    let ignore = false; // Prevent a new fetch during current fetch
    const handleFetchSearchData = async () => {
      setLoading(true);
      setFetchError(null);

      const { error, response } = await fetchData(
        apiURL + "&text=" + searchTerm + "&page=" + page
      );
      // To troubleshoot the loading skeletons, uncomment the following:
      //
      // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      // await delay(10000)
      if (ignore) {
        return;
      } else if (error) {
        setFetchError(error.message);
      } else {
        setHasMore(response.photos.photo.length > 0);
        setData((prevData) => {
          return [...prevData, ...response.photos.photo];
        });
      }
      setLoading(false);
    };

    if (searchTerm.length) {
      handleFetchSearchData();
    }

    return () => {
      ignore = true;
    };
  }, [searchTerm, page]);

  const handleUpdateSearch = useDebouncedCallback((value) => {
    setSearchTerm(value);
    // Resets page and data states when new search term is entered
    setData([]);
    setPage(1);
  }, 500);

  // // // // // // // // // // // // // //
  // Infinite Scroll functions and handlers
  // // // // // // // // // // // // // //

  const lastThumb = (node) => {
    // For infinite scroll. Uses observer ref and Intersection
    // Observer to increment the page state when the last
    // Thumbnail comes into view
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observerRef.current.observe(node);
  };

  // // // // // // // // // // // // //
  // Photo Modal functions and handlers
  // // // // // // // // // // // // //

  useEffect(() => {
    // User can click outside the photo modal to close
    if (isModalOpen) {
      const handleEvent = (e) => {
        const element = modalRef.current;
        if (element && !element.contains(e.target)) {
          setIsModalOpen(false);
          setModalLoadingError(false);
        }
      };

      document.addEventListener("pointerdown", handleEvent);

      return () => {
        document.removeEventListener("pointerdown", handleEvent);
      };
    }
  }, [isModalOpen]);

  const handleOpenPhotoModal = (server, photoID, secret, title) => {
    const photoLink = `https://live.staticflickr.com/${server}/${photoID}_${secret}_`;
    setModalPhotoData({ url: photoLink, title: title });
    setIsModalOpen(true);
    setModalPhotoLoading(true);
  };

  const handleClosePhotoModal = () => {
    setIsModalOpen(false);
    setModalLoadingError(false);
  };

  const handleOnLoad = () => {
    setModalPhotoLoading(false);
  };

  const handleOnError = (e) => {
    e.target.src = "/images/no-image.png";
    setModalLoadingError(true);
  };

  return (
    <div className="w-full font-Poppins">
      <Header>
        <Search
          handleUpdateSearch={handleUpdateSearch}
          placeholder={"e.g. flowers"}
        />
      </Header>
      <SearchResults
        data={data}
        loading={loading}
        searchTerm={searchTerm}
        fetchError={fetchError}
        lastThumb={lastThumb}
        handleOpenPhotoModal={handleOpenPhotoModal}
      />
      {isModalOpen && (
        <PhotoModal
          modalRef={modalRef}
          modalPhotoData={modalPhotoData}
          handleClosePhotoModal={handleClosePhotoModal}
          modalPhotoLoading={modalPhotoLoading}
          handleOnLoad={handleOnLoad}
          handleOnError={handleOnError}
          modalLoadingError={modalLoadingError}
        />
      )}
    </div>
  );
};

export default App;
