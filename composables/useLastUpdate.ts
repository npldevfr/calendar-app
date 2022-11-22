import moment from "moment-timezone";

const useLastUpdate = (action: 'update' | 'get' | 'isExpired') => {

    const TIME_TO_EXPIRE = 1000 * 60 * 60 * 2; // 2 hours

    // set timezone to Paris (Europe/Paris)
    const now: moment.Moment = moment().tz("Europe/Paris").format();

    const updateLastUpdate = () => {
        localStorage.setItem('edtLastUpdate', now.toString());
        return now;
    }

    const getLastUpdate = () => {
        return localStorage.getItem('edtLastUpdate') || updateLastUpdate();
    }

    const isExpired = () => {
        const lastUpdate = getLastUpdate();
        return moment(now).diff(moment(lastUpdate), 'milliseconds') > TIME_TO_EXPIRE;
    }

    switch (action) {
        case 'update':
            return updateLastUpdate();
        case 'isExpired':
            return isExpired();
        case 'get':
        default:
            return getLastUpdate();
    }


}

export default useLastUpdate;