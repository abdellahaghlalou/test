import BaseService from "./base";


export default class OutstandigService extends BaseService {

    constructor() {
        super("/outstandig");
    }

    async get_outstanding_by_city() {
        return await this.custom_get("/cities");
        
    };

}
