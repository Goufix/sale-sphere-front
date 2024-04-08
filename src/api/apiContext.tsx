import { createContext } from "react";

export const ApiContext = createContext<{ loading: boolean; error: string; setLoading: any; setError: any }>({
  loading: false,
  error: "",
  setError: () => {},
  setLoading: () => {},
});
