import type { NextPage } from "next";

const RecordingBar: NextPage = () => {
  return (
    <div className="flex h-40 mb-5">
      <div className="absolute left-1">
        <img
          className="relative rounded-31xl w-[2.5rem] h-[2.5rem] overflow-hidden shrink-0"
          alt=""
          src="../../public/record.png"
        />
        <div className="right-20">
          <img
            className="relative w-[1rem] h-[1rem] overflow-hidden shrink-0"
            alt=""
            src="../../public/unused.svg"
          />
        </div>
      </div>
      </div>
  );
};

export default RecordingBar;
