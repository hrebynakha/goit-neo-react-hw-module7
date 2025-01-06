import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (filter) => {
    dispatch(changeFilter(filter.target.value));
  };

  return (
    <div className={css.inputWrap}>
      <input
        className={css.sbox}
        type="text"
        placeholder="Input search value"
        onChange={handleFilterChange}
        name="search"
      />
      <IconContext.Provider value={{ className: "icon", size: 25 }}>
        <AiOutlineSearch />
      </IconContext.Provider>
    </div>
  );
};

export default SearchBox;
