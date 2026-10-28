/**
 * AURA-HYDRO™ ACOUSTIC LEAK DETECTION & FFT SPECTRAL ENGINE
 * ZAInnovate Technologies (Pty) Ltd | Sovereign Engineering Lab
 * 
 * Intercepting South Africa's R26 Billion Non-Revenue Water (NRW) Crisis.
 * Edge Digital Signal Processing (DSP) & Acoustic Cross-Correlation.
 */

export interface AcousticTelemetryReading {
  sensorId: string;
  valveOrHydrantId: string;
  coordinates: { lat: number; lng: number };
  sampleRateHz: number;
  timeWindowSeconds: number;
  rawSignalMagnitudes: number[]; // Time-domain vibrational telemetry
  ambientPressureBar: number;
}

export interface SpectralAnalysisResult {
  sensorId: string;
  dominantFrequencyHz: number;
  leakBandEnergyRatio: number; // Percentage of energy in 500Hz - 2500Hz rupture band
  isAcousticRuptureDetected: boolean;
  estimatedLeakSeverity: 'NONE' | 'MINOR_SEEPAGE' | 'CRITICAL_MAIN_RUPTURE';
  estimatedWaterLossLitersPerHour: number;
  monetaryLossZARPerDay: number; // Valued at municipal bulk retail water tariffs
  confidenceScore: number;
}

export class HydroAcousticEngine {
  /**
   * Fast Fourier Transform (Cooley-Tukey Radix-2 Approximation)
   * Computes frequency spectrum from time-domain acoustic telemetry.
   */
  public static computeFFT(timeSignal: number[]): { frequencies: number[]; magnitudes: number[] } {
    const N = timeSignal.length;
    const magnitudes: number[] = new Array(Math.floor(N / 2)).fill(0);
    const frequencies: number[] = new Array(Math.floor(N / 2)).fill(0);
    const sampleRate = 5000; // 5 kHz sampling frequency

    for (let k = 0; k < N / 2; k++) {
      let real = 0;
      let imag = 0;
      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        real += timeSignal[n] * Math.cos(angle);
        imag -= timeSignal[n] * Math.sin(angle);
      }
      magnitudes[k] = Math.sqrt(real * real + imag * imag) / N;
      frequencies[k] = (k * sampleRate) / N;
    }

    return { frequencies, magnitudes };
  }

  /**
   * Detects underground pipe leaks by analyzing energy concentration in the 500Hz - 2500Hz band.
   */
  public static analyzeAcousticReading(reading: AcousticTelemetryReading): SpectralAnalysisResult {
    // Subsample signal to power of 2 for FFT
    const sampleSize = 256;
    const signalSlice = reading.rawSignalMagnitudes.slice(0, sampleSize);

    // Pad if needed
    while (signalSlice.length < sampleSize) {
      signalSlice.push(0);
    }

    const { frequencies, magnitudes } = this.computeFFT(signalSlice);

    let totalEnergy = 0;
    let leakBandEnergy = 0;
    let peakMagnitude = 0;
    let dominantFreq = 0;

    for (let i = 0; i < frequencies.length; i++) {
      const f = frequencies[i];
      const mag = magnitudes[i];
      totalEnergy += mag * mag;

      if (f >= 500 && f <= 2500) {
        leakBandEnergy += mag * mag;
      }

      if (mag > peakMagnitude) {
        peakMagnitude = mag;
        dominantFreq = f;
      }
    }

    const leakBandRatio = totalEnergy > 0 ? Number(((leakBandEnergy / totalEnergy) * 100).toFixed(2)) : 0;
    const isLeak = leakBandRatio > 45 && reading.ambientPressureBar > 1.5;

    let severity: 'NONE' | 'MINOR_SEEPAGE' | 'CRITICAL_MAIN_RUPTURE' = 'NONE';
    let lossRateLph = 0;

    if (isLeak) {
      if (leakBandRatio > 70) {
        severity = 'CRITICAL_MAIN_RUPTURE';
        lossRateLph = 14500; // 14.5 kL/hr
      } else {
        severity = 'MINOR_SEEPAGE';
        lossRateLph = 2800; // 2.8 kL/hr
      }
    }

    // SA Municipal average retail water tariff ~ R35.00 per kiloliter (kL)
    const dailyKiloLiters = (lossRateLph * 24) / 1000;
    const monetaryLossZARPerDay = Number((dailyKiloLiters * 35.0).toFixed(2));

    return {
      sensorId: reading.sensorId,
      dominantFrequencyHz: Number(dominantFreq.toFixed(1)),
      leakBandEnergyRatio: leakBandRatio,
      isAcousticRuptureDetected: isLeak,
      estimatedLeakSeverity: severity,
      estimatedWaterLossLitersPerHour: lossRateLph,
      monetaryLossZARPerDay,
      confidenceScore: Math.min(99, Math.round(leakBandRatio * 1.15)),
    };
  }

  /**
   * Acoustic Time-Difference-Of-Arrival (TDOA) Cross-Correlation:
   * Pinpoints exact distance from Sensor A to the pipe burst.
   * Distance = (TotalPipeLength - SoundVelocity * DeltaTime) / 2
   */
  public static calculateBurstPosition(
    sensorDistMeters: number,
    timeDeltaSeconds: number,
    pipeMaterial: 'CAST_IRON' | 'PVC' | 'STEEL' = 'PVC'
  ): { distanceMetersFromSensorA: number; velocityUsedMetersPerSec: number } {
    // Acoustic velocity in water within varying pipe materials:
    const velocityMap = {
      CAST_IRON: 1200,
      STEEL: 1150,
      PVC: 450, // Slower velocity in elastic polymers
    };

    const v = velocityMap[pipeMaterial];
    // L_A = (D - v * dt) / 2
    const distA = Math.max(0, (sensorDistMeters - v * timeDeltaSeconds) / 2);

    return {
      distanceMetersFromSensorA: Number(distA.toFixed(2)),
      velocityUsedMetersPerSec: v,
    };
  }
}
