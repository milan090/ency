import React, { useEffect, useMemo, useRef } from "react";
import styles from "./range-slider.module.scss";
import { generateArray } from "src/utils/array-generator.utils";

type Props = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
};

export const RangeSlider: React.FC<Props> = ({ value, onChange, min = 0, max = 10, step = 1 }) => {
  const ref = useRef<HTMLInputElement>(null);
  const steps = useMemo(() => generateArray(min, max + step, step), []);

  useEffect(() => {
    const valuePercentage = ((value - min) / (max - min)) * 100;
    if (ref.current) {
      ref.current.style.background =
        "linear-gradient(to right, 	#6398FF 0%, 	#6398FF " +
        valuePercentage +
        "%, #D6DDFF           " +
        valuePercentage +
        "%, #D6DDFF 100%)";
    }
  }, [value, max, min]);

  return (
    <div>
      <input
        type="range"
        className={styles.slider}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        min={min}
        max={max}
        step={step}
        ref={ref}
      />
      <div className="flex justify-between mt-3">
        {steps.map((stepItem) => (
          <span className="text-xs text-gray-500 w-6 text-center" key={stepItem}>
            {stepItem}
          </span>
        ))}
      </div>
    </div>
  );
};
