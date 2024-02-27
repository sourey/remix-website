import { useEffect, useState } from "react";
import ss from "../../public/ss1.jpg";

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers,
  parentHeaders: Headers,
}) {
  console.log(
    "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
  );
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

function Clock() {
  const [weather, setWeather] = useState(null);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState(null);


  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date()); 
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
          setLocation(data.municipality || data.address.city);
        })
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      {/* User Avatar and Name */}
      <div className="flex items-center mb-8">
        {weather && (
          <div className="text-xl font-bold mr-4">
            {/* {weather?.weather[0].main} ({weather?.main?.temp}°C) */}
          </div>
        )}
        <img
          src={ss}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <div className="text-xl font-bold">Saurav Sitaula</div>
          <div className="text-gray-400">Logged In</div>
        </div>
      </div>
      {/* Clock */}
      <div className="text-center mt-5">
        <h1 className="text-3xl mb-4">{location} Time</h1>
        <div className="text-6xl font-bold">
        {date.toLocaleTimeString()}
        </div>
        <div className="text-xl mt-4">GMT: {getCurrentTime("GMT")}</div>
      </div>
    </div>
  );
}

// Helper function to get current time in a specific timezone
function getCurrentTime(timezone) {
  const options = {
    timeZone: timezone,
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return new Date().toLocaleTimeString("en-US", options);
}

export default function Index() {
  return <Clock />;
}
