const DOMAIN = "https://fake-api-quiz.onrender.com/";

export const get = async (path) => {
  const response = await fetch(DOMAIN + path);
  const result = await response.json();
  return result;
};

export const post = async (path, options) => {
  const response = await fetch(DOMAIN + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const patch = async (path, options) => {
  const response = await fetch(DOMAIN + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const del = async (path) => {
  const response = await fetch(DOMAIN + path, {
    method: "DELETE",
  });

  const result = await response.json();
  return result;
};
