import React, { useRef, useState } from "react";
import map from "../assets/images/map.png";
import LocationSearchPanel from "../components/LocationSearchPanel";
import RideSelection from "../components/RideSelection";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import { FaChevronDown } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
  const [isRidePanelOpen, setIsRidePanelOpen] = useState(false);
  const [isConfirmRidePanelOpen, setIsConfirmRidePanelOpen] = useState(false);
  const [isLookingForDriverPanelOpen, setIsLookingForDriverPanelOpen] = useState(false);
  const [isWaitingForDriverPanelOpen, setIsWaitingForDriverPanelOpen] = useState(true);

  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
  });

  const locationPanelRef = useRef(null);
  const ridePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);

  const handleInputFocus = () => {
    setIsLocationPanelOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 useGSAP(
  () => {
    if (locationPanelRef.current) {
      gsap.to(locationPanelRef.current, {
        height:
          isRidePanelOpen
            ? "0%"
            : isLocationPanelOpen
            ? "75%"
            : "0%",
        duration: 0.3,
      });
    }

    if (ridePanelRef.current) {
      gsap.to(ridePanelRef.current, {
        y:
          isConfirmRidePanelOpen ||
          isLookingForDriverPanelOpen ||
          isWaitingForDriverPanelOpen
            ? "100%"
            : isRidePanelOpen
            ? "0%"
            : "100%",
        duration: 0.3,
      });
    }

    if (confirmRidePanelRef.current) {
      gsap.to(confirmRidePanelRef.current, {
        y:
          isLookingForDriverPanelOpen ||
          isWaitingForDriverPanelOpen
            ? "100%"
            : isConfirmRidePanelOpen
            ? "0%"
            : "100%",
        duration: 0.3,
      });
    }

    if (lookingForDriverPanelRef.current) {
      gsap.to(lookingForDriverPanelRef.current, {
        y:
          isWaitingForDriverPanelOpen
            ? "100%"
            : isLookingForDriverPanelOpen
            ? "0%"
            : "100%",
        duration: 0.3,
      });
    }

    if (waitingForDriverPanelRef.current) {
      gsap.to(waitingForDriverPanelRef.current, {
        y: isWaitingForDriverPanelOpen ? "0%" : "100%",
        duration: 0.3,
      });
    }
  },
  {
    dependencies: [
      isLocationPanelOpen,
      isRidePanelOpen,
      isConfirmRidePanelOpen,
      isLookingForDriverPanelOpen,
      isWaitingForDriverPanelOpen,
    ],
  }
);

  return (
    <div className="w-full h-dvh flex flex-col items-center justify-end">
      <img
        src={map}
        alt="Map"
        className="h-[80%] absolute top-0"
        onClick={() => {
          setIsLocationPanelOpen(false);
        }}
      />

      <h1 className="text-black absolute top-3 left-3 text-4xl z-10 font-semibold tracking-tighter">
        UBER
      </h1>

      <div className="w-full h-dvh flex flex-col justify-end items-center z-10 overflow-hidden">
        <div className="relative rounded-t-3xl border-t-2 h-[30%] w-full bg-white p-5 flex flex-col gap-2 [@media(min-height:700px)]:gap-5 [@media(min-height:700px)]:h-[25%]">
          {isLocationPanelOpen && (
            <FaChevronDown
              className="absolute right-6 top-6 cursor-pointer"
              onClick={() => setIsLocationPanelOpen(false)}
            />
          )}

          <h1 className="text-xl font-semibold">Find a trip</h1>

          <p className="absolute h-12 w-0.5 bg-black top-20 left-10 [@media(min-height:700px)]:h-21"></p>

          <form
            className="w-full flex flex-col gap-2 [@media(min-height:700px)]:gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              name="source"
              value={formData.source}
              type="text"
              className="w-[98%] mx-auto border bg-[#ededed] text-lg rounded-xl py-2 px-10"
              placeholder="Add a pick-up location"
              onFocus={handleInputFocus}
              onChange={handleChange}
            />

            <input
              name="destination"
              value={formData.destination}
              type="text"
              className="w-[98%] mx-auto border bg-[#ededed] text-lg rounded-xl py-2 px-10"
              placeholder="Enter your destination"
              onFocus={handleInputFocus}
              onChange={handleChange}
            />
          </form>
        </div>

        <div
          ref={locationPanelRef}
          className="w-full h-0 bg-white px-5 overflow-hidden"
        >
          <LocationSearchPanel
            setRidePanelOpen={setIsRidePanelOpen}
            setLocationPanelOpen={setIsLocationPanelOpen}
          />
        </div>
      </div>

      <div
        ref={ridePanelRef}
        className="fixed bottom-0 w-full bg-white z-20 rounded-t-3xl translate-y-full"
      >
        <RideSelection
          setRidePanelOpen={setIsRidePanelOpen}
          setConfirmRidePanel={setIsConfirmRidePanelOpen}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full bg-white z-30 rounded-t-3xl translate-y-full"
      >
        <ConfirmRide
          selectedVehicle={selectedVehicle}
          setConfirmRidePanel={setIsConfirmRidePanelOpen}
          setIsLookingForDriverPanelOpen={setIsLookingForDriverPanelOpen}
        />
      </div>

      <div
        ref={lookingForDriverPanelRef}
        className="fixed bottom-0 w-full bg-white z-40 rounded-t-3xl translate-y-full"
      >
        <LookingForDriver
          selectedVehicle={selectedVehicle}
          setIsLookingForDriverPanelOpen={setIsLookingForDriverPanelOpen}
        />
      </div>

      <div
        ref={waitingForDriverPanelRef}
        className="fixed bottom-0 w-full bg-white z-50 rounded-t-3xl translate-y-full"
      >
        <WaitingForDriver

        />
      </div>
    </div>
  );
};

export default Home;