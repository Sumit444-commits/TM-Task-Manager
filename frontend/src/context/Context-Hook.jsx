import { useContext } from "react";
import { StoreContext } from "./Store-Context";

export const useStore = () => {
  return useContext(StoreContext);
};
