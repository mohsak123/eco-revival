import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

type Props = {
  initialPosition: Position;
  address: string;
  onPositionChange?: (pos: Position) => void;
  onAddressChange?: (newAddress: string) => void;
  isEditable?: boolean; // <-- هنا تضيف المتحول
};

const LocationMarker = ({
  onMapClick,
  isEditable = true,
}: {
  onMapClick: (lat: number, lng: number) => void;
  isEditable?: boolean;
}) => {
  // فقط لو isEditable true نسمح بالنقر على الخريطة
  useMapEvents({
    click(e) {
      if (isEditable) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
};

const DynamicMap = ({
  initialPosition,
  address,
  onPositionChange,
  onAddressChange,
  isEditable = true, // القيمة الافتراضية true
}: Props) => {
  const [position, setPosition] = useState<Position>(initialPosition);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address.trim()) return;

      const query = encodeURIComponent(address.trim());
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;

      try {
        const res = await fetch(url, {
          headers: {
            "User-Agent": "eco-revival-app",
          },
        });
        const data = await res.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
          setPosition(newPos);
          onPositionChange?.(newPos);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    };

    fetchCoordinates();
  }, [address]);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const handleMapClick = async (lat: number, lng: number) => {
    const newPos = { lat, lng };
    setPosition(newPos);
    onPositionChange?.(newPos);

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ar`;
      const res = await fetch(url, {
        headers: {
          "User-Agent": "eco-revival-app",
        },
      });
      const data = await res.json();
      if (data?.display_name) {
        onAddressChange?.(data.display_name);
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    }
  };

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%", margin: "10px 0", borderRadius: "8px" }}
      key={`${position.lat}-${position.lng}`}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.lat, position.lng]}>
        <Popup>
          Lat: {position.lat.toFixed(5)} <br />
          Lng: {position.lng.toFixed(5)}
        </Popup>
      </Marker>
      <LocationMarker onMapClick={handleMapClick} isEditable={isEditable} />
    </MapContainer>
  );
};

export default DynamicMap;

