var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_ASSETS_TYPES_PATH } from '../../routes';
import { fetchData } from '../../egeria-fetch';
/**
 * @param apiUrl is an optional parameter but it is used if API is deployed
 *               in a different location
 *
 * This function is used to fetch Asset Types.
 *
*/
const fetchTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    let typesData = yield fetchData(`${API_ASSETS_TYPES_PATH}`, 'GET');
    typesData = typesData ? [
        ...typesData.map((d) => {
            return {
                value: d.name,
                label: d.name
            };
        })
    ] : [];
    return typesData;
});
export { fetchTypes };
