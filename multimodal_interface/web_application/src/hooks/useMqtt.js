// src/hooks/useMqtt.js
import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { SENSOR_MAP } from '../utils/sensorMapping'; // Path fixed: up one level from hooks to src/

export const useMqtt = (host) => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Port 8083 is the standard WaziGate WebSocket port
    const brokerUrl = `ws://${host}:8083/mqtt`;
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("MQTT Connected to " + host);
      // Subscribe to any device sensor path defined in the SENSOR_MAP
      client.subscribe("devices/+/sensors/+/value");
    });

    client.on("message", (topic, message) => {
      const parts = topic.split("/");
      const sensorId = parts[3]; 
      const readableKey = SENSOR_MAP[sensorId];

      if (readableKey) {
        setData(prev => ({ 
          ...prev, 
          [readableKey]: message.toString() 
        }));
      }
    });

    client.on("error", (err) => console.error("MQTT Error:", err));

    return () => client.end();
  }, [host]);

  return data;
};