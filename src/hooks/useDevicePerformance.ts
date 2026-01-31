import { useState, useEffect } from 'react';

type PerformanceTier = 'high' | 'medium' | 'low';

interface DevicePerformance {
  tier: PerformanceTier;
  isMobile: boolean;
  supportsWebGL: boolean;
  hardwareConcurrency: number;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 'high',
    isMobile: false,
    supportsWebGL: true,
    hardwareConcurrency: 4,
  });

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const supportsWebGL = !!gl;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    let tier: PerformanceTier = 'high';
    if (!supportsWebGL) {
      tier = 'low';
    } else if (isMobile && hardwareConcurrency <= 4) {
      tier = 'medium';
    }

    setPerformance({ tier, isMobile, supportsWebGL, hardwareConcurrency });
  }, []);

  return performance;
}
