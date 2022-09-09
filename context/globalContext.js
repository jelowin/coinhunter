import { createContext, useState } from "react";

const Context = createContext({});

export function GlobalContextProvider({ children }) {
  const [session, setSession] = useState();
  return (
    <Context.Provider value={{ session, setSession }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
