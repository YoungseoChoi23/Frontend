import DefaultButton from "./Button/DefaultButton";

const MajorComponent = () => {
  const majorStyle = "w-[3.5rem] text-xs font-medium text-gray_400";
  return (
    <>
      <div className="flex gap-[4.25rem] w-[28.5rem]">
        <div className="text-sm font-medium text-neutralBlack">전공</div>
        <div className="flex flex-col gap-[1.2rem]">
          <div className="flex gap-[3.5rem]">
            <div className={majorStyle}>주전공</div>
            <div className="text-sm font-medium text-neutralBlack">
              컴퓨터공학과
            </div>
          </div>
          <div className="flex gap-[3.5rem]">
            <div className={majorStyle}>부·복수전공</div>
            <div className="text-sm font-medium text-neutralBlack">
              컴퓨터공학과
            </div>
          </div>
          <div className="flex gap-[3.5rem]">
            <div className={majorStyle}>부·복수전공</div>
            <div className="text-sm font-medium text-neutralBlack">
              컴퓨터공학과
            </div>
          </div>
        </div>
        <div className="ml-[5rem]">
          <DefaultButton text="편집" />
        </div>
      </div>
    </>
  );
};
export default MajorComponent;