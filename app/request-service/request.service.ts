import fetch from "cross-fetch";

export class RequestService {
    public async get(url: string) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}