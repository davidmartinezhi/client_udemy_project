import { basePath, apiVersion } from "./config";

export function getCoursesApi() {
  const url = `${basePath}/${apiVersion}/get-courses`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getCourseDataUdemyApi(id) {
  //Obtención de datos de un curso de udemy

  const baseUrl = `https://www.udemy.com/api-2.0/courses/${id}`;
  const coursesParams = `?fields[course]=title,headline,url,price,image_480x270`;

  const url = baseUrl + coursesParams;

  return fetch(url)
    .then(async (response) => {
      return { code: response.status, data: await response.json() };
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
}

export function deleteCourseApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-course/${id}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function addCourseApi(token, course) {
  const url = `${basePath}/${apiVersion}/add-course`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(course),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
