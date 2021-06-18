const images = {
  delete: (location) => {
    fetch(process.env.REACT_APP_SERVER_URL + '/assets', {
      method: 'DELETE',
      body: JSON.stringify({
        value: location,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  },
  save: (file, userId) => {
    const formData = new FormData();
    formData.append('image', file);
    return fetch(
      `${process.env.REACT_APP_SERVER_URL}/assets?userId=${userId}`,
      {
        method: 'POST',
        body: formData,
      }
    ).then((response) => response.json());
  },
};
export default images;
