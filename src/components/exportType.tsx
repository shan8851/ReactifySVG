import React, { type Dispatch, type SetStateAction } from 'react';
import { ExportType } from '~/types';

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
          checked={selectedExport === ExportType.DEFAULT}
          onChange={() => setSelectedExport(ExportType.DEFAULT)}
        />
        <label htmlFor="default" className="ml-3 block text-lg font-medium">
          Default export
        </label>
      </div>

      <div className="flex items-center">
        <input
          id="named"
          name="exportType"
          type="radio"
          className="form-radio h-6 w-6 text-black"
          value="named"
          checked={selectedExport === ExportType.NAMED}
          onChange={() => setSelectedExport(ExportType.NAMED)}
        />
        <label htmlFor="named" className="ml-3 block text-lg font-medium">
          Named export
        </label>
      </div>
      </div>
    </div>
  );
};
