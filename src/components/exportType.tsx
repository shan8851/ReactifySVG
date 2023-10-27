import React, { type Dispatch, type SetStateAction } from 'react';
import { type ExportType } from '../page';

type Props = {
  selectedExport: ExportType;
  setSelectedExport: Dispatch<SetStateAction<ExportType>>
};

export const ExportTypeSelector = ({ selectedExport, setSelectedExport }:Props) => {
  return (
    <div className="space-y-4 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
        <input
          id="default"
          name="exportType"
          type="radio"
          className="form-radio h-6 w-6 text-black"
          value="default"
          checked={selectedExport === 'default'}
          onChange={() => setSelectedExport('default')}
        />
        <label htmlFor="default" className="ml-3 block text-lg font-medium">
          export default
        </label>
      </div>

      <div className="flex items-center">
        <input
          id="const"
          name="exportType"
          type="radio"
          className="form-radio h-6 w-6 text-black"
          value="const"
          checked={selectedExport === 'const'}
          onChange={() => setSelectedExport('const')}
        />
        <label htmlFor="const" className="ml-3 block text-lg font-medium">
          export const
        </label>
      </div>
      </div>
    </div>
  );
};
