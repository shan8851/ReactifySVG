import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "~/components/editor";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Options } from "~/components/options";
import { SvgStateIcon } from "~/components/svgStateIcon";
import useDebounce from "~/hooks/useDebounce";
import { useScreenSize } from "~/hooks/useScreenSize";
import { ExportType, SvgState } from "~/types";
import { api } from "~/utils/api";
import { getEditorheight } from "~/utils/getEditorHeight";

export default function Home() {
const [componentName, setComponentName] = useState<string>('');
  const [selectedExport, setSelectedExport] = useState<ExportType>(ExportType.DEFAULT);
  const [svgData, setSvgData] = useState<string>("")
  const [jsx, setJsx] = useState<string>("")
  const [svgState, setSvgState] = useState<SvgState>(SvgState.IDLE);
  const [copied, setCopied] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(svgData, 1000);
  const screenSize = useScreenSize();
  const editorHeight = getEditorheight(screenSize);
  const transformSvg = api.svg.transformSVG.useMutation();
  const incrementCount = api.svg.incrementCount.useMutation();
  const { refetch: refetchCount } = api.svg.getCount.useQuery();
const transformSVG = (svgString: string, componentName: string, exportType: ExportType) => {
   setSvgState(SvgState.LOADING);
   setJsx('');
   transformSvg.mutate({ svgString, exportType, componentName}, {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSuccess: async (response) => {
      try {
        await incrementCount.mutateAsync();
        await refetchCount();
        setSvgState(SvgState.SUCCESS);
        setJsx(response);
      } catch (error) {
        console.error("Failed to increment count:", error);
      }
    },
    onError: (error) => {
      console.error("Failed to transform SVG:", error);
      setSvgState(SvgState.ERROR);
      return 'Invalid SVG';
    }
  });
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

useEffect(() => {
  if (!debouncedValue) return;
  transformSVG(debouncedValue, componentName === '' ? 'IconComponent' : componentName, selectedExport)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [debouncedValue, componentName, selectedExport])

  return (
    <>
      <Head>
        <title>ReactifySVG</title>
        <meta name="description" content="Turn your SVGs into React components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <p className="text-xl font-bold text-center">Paste your SVG</p>
        <Editor
          mode="xml"
          value={svgData}
          onChange={(value) => {
            setSvgData(value);
            if (!value) {
              setSvgState(SvgState.IDLE);
              setJsx('');
            }
          }}
          style={{ width:'100%', borderRadius: 24, borderWidth: 8, borderColor: "#000", boxShadow: "0 2px 2px #fff", height: editorHeight }}
        />
        </div>
        <SvgStateIcon svgState={svgState} />
        <div className="w-[45%] max-w-[700px] flex flex-col gap-1 relative">
        {jsx && svgState === SvgState.SUCCESS && !copied && <button onClick={handleCopyToClipboard} className="absolute right-4 underline hover:text-white">copy</button>}
        {copied && <span className="absolute right-4 text-green">copied!</span>}
        <p className="text-xl font-bold text-center">Grab your JSX</p>
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
    </>
  );
}
