import Thumbnail from "./Thumbnail";
import SkeletonResults from "./SkeletonResults";

const SearchResults = ({
  data,
  loading,
  searchTerm,
  fetchError,
  lastThumb,
  handleOpenPhotoModal,
}) => {
  return (
    <div className="px-2 sm:py-4 sm:px-6 md:px-10 md:py-6">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6 xl:grid-cols-8 max-w-screen-xl mx-auto">
        <div className="col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-8 text-xl italic">
          {!searchTerm.length ? (
            <p>Enter a query in the Search Bar above to begin.</p>
          ) : fetchError ? (
            <p>
              <span className="font-semibold uppercase">Error: </span>
              {fetchError}
            </p>
          ) : null}
        </div>
        {data.length
          ? data.map((photo, index) => {
              return (
                <div
                  key={index}
                  ref={(ref) => {
                    data.length === index + 1 && lastThumb(ref);
                  }}
                >
                  <button
                    className="block w-full"
                    onClick={() =>
                      handleOpenPhotoModal(
                        photo.server,
                        photo.id,
                        photo.secret,
                        photo.title
                      )
                    }
                  >
                    <Thumbnail photo={photo} />
                  </button>
                </div>
              );
            })
          : null}
        {loading && <SkeletonResults />}
      </div>
    </div>
  );
};

export default SearchResults;
