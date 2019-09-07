import APIRequest from "../api";

const Request = new APIRequest({
  url: 'https://www.googleapis.com/books/v1'
});

export const GetBook = (number) => Request.get(`/volumes?q=javascript&maxResults=20&startIndex=${number}`);