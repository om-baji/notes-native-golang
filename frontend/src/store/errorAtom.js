import { atom } from "recoil";

export const errorState = atom({
    key : "errorState",
    default : []
})

export const editState = atom({
    key : "editState",
    default : false
})

export const saveState = atom({
    key : "saveState",
    default : false
})