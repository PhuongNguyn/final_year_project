
export const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("accessToken", JSON.stringify(token))
}

export const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
}

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("accessToken")
}

export const getTokenFromLocalStorage = () => {
    const token = JSON.parse(localStorage.getItem("accessToken") != undefined ? localStorage.getItem("accessToken") : "null")

    return token
}

export const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user") != undefined ? localStorage.getItem("user") : "null")

    return user
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user")
}