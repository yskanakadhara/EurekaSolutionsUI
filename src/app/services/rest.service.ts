import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";


@Injectable()

export class RestManager extends BaseService {

    private REST_API_SERVER = "http://localhost:3000/apiService/api";

    getIndiaCovidDetails() {
        return this.getCallService(`${this.REST_API_SERVER}` + "/india");
    }

    getNepalCovidDetails() {
        return this.getCallService(`${this.REST_API_SERVER}` + "/nepal");
    }

    getBangladeshCovidDetails() {
        return this.getCallService(`${this.REST_API_SERVER}` + "/bangladesh");
    }

    getPakistanCovidDetails() {
        return this.getCallService(`${this.REST_API_SERVER}` + "/pakistan");
    }

    getBhutanCovidDetails() {
        return this.getCallService(`${this.REST_API_SERVER}` + "/bhutan");
    }

    getSriLankaCovidDetails() {
        return this.getCallService(`${this.REST_API_SERVER}` + "/sriLanka");
    }

    getMaldivesCovidDetails() {   
        return this.getCallService(`${this.REST_API_SERVER}` + "/maldives");
    }
}
