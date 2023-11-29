import axios from "axios";
import type { AxiosInstance } from "axios";
import * as randUserAgent from "rand-user-agent";
import transportIcons from "./assets/transportIcons";

export default class Client {

    private options: {
        userAgent?: string;
        proxy?: {
            host: string;
            port: number;
            auth?: {
                username: string;
                password: string;
            };
        };
    };

    private cookiesString: string = "";

    private axios : AxiosInstance;

    constructor(options?: {
        userAgent?: string;
        proxy?: {
            host: string;
            port: number;
            auth?: {
                username: string;
                password: string;
            };
        };
    }) {
        this.options = options;

        const randomua = randUserAgent("desktop", "opera", "windows");

        this.axios = axios.create({
            headers: {
                "User-Agent": options?.userAgent || randomua.toString(),
                "X-BFF-Key": "ah1MPO-izehIHD-QZZ9y88n-kku876"
            },
            proxy: options?.proxy,
            baseURL: "https://www.sncf-connect.com/bff/api/v1",
            withCredentials: true
        });
        this.cookiesString = "";
    }

    async searchStation(query: string, options?: {
        keepStationsOnly?: boolean;
        returnSuggestions?: boolean;
    }) : Promise<searchStationResponse> {
        const res = await this.axios.post("/autocomplete", {
            searchTerm: query,
            keepStationsOnly: options?.keepStationsOnly || true,
            returnSuggestions: options?.returnSuggestions || false
        },
            {
                headers: {
                    "Cookie": this.cookiesString
                }
            });

        this.cookiesString = res.headers["set-cookie"].join("; ");

        return res.data as searchStationResponse;
    }

    async getStationBoards(stationId: string, withContextualNumber: boolean = false): Promise<stationBoard> {
        const res = await this.axios.get(`/boards/${stationId}?withContextualNumber=${withContextualNumber}`, {
            headers: {
                "Referer": `https://www.sncf-connect.com/app/station-timetable/results?station=${stationId}`,
                "Accept": "application/json, text/plain, */*",
            }
        });

        return res.data as stationBoard;
    }

    async getTraject(trainRequest: TrainRequestObject): Promise<Traject> {
        const res = await this.axios.post("/vehicle/detail", trainRequest, {
            headers: {
                Accept: "application/json, text/plain, */*"
            }
        });

        return res.data as Traject;
    }
}

// also export transportIcons
export { transportIcons };
