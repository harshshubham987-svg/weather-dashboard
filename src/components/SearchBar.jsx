function SearchBar({
  city,
  setCity,
  handleSearch,
  handleLiveLocation,
  loading,
}) {
  return (
    <div className="w-full max-w-2xl flex gap-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city..."
        className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white outline-none"
      />

    <button
        onClick={handleSearch}
        disabled={loading}
        className="px-6 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50"
        >
        {loading ? "Loading..." : "Search"}
    </button>

    <button
        onClick={handleLiveLocation}
        disabled={loading}
        className="px-6 py-4 rounded-2xl bg-purple-500 hover:bg-purple-400 disabled:opacity-50"
        >
        {loading ? "Fetching..." : "Live"}
    </button>
    </div>
  );
}

export default SearchBar;