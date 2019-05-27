﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v12.3.1.0 (NJsonSchema v9.14.1.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class GameClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "https://localhost:44378";
    }

    createMultipleGames(games: GameUpdateDto[]): Observable<number> {
        let url_ = this.baseUrl + "/api/Game";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(games);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreateMultipleGames(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreateMultipleGames(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processCreateMultipleGames(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(<any>null);
    }
}

@Injectable()
export class LeaderboardClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "https://localhost:44378";
    }

    getLeaderboard(team: Team | undefined): Observable<LeaderboardDto[] | null> {
        let url_ = this.baseUrl + "/api/Leaderboard?";
        if (team === null)
            throw new Error("The parameter 'team' cannot be null.");
        else if (team !== undefined)
            url_ += "Team=" + encodeURIComponent("" + team) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetLeaderboard(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetLeaderboard(<any>response_);
                } catch (e) {
                    return <Observable<LeaderboardDto[] | null>><any>_observableThrow(e);
                }
            } else
                return <Observable<LeaderboardDto[] | null>><any>_observableThrow(response_);
        }));
    }

    protected processGetLeaderboard(response: HttpResponseBase): Observable<LeaderboardDto[] | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(LeaderboardDto.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<LeaderboardDto[] | null>(<any>null);
    }
}

@Injectable()
export class PlayerClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "https://localhost:44378";
    }

    getPlayers(): Observable<PlayerListingDto[] | null> {
        let url_ = this.baseUrl + "/api/Player";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPlayers(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPlayers(<any>response_);
                } catch (e) {
                    return <Observable<PlayerListingDto[] | null>><any>_observableThrow(e);
                }
            } else
                return <Observable<PlayerListingDto[] | null>><any>_observableThrow(response_);
        }));
    }

    protected processGetPlayers(response: HttpResponseBase): Observable<PlayerListingDto[] | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(PlayerListingDto.fromJS(item));
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PlayerListingDto[] | null>(<any>null);
    }

    createPlayer(player: PlayerUpdateDto): Observable<number> {
        let url_ = this.baseUrl + "/api/Player";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(player);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreatePlayer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreatePlayer(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processCreatePlayer(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(<any>null);
    }

    updatePlayer(player: PlayerUpdateDto): Observable<void> {
        let url_ = this.baseUrl + "/api/Player";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(player);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processUpdatePlayer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdatePlayer(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processUpdatePlayer(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }

    getPlayer(id: number): Observable<PlayerDetailDto | null> {
        let url_ = this.baseUrl + "/api/Player/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetPlayer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetPlayer(<any>response_);
                } catch (e) {
                    return <Observable<PlayerDetailDto | null>><any>_observableThrow(e);
                }
            } else
                return <Observable<PlayerDetailDto | null>><any>_observableThrow(response_);
        }));
    }

    protected processGetPlayer(response: HttpResponseBase): Observable<PlayerDetailDto | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? PlayerDetailDto.fromJS(resultData200) : <any>null;
            return _observableOf(result200);
            }));
        } else if (status === 404) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("A server error occurred.", status, _responseText, _headers);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<PlayerDetailDto | null>(<any>null);
    }

    deletePlayer(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/Player/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processDeletePlayer(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDeletePlayer(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>_observableThrow(e);
                }
            } else
                return <Observable<void>><any>_observableThrow(response_);
        }));
    }

    protected processDeletePlayer(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(<any>null);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(<any>null);
    }
}

export class GameUpdateDto implements IGameUpdateDto {
    id!: number;
    date!: Date;
    resistanceWin!: boolean;
    players!: GamePlayerUpdateDto[];

    constructor(data?: IGameUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
        if (!data) {
            this.players = [];
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.date = data["date"] ? new Date(data["date"].toString()) : <any>undefined;
            this.resistanceWin = data["resistanceWin"];
            if (data["players"] && data["players"].constructor === Array) {
                this.players = [] as any;
                for (let item of data["players"])
                    this.players!.push(GamePlayerUpdateDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): GameUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new GameUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["resistanceWin"] = this.resistanceWin;
        if (this.players && this.players.constructor === Array) {
            data["players"] = [];
            for (let item of this.players)
                data["players"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IGameUpdateDto {
    id: number;
    date: Date;
    resistanceWin: boolean;
    players: GamePlayerUpdateDto[];
}

export class GamePlayerUpdateDto implements IGamePlayerUpdateDto {
    initials!: string;
    wasResistance!: boolean;

    constructor(data?: IGamePlayerUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.initials = data["initials"];
            this.wasResistance = data["wasResistance"];
        }
    }

    static fromJS(data: any): GamePlayerUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new GamePlayerUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["initials"] = this.initials;
        data["wasResistance"] = this.wasResistance;
        return data; 
    }
}

export interface IGamePlayerUpdateDto {
    initials: string;
    wasResistance: boolean;
}

export class LeaderboardDto implements ILeaderboardDto {
    playerId!: number;
    initials?: string | undefined;
    wins!: number;
    totalGames!: number;

    constructor(data?: ILeaderboardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.playerId = data["playerId"];
            this.initials = data["initials"];
            this.wins = data["wins"];
            this.totalGames = data["totalGames"];
        }
    }

    static fromJS(data: any): LeaderboardDto {
        data = typeof data === 'object' ? data : {};
        let result = new LeaderboardDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["playerId"] = this.playerId;
        data["initials"] = this.initials;
        data["wins"] = this.wins;
        data["totalGames"] = this.totalGames;
        return data; 
    }
}

export interface ILeaderboardDto {
    playerId: number;
    initials?: string | undefined;
    wins: number;
    totalGames: number;
}

export enum Team {
    None = 0, 
    Resistance = 1, 
    Spy = 2, 
}

export class PlayerListingDto implements IPlayerListingDto {
    id!: number;
    firstName?: string | undefined;
    surname?: string | undefined;
    initials?: string | undefined;

    constructor(data?: IPlayerListingDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.firstName = data["firstName"];
            this.surname = data["surname"];
            this.initials = data["initials"];
        }
    }

    static fromJS(data: any): PlayerListingDto {
        data = typeof data === 'object' ? data : {};
        let result = new PlayerListingDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["surname"] = this.surname;
        data["initials"] = this.initials;
        return data; 
    }
}

export interface IPlayerListingDto {
    id: number;
    firstName?: string | undefined;
    surname?: string | undefined;
    initials?: string | undefined;
}

export class PlayerDetailDto implements IPlayerDetailDto {
    id!: number;
    firstName!: string;
    surname!: string;
    initials!: string;

    constructor(data?: IPlayerDetailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.firstName = data["firstName"];
            this.surname = data["surname"];
            this.initials = data["initials"];
        }
    }

    static fromJS(data: any): PlayerDetailDto {
        data = typeof data === 'object' ? data : {};
        let result = new PlayerDetailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["surname"] = this.surname;
        data["initials"] = this.initials;
        return data; 
    }
}

export interface IPlayerDetailDto {
    id: number;
    firstName: string;
    surname: string;
    initials: string;
}

export class PlayerUpdateDto implements IPlayerUpdateDto {
    id!: number;
    firstName!: string;
    surname!: string;
    initials!: string;

    constructor(data?: IPlayerUpdateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.firstName = data["firstName"];
            this.surname = data["surname"];
            this.initials = data["initials"];
        }
    }

    static fromJS(data: any): PlayerUpdateDto {
        data = typeof data === 'object' ? data : {};
        let result = new PlayerUpdateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["surname"] = this.surname;
        data["initials"] = this.initials;
        return data; 
    }
}

export interface IPlayerUpdateDto {
    id: number;
    firstName: string;
    surname: string;
    initials: string;
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = event => { 
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob); 
        }
    });
}