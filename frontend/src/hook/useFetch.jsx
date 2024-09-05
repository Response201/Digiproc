import { useState, useEffect } from "react";

export const useFetch = (url, inputMethod, bodyInput) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        /* Set loading to true when starting the fetch request */
        setIsLoading(true);

        /* Configure fetch options - method and body if provided */
        const options = {
            method: inputMethod,
            headers: {
              'Content-Type': 'application/json',
            },
            body: bodyInput ? JSON.stringify(bodyInput) : null,
          };

      try {

        /* Make the fetch request with the specified URL and options */
        const response = await fetch(url, options);

        /* Check if the response is not ok */
        if (!response.ok) {
            const errorData = await response.json();
            throw (errorData.message || 'Request failed');
        }

        /* if ererything works 🎉 update states */
        const json = await response.json();
        setIsLoading(false);
        setData(json);
        setError(null);

        /* error - set error state if there is an issue with the fetch */
      } catch (error) {
        setError(`${error}`);
        setIsLoading(false);
      } finally {
       /*  Set loading to false once the fetch is complete */
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

 /*  Return the data, loading status, and error for use in components */
  return { data, isLoading, error };

}