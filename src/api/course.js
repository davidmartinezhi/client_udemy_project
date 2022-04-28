import { basePath, apiVersion } from "./config";

export default function getCoursesApi() {
    const url = `${basePath}/${apiVersion}/get-courses`;

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}