// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u5e1.md / Enunciat disponible a u5e1.md

// MGG - Clase ClipboardApi
export class ClipboardApi {

    constructor(clipboard = window.navigator.clipboard) {
        this.clipboard = clipboard;
    }

    async copy(text) {
        return await this.clipboard.writeText(text);
    }

    async read() {
        return await this.clipboard.readText();
    }
}