const Header = ({ children }) => {
  return (
    <div className="h-full w-full px-2 pb-2 pt-6 sm:px-6 sm:pb-6 md:px-10 bg-blue-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex w-full items-center text-center justify-between">
          <h1 className="text-2xl w-full font-semibold text-white">
            Flickr Browser
          </h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Header;
