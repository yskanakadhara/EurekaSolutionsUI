import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class BaseService {

    public static readonly REQUEST_REDIRECT: number = 302;
    public static readonly SC_UNAUTHORIZED: number = 401;
    public static readonly SC_NOT_FOUND: number = 404;
    public static readonly SC_INTERNAL_SERVER_ERROR: number = 500;
    public static readonly SC_SERVICE_UNAVAILABLE: number = 503;
    public static readonly SC_BAD_REQUEST: number = 400;

    constructor(public router: Router, public httpClient: HttpClient) { }



    protected getCallService(url: string, parameters: Object = {}) {
        let httpHeader = new HttpHeaders();
        httpHeader.set('Access-Control-Allow-Origin', "*");
        httpHeader.append('Access-Control-Allow-Credentials', 'true');
        httpHeader.append("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
        httpHeader.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return new Observable<any>((observer) => {
            this.httpClient.get(this.getURLParams(url, parameters), {
                headers: httpHeader,
                responseType: "json"
            }).pipe(map((res: any) => this.extractDataForValidate(res, url)), catchError((e: any) => this.handleError(e, url))).subscribe(res => {
                observer.next(res);
                observer.complete();
            });
        });
    }

    private getURLParams(url: string, parameters: any): string {
        if (parameters) {
            for (let property in parameters) {
                url = url + '/' + parameters[property];
            }
        }
        return url;
    }

    private extractDataForValidate(res: Response, url: string) {

        return res || {};
    }
    private handleError(error: Response | any, url: string) {

        if (error.error.statusCode == BaseService.SC_UNAUTHORIZED || error.error.statusCode == BaseService.SC_SERVICE_UNAVAILABLE) {

            return throwError(error.error.message);
        } else if (error.error.statusCode == BaseService.REQUEST_REDIRECT) {

            return throwError(error.error.message);
        } else if (error.error.statusCode == BaseService.SC_NOT_FOUND) {

            return throwError(error);
        } else if (error.error.statusCode == BaseService.SC_BAD_REQUEST) {

            return throwError(error);
        } else {

            return throwError(error);
        }
    }


}