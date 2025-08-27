import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../App";
import { MdOutlineMyLocation } from "react-icons/md"; // Use this icon as per your request

const CountryDropdown = () => {
    const context = useContext(MyContext);
    const [locationText, setLocationText] = useState("");
    const [postalCode, setPostalCode] = useState("");

    useEffect(() => {
        if (context.isLogin) {
            // When logged in, get and display the user's location
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        try {
                            const response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
                            );
                            const data = await response.json();
                            const userCity = data.address.city || data.address.town || data.address.village || "Unknown Location";
                            const userPostalCode = data.address.postcode || "";

                            setLocationText(userCity);
                            setPostalCode(userPostalCode);
                        } catch (error) {
                            console.error("Error fetching location:", error);
                            setLocationText("Location Error");
                            setPostalCode("");
                        }
                    },
                    (error) => {
                        console.error("Geolocation access denied:", error);
                        setLocationText("Location Disabled");
                        setPostalCode("");
                    }
                );
            } else {
                setLocationText("Geo. Not Supported");
                setPostalCode("");
            }
        } else {
            // When logged out, reset to empty state
            setLocationText("");
            setPostalCode("");
        }
    }, [context.isLogin]);

    const locationClass = context.isLogin ? "text-green-500" : "text-red-500";

    return (
        <div className="flex items-center space-x-2">
            <MdOutlineMyLocation className={`text-xl ${locationClass}`} />
            {context.isLogin && locationText && (
                <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm mr-2">{locationText},</span>
                    <span className="text-gray-500 text-xs">{postalCode}</span>
                </div>
            )}
        </div>
    );
};

export default CountryDropdown;