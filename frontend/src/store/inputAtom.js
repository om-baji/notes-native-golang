import { atom } from "recoil";

export const emailState = atom({
    key: 'emailState',
    default : ''
})

export const passwordState = atom({
    key: 'passwordState',
    default : ''
})

export const nameState = atom({
    key : "nameState",
    default : ''
})

export const loadingState = atom({
    key : "loadingState",
    default : true
})

export const titleState =atom({
    key : "titleState",
    default : ''
})

export const contentState = atom({
    key : "contentState",
    default : ''
})