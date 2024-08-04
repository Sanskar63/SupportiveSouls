import React from "react";

interface Role {
  _id: string,
  designation: string,
  description: string,
}

interface RolesReaderProps {
  items: Role[];
}

const RolesReader: React.FC<RolesReaderProps> = ({ items }) => {
  return (
    <div className="w-[65%]">
      {items.map((item, index) => (
        <div key={index} className="text-black my-[5%]  border-black border-2 rounded-2xl p-4">
          <h3 className="md:text-3xl font-bold mb-2">{item.designation}</h3>
          <p className="text-sm md:text-xl text-black font-extralight">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RolesReader;
