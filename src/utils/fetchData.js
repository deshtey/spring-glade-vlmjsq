export const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (res.ok === true) {
      let response = await res.json();
      let error = null;
      if (response.stat !== "ok") {
        error = response;
        response = null;
      }
      return {
        error,
        response,
      };
    }
    throw new Error("An error has occured.");
  } catch (e) {
    return {
      error: e,
      response: null,
    };
  }
};
