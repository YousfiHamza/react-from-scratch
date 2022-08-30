import { useState } from "react";

// const location = "Seattle, WA";

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const handleChange = (e) => {
    setLocation(e.target.value);
  };
  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={handleChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
