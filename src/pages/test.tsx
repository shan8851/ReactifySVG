import { useState } from "react";
import { Checkmark } from "~/components/checkmark";
import { Cross } from "~/components/cross";
import { Editor } from "~/components/editor";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Idle } from "~/components/idle";
import { Options } from "~/components/options";
import { useScreenSize } from "~/hooks/useScreenSize";
import { ScreenSize } from "~/types";

export type ExportType = 'default' | 'const';

export default function Home() {
  const [componentName, setComponentName] = useState('');
  const [selectedExport, setSelectedExport] = useState<ExportType>('default');
  const [svgData, setSvgData] = useState<string>("")
  const [jsx, setJsx] = useState<string>("")
  const [svgState, setSvgState] = useState<string>("idle");
  const [copied, setCopied] = useState<boolean>(false);

  const screenSize = useScreenSize();

const parseSVGtoReactComponent = (svgString: string, componentName: string, exportType: ExportType): string => {
  if (!componentName.trim()) {
    componentName = 'ComponentName';
  }

  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(svgString, 'image/svg+xml');

  if (!parsedDoc.querySelector('svg')) {
    setSvgState('invalid');
    return 'Invalid SVG';
  }
  setSvgState('valid');
  // TRANSFORM SVG ON SERVER
  return 'transformed';
}


const handleCopyToClipboard = () => {
  navigator.clipboard.writeText(jsx)
    .then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

const iconClass = "w-24 h-24 self-center"
const renderIcon = svgState === 'valid' ? <Checkmark className={iconClass} /> : svgState === 'invalid' ? <Cross className={iconClass} /> : <Idle className={`${iconClass} stroke-typography`} />

const editorHeight = screenSize === ScreenSize.SMALL_DESKTOP ? 375 : screenSize === ScreenSize.DESKTOP ? 700 : 500;
  return (
    <main className="flex min-h-screen flex-col relative">
      <Header />
    <Options
      componentName={componentName}
      setComponentName={setComponentName}
      selectedExport={selectedExport}
      setSelectedExport={setSelectedExport}
    />
      <div className="flex justify-center gap-4 mt-3">
        <div className="w-[45%] max-w-[700px] flex flex-col gap-1">
        <p className="text-xl font-bold text-center">INPUT SVG</p>
        <Editor
          mode="xml"
          value={svgData}
          onChange={(value) => {
            setSvgData(value);

            if (!value) {
              setSvgState("idle");
              setJsx('');
            } else {
              const newComponent = parseSVGtoReactComponent(value, componentName, selectedExport);
              setJsx(newComponent);
            }
          }}
          style={{ width:'100%', borderRadius: 24, borderWidth: 8, borderColor: "#000", boxShadow: "0 2px 2px #fff", height: editorHeight }}
        />
        </div>
        {renderIcon}
        <div className="w-[45%] max-w-[700px] flex flex-col gap-1 relative">
        {jsx && svgState === 'valid' && !copied && <button onClick={handleCopyToClipboard} className="absolute right-4 underline hover:text-white">copy</button>}
        {copied && <span className="absolute right-4 text-green">copied!</span>}
        <p className="text-xl font-bold text-center">OUTPUT SVG</p>
         <Editor
          value={jsx}
          mode="jsx"
          isReadOnly
          style={{ width:'100%', borderRadius: 24, borderWidth: 8, borderColor: "#000", boxShadow: "0 2px 2px #fff", height: editorHeight }}
        />
        </div>
      </div>
      <Footer />
    </main>
  );
}

