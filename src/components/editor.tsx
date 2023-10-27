import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-xml";

type EditorProps = {
  mode: string;
  value: string;
  debounceChangePeriod?: number;
  isReadOnly?: boolean;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
};

export const Editor = ({ value, mode, isReadOnly, debounceChangePeriod, onChange, style }: EditorProps) => (
  <AceEditor
    mode={mode}
    value={value}
    theme="monokai"
    readOnly={isReadOnly}
    showPrintMargin={false}
    debounceChangePeriod={debounceChangePeriod}
    editorProps={{ $blockScrolling: Infinity }}
    setOptions={{ showFoldWidgets: false }}
    onChange={onChange}
    style={style}
    fontSize={16}
  />
);
