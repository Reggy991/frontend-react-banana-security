import jwt_decode from "jwt-decode";

export function checkTokenValidity(token) {
    if (!token) {
        return false;
    }

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
}