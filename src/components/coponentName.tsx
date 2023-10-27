import React, { type Dispatch, type SetStateAction } from 'react';

type Props = {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>
};

export const ComponentNameInput = ({ componentName, setComponentName}:Props) => {
  return (
    <div className="flex flex-col space-y-2 flex-shrink-0">
      <input
        id="componentName"
        name="componentName"
        type="text"
        placeholder="Enter component name"
        className="p-2 border-2 border-white rounded-xl bg-black outline-none"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
      />
    </div>
  );
};

