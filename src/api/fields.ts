const URL = 'https://60816d9073292b0017cdd833.mockapi.io/modes';

export const getFieldModes = <T>():Promise<T> => {
  return fetch(URL)
    .then(response => response.json())
    .catch(() => {
      throw new Error('Cant fetch data!');
    });
};
