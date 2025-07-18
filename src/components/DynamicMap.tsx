import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";

type Position = {
  lat: number;
  lng: number;
};

type Props = {
  initialPosition: Position;
  address: string;
  onPositionChange?: (pos: Position) => void;
  onAddressChange?: (newAddress: string) => void;
  isEditable?: boolean;
};

const LocationMarker = ({
  onMapClick,
  isEditable = true,
}: {
  onMapClick: (lat: number, lng: number) => void;
  isEditable?: boolean;
}) => {
  useMapEvents({
    click(e) {
      if (isEditable) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
};

// مكون جديد لتحديث view الخريطة بدون re-render
const MapUpdater = ({ position }: { position: Position }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([position.lat, position.lng], map.getZoom());
  }, [map, position.lat, position.lng]);

  return null;
};

const DynamicMap = ({
  initialPosition,
  address,
  onPositionChange,
  onAddressChange,
  isEditable = true,
}: Props) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const lastAddressRef = useRef<string>("");
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInternalUpdateRef = useRef(false);

  // تحديث الموقع من initialPosition بس لو كان مختلف فعلاً
  useEffect(() => {
    if (
      Math.abs(initialPosition.lat - position.lat) > 0.0001 ||
      Math.abs(initialPosition.lng - position.lng) > 0.0001
    ) {
      setPosition(initialPosition);
    }
  }, [initialPosition.lat, initialPosition.lng]);

  // البحث عن الموقع من العنوان مع debounce
  useEffect(() => {
    // تجنب البحث إذا كان التحديث من داخل المكون أو العنوان فارغ
    if (!address.trim() || address === lastAddressRef.current || isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const query = encodeURIComponent(address.trim());
        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

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
          lastAddressRef.current = address;
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    }, 800); // زود وقت الـ debounce

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [address, onPositionChange]);

  const handleMapClick = async (lat: number, lng: number) => {
    const newPos = { lat, lng };
    setPosition(newPos);
    onPositionChange?.(newPos);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ar`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "eco-revival-app",
          },
        });
        const data = await res.json();
        if (data?.display_name) {
          isInternalUpdateRef.current = true; // علم أن التحديث من داخل المكون
          onAddressChange?.(data.display_name);
          lastAddressRef.current = data.display_name;
        }
      } catch (err) {
        console.error("Reverse geocoding error:", err);
      }
    }, 500);
  };

  return (
    <MapContainer
      center={[initialPosition.lat, initialPosition.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%", margin: "10px 0", borderRadius: "8px", zIndex: 0 }}
      // أزل الـ key لتجنب re-mount
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
      <MapUpdater position={position} />
    </MapContainer>
  );
};

export default DynamicMap;