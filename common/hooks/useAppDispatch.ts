import { AppDispatch } from "assets/store/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
