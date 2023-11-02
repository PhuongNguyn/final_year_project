
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

export const toSlug = (title) => {
    let slug;
    slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    slug = slug.replace(/đ/gi, "d");
    slug = slug.replace(
        /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|'|\"|\:|\;|_/gi,
        ""
    );
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-\-/gi, "-");
    slug = slug.replace(/\-\-\-/gi, "-");
    slug = slug.replace(/\-\-/gi, "-");
    slug = "@" + slug + "@";
    slug = slug.replace(/\@\-|\-\@|\@/gi, "");

    return slug;
};

export const formatMoney = (money) => {
    if (money)
        return money?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })

    return 0
}