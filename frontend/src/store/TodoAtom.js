import { atom } from "recoil";

export const todoState = atom({
    key : "todoAtom",
    default : []
})