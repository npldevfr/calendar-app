import moment from "moment";

const useIsNow = (start, end) => {
    return moment().isBetween(start, end, null, "[]");
}

export default useIsNow;