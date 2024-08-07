import { useEffect, useState, useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { fetchUsersForSearch } from "../../api";
import SearchResult from "./SearchResult";
import useDebounce from "../../hooks/useDebounce";
import { axiosErrorHandiling } from "../../utils/handleError";
import { useStyleContext } from "../../context/StyleContext";

const SearchInput = ({ setIsSearchOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const popupRef = useRef(null);

  const {isMobile} = useStyleContext()


  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const fetchSearchResult = async () => {
      try{
        if (debouncedSearchQuery) {
          const { data } = await fetchUsersForSearch(debouncedSearchQuery);
          setSearchResults(data.data.users);
        }else{
          setSearchResults(null)
        }
      }catch(error){
        axiosErrorHandiling(error)
      }
    };

    fetchSearchResult();
  }, [debouncedSearchQuery]);

  return (
    <div ref={popupRef} className={`fixed ${isMobile ? " left-18 h-[60%] w-[70%]" : "h-4/6 w-1/4 left-1/3 top-1/6"} flex flex-col bg-gray-600 shadow-lg p-4 rounded-lg z-50`}>
      <div className="flex items-end">
        <button
          onClick={(e) => setIsSearchOpen(false)}
          className="text-xl mb-2"
        >
          <AiFillCloseCircle className="h-7 w-7 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {searchResults && (
        <div className=" bg-gray-500 rounded-lg shadow-lg p-4 overflow-auto  mb-3">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <SearchResult
                key={result._id}
                conversation={result}
                lastIdx={index === result.length - 1}
                setIsSearchOpen={setIsSearchOpen}
              />
            ))
          ) : (
            <p className="text-[#F7E7DC]">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
