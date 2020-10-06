
const getResource = async (url) => {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error: ${url}, status: ${response}`)
  }

  return await response.json();

};

// getResource('database/dataBase.json').then((data) => console.log(data))

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    body: data
  });
  if (!response.ok) {
    throw new Error(`Error: ${url}, status: ${response}`)
  }
  return await response.json();
}

