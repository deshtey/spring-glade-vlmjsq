import { PiMagnifyingGlassDuotone } from "react-icons/pi";

export default function Search({ placeholder, handleUpdateSearch }) {
  const handleSearchChange = (e) => {
    handleUpdateSearch(e.target.value);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md py-5 pl-[4.5rem] text-xl outline-1 placeholder:text-gray-300 placeholder:italic"
        placeholder={placeholder}
        onChange={handleSearchChange}
      />
      <PiMagnifyingGlassDuotone className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 text-gray-500 transition peer-focus:text-gray-900" />
    </div>
  );
}
