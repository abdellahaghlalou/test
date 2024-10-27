import OutstandigService from "./outstanding";


export default class ServicesManager {

    get_outstanding_service() {
        return new OutstandigService();
    };

};