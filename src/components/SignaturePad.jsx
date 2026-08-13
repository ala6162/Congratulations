import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';

const CANVAS_HEIGHT = 200;

const SignaturePad = ({ label, onChange, placeholder, initialData }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const loadedRef = useRef(false);
  const [width, setWidth] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current?.getCanvas?.();
    if (canvas) canvas.style.width = '100%';
  }, [width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !initialData || loadedRef.current) return;
    loadedRef.current = true;
    canvas.fromDataURL(initialData);
    setIsEmpty(canvas.isEmpty());
  }, [width, initialData]);

  const handleClear = () => {
    canvasRef.current?.clear();
    setIsEmpty(true);
    onChange?.(null);
  };

  const handleEnd = () => {
    if (!canvasRef.current) return;
    const empty = canvasRef.current.isEmpty();
    setIsEmpty(empty);
    onChange?.(empty ? null : canvasRef.current.toDataURL('image/png'));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-rose-800">{label}</span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-rose-500 hover:text-rose-700 hover:underline transition-colors"
        >
          مسح ✕
        </button>
      </div>

      <div
        ref={wrapperRef}
        className="relative w-full h-32 sm:h-36 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/30 overflow-hidden"
      >
        {width > 0 && (
          <SignatureCanvas
            ref={canvasRef}
            penColor="#9f1239"
            minWidth={1}
            maxWidth={2}
            onEnd={handleEnd}
            clearOnResize={true}
            canvasProps={{ width, height: CANVAS_HEIGHT, className: 'w-full h-full' }}
          />
        )}
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs text-rose-300 bg-white/60 px-3 py-1 rounded-full">
              {placeholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

SignaturePad.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initialData: PropTypes.string,
};

export default SignaturePad;