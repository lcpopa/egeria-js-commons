var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { handleResponse, authHeader } from '../auth';
const egeriaFetch = (endpoint, method, headers, options) => {
    const requestOptions = Object.assign({ method: method, headers: headers }, options);
    const apiUrl = process.env.REACT_APP_API_URL || '';
    return fetch(`${apiUrl}${endpoint}`, requestOptions).then(handleResponse);
};
const fetchData = (uri, method, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield egeriaFetch(uri, method, Object.assign({}, authHeader()), {});
    const data = yield res.json();
    if (callback) {
        callback(data);
    }
    else {
        return data;
    }
});
export { egeriaFetch, fetchData };
