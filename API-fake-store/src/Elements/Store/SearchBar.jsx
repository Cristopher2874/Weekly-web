import { useContext } from 'react';
import { LayoutContext } from "../../Layout/LayoutStore";

const SearchBar = () => {
    const { setSearchTerm, setSelectedCategory, searchTerm, selectedCategory, categories } = useContext(LayoutContext);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    return (
        <div className="flex-initial w-3/5 flex">
            <select
                className="form-select rounded-l-lg p-2 h-10 text-[#f3f1f2ff] bg-[#811d2eff] rounded-r-none w-1/6 min-w-1/12"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <input
                type="text"
                className="form-control rounded-l-none p-2 bg-[#f3f1f2ff] text-[#811d2eff] w-4/5 h-10 rounded-r-none min-w-1/3 focus:outline-none"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button className="rounded-r-lg p-2 h-10 text-[#f3f1f2ff] bg-[#811d2eff] rounded-l-none w-1/12 min-w-1/12" onClick={handleSearchChange}>Search</button>
        </div>
    );
};

export default SearchBar;