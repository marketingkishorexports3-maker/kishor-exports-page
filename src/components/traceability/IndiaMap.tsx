// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MAP_MARKERS } from '@/data/traceability';

const getMarkerPosition = (marker, index, allMarkers) => {
  const nearby = allMarkers.filter((item) => Math.abs(item.lat - marker.lat) < 0.02 && Math.abs(item.lng - marker.lng) < 0.02);
  if (nearby.length < 2) return [marker.lat, marker.lng];

  const nearbyIndex = nearby.findIndex((item) => item.id === marker.id);
  const angle = (Math.PI * 2 * nearbyIndex) / nearby.length;
  const radius = Math.min(0.04, 0.012 + nearby.length * 0.0015);

  return [marker.lat + Math.sin(angle) * radius, marker.lng + Math.cos(angle) * radius];
};

const getMarkerGroup = (id) => MAP_MARKERS.filter((marker) => marker.id === id || marker.id.startsWith(id));

export default function IndiaMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;

    const worldBounds = L.latLngBounds([-55, -170], [72, 170]);
    const journeyBounds = L.latLngBounds(MAP_MARKERS.map((marker) => [marker.lat, marker.lng]));

    const map = L.map(mapRef.current, {
      center: [26, 72],
      zoom: 3,
      minZoom: 2,
      maxZoom: 13,
      maxBounds: worldBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      scrollWheelZoom: true,
    });
    map.fitBounds(journeyBounds, { padding: [34, 34] });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      bounds: worldBounds,
      noWrap: true,
    }).addTo(map);

    // Add markers
    MAP_MARKERS.forEach((marker, index) => {
      const markerPosition = getMarkerPosition(marker, index, MAP_MARKERS);
      const icon = L.divIcon({
        html: `<div style="
          background: ${marker.color};
          color: #FFFFFF;
          font-family: sans-serif;
          font-size: 13px;
          font-weight: 800;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 3px 10px rgba(0,0,0,0.45);
          cursor: pointer;
          border: 2px solid #FFFFFF;
          letter-spacing: 0.5px;
        ">${marker.label}</div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const m = L.marker(markerPosition, { icon }).addTo(map);
      m.on('click', () => {
        setSelected(marker);
        map.flyTo(markerPosition, marker.zoom || 11, { duration: 1.2 });
      });
    });

    mapInstanceRef.current = map;
  }, [mapLoaded]);

  // Listen for timeline card selections to fly the map
  useEffect(() => {
    const onFocus = (e) => {
      const map = mapInstanceRef.current;
      if (!map) return;
      const id = e.detail?.id;
      if (!id) {
        const L = window.L;
        const journeyBounds = L.latLngBounds(MAP_MARKERS.map((marker) => [marker.lat, marker.lng]));
        map.flyToBounds(journeyBounds, { padding: [34, 34], duration: 1.2 });
        setSelected(null);
        return;
      }
      const markers = getMarkerGroup(id);
      if (markers.length > 1) {
        const L = window.L;
        const groupBounds = L.latLngBounds(markers.map((marker) => [marker.lat, marker.lng]));
        map.flyToBounds(groupBounds, { padding: [72, 72], maxZoom: 8, duration: 1.2 });
        setSelected(null);
        return;
      }
      const marker = markers[0];
      if (marker) {
        setSelected(marker);
        const markerPosition = getMarkerPosition(marker, 0, MAP_MARKERS);
        map.flyTo(markerPosition, marker.zoom || 11, { duration: 1.2 });
      }
    };
    window.addEventListener('shakti:focus-supplier', onFocus);
    return () => window.removeEventListener('shakti:focus-supplier', onFocus);
  }, [mapLoaded]);

  // Auto-reset to India after 30s of inactivity when a marker is selected
  useEffect(() => {
    if (!selected || !mapInstanceRef.current) return;
    const timer = setTimeout(() => {
      const L = window.L;
      const journeyBounds = L.latLngBounds(MAP_MARKERS.map((marker) => [marker.lat, marker.lng]));
      mapInstanceRef.current.flyToBounds(journeyBounds, { padding: [34, 34], duration: 1.2 });
      setSelected(null);
    }, 30000);
    return () => clearTimeout(timer);
  }, [selected]);


  return (
    <section id="map" className="py-24 px-6 bg-[#f5f7fb]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#3b6fa0]">Geography of Craft</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#0f1b3d] mt-3">Made Across India and the Netherlands</h2>
          <p className="font-sans text-sm text-[#0f1b3d]/80 mt-3">Click any marker to see supplier details. Scroll to zoom.</p>
        </motion.div>

        <div className="relative rounded-2xl overflow-hidden border border-[#0f1b3d]/10 shadow-lg" style={{ height: '520px' }}>
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

          {/* Popup overlay */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-2xl border border-[#3b6fa0]/20 p-5 w-72 z-[1000]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="inline-flex items-center gap-1.5 mb-1">
                    <div className="min-w-6 h-6 px-1 bg-[#0f1b3d] rounded-md flex items-center justify-center text-[9px] font-bold text-[#f5f7fb]">{selected.label}</div>
                      <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#3b6fa0]">{selected.stage}</span>
                    </div>
                    <h4 className="font-serif text-lg font-medium text-[#0f1b3d]">{selected.name}</h4>
                    <p className="font-sans text-xs text-[#0f1b3d] mt-0.5">{selected.address}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-[#0f1b3d]/30 hover:text-[#0f1b3d] ml-2 mt-1">
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f5f7fb]">
              <p className="font-sans text-sm text-[#0f1b3d]/80">Loading map...</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {MAP_MARKERS.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setSelected(m);
                if (mapInstanceRef.current) {
                  const markerPosition = getMarkerPosition(m, 0, MAP_MARKERS);
                  mapInstanceRef.current.flyTo(markerPosition, m.zoom || 11, { duration: 1 });
                }
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0f1b3d]/10 hover:border-[#3b6fa0]/30 bg-white hover:bg-[#f5f7fb] transition-all text-xs font-sans text-[#0f1b3d]"
            >
              <span className="min-w-5 h-5 px-1 bg-[#0f1b3d] text-[#f5f7fb] rounded flex items-center justify-center text-[9px] font-bold">{m.label}</span>
              {m.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
