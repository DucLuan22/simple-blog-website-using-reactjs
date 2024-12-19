import React from "react";

interface TitleInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder="Title"
        value={value}
        onChange={onChange}
        className="border-none p-[20px] md:p-[30px] lg:p-[40px] md:text-[40px] lg:text-[50px] outline-none w-full focus:text-foreground bg-primary-foreground"
      />
    </div>
  );
}

export default TitleInput;
