import React, { useState } from "react";

const CacheDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCache, setUseCache] = useState(true);

  const cache = {};

  const fetchData = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts/1";

    setLoading(true);
    setData(null);

    if (useCache && cache[url]) {
      console.log("Serving from cache");
      setData(cache[url]);
      setLoading(false);
    } else {
      console.log("Fetching from API");
      const response = await fetch(url);
      const result = await response.json();

      if (useCache) {
        cache[url] = result; // Store in cache
      }

      setData(result);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Caching Demo</h1>
      <p>
        This demo shows the difference between cached and non-cached API requests.
      </p>

      <label>
        <input
          type="checkbox"
          checked={useCache}
          onChange={(e) => setUseCache(e.target.checked)}
        />
        Enable Cache
      </label>

      <div style={{ margin: "20px" }}>
        <button onClick={fetchData} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Fetch Data
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {data && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CacheDemo;
