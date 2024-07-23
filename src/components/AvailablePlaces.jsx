import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later",
        });
      }

      setIsLoading(false);
    }

    fetchPlaces();
    // fetch("http://localhost:3000/places")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     console.log(resData);
    //     setAvailablePlaces(resData.places);
    //   });
  }, []);

  if (error) {
    return <Error title="An error occured!!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      isLoading={isLoading}
      loadingText={"Fetching places data..."}
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
