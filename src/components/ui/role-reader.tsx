import React from "react";

interface Role {
  designation: string;
  description: string;
}

interface RolesReaderProps {
  items: Role[];
}

const RolesReader: React.FC<RolesReaderProps> = ({ items }) => {
  return (
    <div className="w-[65%]">
      {items.map((item, index) => (
        <div key={index} className="text-black my-[5%]">
          <h3 className="md:text-3xl font-bold mb-2">{item.designation}</h3>
          <p className="text-sm md:text-xl">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RolesReader;
