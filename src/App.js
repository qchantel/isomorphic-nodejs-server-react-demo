import React, { useEffect, useState } from "react";

import "./App.css";
import { isServerSide } from "./helpers/isomorphic";

function App({ payload }) {
  const [store, setStore] = useState(payload);

  useEffect(() => {
    async function initStore() {
      if (!isServerSide && window && window?.__FETCHED_DATA__) {
        setStore(window?.__FETCHED_DATA__);
        return;
      }
    }
    initStore();
  }, [payload]);

  return <div>{JSON.stringify(store)}</div>;
}

export default App;
