import { createSignal, createContext, useContext, Context } from "solid-js";
import { createStore } from "solid-js/store";
import { showToast } from "./components/Toast";
let ConfigContext: Context<{
    config: {
        w: number | string;
        h: number | string;
        url: string;
        type: string;
    };
    showConfig: () => void;
    setUrl: (newV: string) => void;
    setW: (newV: number | string) => void;
    setH: (newV: number | string) => void;
    setType: (newV: string) => void;
}>

export function ConfigProvider(props: any) {
  const [config, setConfig] = createStore({
    w: 800 as (number | string),
    h: 600 as (number | string),
    url: "https://www.baidu.com",
    type: "服务端截屏",
  });
  const setUrl = (newV: string) => {
    setConfig("url", newV);
  };
  const setW = (newV: number | string) => {
    setConfig("w", newV);
  };
  const setH = (newV: number | string) => {
    setConfig("h", newV);
  };
  const setType = (newV: string) => {
    setConfig("type", newV);
  };
  
  const showConfig = () => {
    showToast({title: "配置", content: JSON.stringify(config)})
    console.log("showConfig:", config);
  };

  const exportData = {config, showConfig, setUrl, setW, setH, setType}
  ConfigContext = createContext(exportData)

  return (
    <ConfigContext.Provider value={exportData}>
      {props.children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
