import React, { useEffect, useRef } from "react";
import { XCircle } from "react-feather";

type Props = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  children: React.ReactNode;
  title?: string;
};

const ModalContainer: React.FC<Props> = ({ isHidden, setIsHidden, children, title }) => {
  const ref = useRef(null);

  const handleClick = (e: MouseEvent): void => {
    if (!ref?.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((ref.current as any).contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsHidden(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (isHidden) {
    return <div ref={ref}></div>;
  }
  return (
    <div className="min-w-min">
      <div
        className={`fixed left-0 top-0 w-full h-full bg-black bg-opacity-20 flex justify-center items-center z-10`}
      >
        <div className="fixed top-52 bg-white rounded-xl py-3 px-6 max-w-lg" ref={ref}>
          <div className="flex flex-row justify-center w-full mb-5 relative">
            <h2 className="text-center text-xl font-semibold break-normal w-60">{title}</h2>
            <XCircle
              className="rounded-full absolute right-0 hover:text-white hover:bg-black transition-colors duration-100 ease-in-out cursor-pointer mt-2"
              onClick={() => setIsHidden(true)}
              size="16px"
            />
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
