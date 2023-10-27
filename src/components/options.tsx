import React, { type Dispatch, type SetStateAction } from 'react';
import { ComponentNameInput } from "./coponentName";
import { ExportTypeSelector } from "./exportType";
import { Cog } from './cog';
import { type ExportType } from '../page';

type Props = {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>
  selectedExport: ExportType;
  setSelectedExport: Dispatch<SetStateAction<ExportType>>
}

export const Options = ({
  componentName,
  setComponentName,
  selectedExport,
  setSelectedExport
}:Props) => (
  <div className="flex gap-4 items-center justify-center bg-deepCharcoal rounded-xl py-4 px-12 mx-4 shadow-sm shadow-white border-4 border-black w-fit self-center">
    <Cog className='w-8 h-8' />
    <ComponentNameInput
      componentName={componentName}
      setComponentName={setComponentName}
    />
    <ExportTypeSelector
      selectedExport={selectedExport}
      setSelectedExport={setSelectedExport}
    />
  </div>
)
