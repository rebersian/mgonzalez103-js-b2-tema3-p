
// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u4e1.md / Enunciat disponible a u4e1.md

// MGG - Clase CookieApis
export class CookieApi {
    static EXPIRING_DAYS = 365;
    document;

    constructor(document) {
        this.document = document || window.document;
    }

    static expirationDate(nDays) {
        const date = new Date();
        date.setTime(date.getTime() + (nDays * 24 * 60 * 60 * 1000));
        return date.toUTCString();
    }

    setCookie(key, value, nDays = CookieApi.EXPIRING_DAYS) {
        const expires = CookieApi.expirationDate(nDays);
        const serializedValue = JSON.stringify(value);
        this.document.cookie = `${key}=${serializedValue}; expires=${expires}; path=/`;
    }

    getCookie(key) {
        const cookies = this.document.cookie ? this.document.cookie.split('; ') : [];
        for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.split('=');
            if (cookieKey === key) {
                if (cookieValue === undefined) return '';
                if (cookieValue === '') return '';
                return JSON.parse(cookieValue);
            }
        }
        return null;
    }

    removeCookie(key) {
        this.document.cookie = `${key}=; expires=${new Date(0).toUTCString()}; path=/`;
        return null;
    }
}