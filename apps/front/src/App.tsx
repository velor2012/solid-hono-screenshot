import { createSignal, type Component } from "solid-js";
// import logo from './logo.svg';
// import styles from './App.module.css';
import { Button } from "@kobalte/core/button";
import { SelectTypeCom } from "./components/SelectType";
import { Skeleton } from "@kobalte/core/skeleton";
import { Image } from "@kobalte/core/image";
import { Input } from "./components/Input";
import { MyDialog } from "./components/Dialog";
import { ConfigProvider, useConfig } from "./ConfigProvider";
const App: Component = () => {
  const {config, setUrl, setH, setW, setType, showConfig} = useConfig();
  const [lodingImg, setLodingImg] = createSignal(true);
  const [imgUrl, setImgUrl] = createSignal("");
  const [isSubmit, setIsSubmit] = createSignal(false);
  const onLoadingStatusChange = (
    status: "idle" | "loading" | "loaded" | "error"
  ) => {
    if (status === "loading") {
      setLodingImg(true);
    } else if (status === "loaded") {
      setLodingImg(false);
    }
  };
  const typeOptions = [
    "服务端截屏",
    "api截屏-1",
    "api截屏-2",
    "api截屏-3",
    "api截屏-4",
  ];
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const clickHandler = async () => {
    setLodingImg(true);
    setIsSubmit(true);
    let apiType = 1;
    if (config.type == "服务端截屏") {
      setImgUrl(`${baseUrl}/screenshot?url=${config.url}`);
    } else {
      switch (config.type) {
        case "api截屏-1":
          apiType = 1;
          break;
        case "api截屏-2":
          apiType = 2;
          break;
        case "api截屏-3":
          apiType = 3;
          break;
        case "api截屏-4":
          apiType = 4;
          break;
        default:
          console.log(3);
          break;
      }
      setImgUrl(
        `${baseUrl}/screenshotFromApi?url=${config.url}&type=${apiType}`
      );
    }
  };

  const MyConfig = () => {
    return (
      <div>
        <SelectTypeCom
          value={config.type}
          onChange={setType}
          options={typeOptions}
          description=""
        />
        <Input setValue={setW} value={config.w} title="输入图片宽度" />
          <Input setValue={setH} value={config.h} title="输入图片高度" />
      </div>
    );
  };

  return (
    <div class="w-screen h-screen">
        <div class="w-full h-full flex justify-center items-center flex-col gap-2">
          <div>
            <Input
              onClick={clickHandler}
              setValue={setUrl}
              value={config.url}
              title="输入网址"
            />
          </div>
          <div class="flex gap-2">
            <Button class="button" onClick={clickHandler}>
              开始截图
            </Button>
            <MyDialog btnText="其他配置" title="配置" content={MyConfig} />
            <Button class="button" onClick={showConfig}>
              显示配置
            </Button>
          </div>
          {isSubmit() && (
            <Skeleton
              class="skeleton"
              visible={lodingImg()}
              width={800}
              height={600}
            >
              <Image onLoadingStatusChange={onLoadingStatusChange}>
                <Image.Img
                  class="image__img"
                  src={imgUrl()}
                  alt="Nicole Steeves"
                />
                <Image.Fallback class="image__fallback">NS</Image.Fallback>
              </Image>
            </Skeleton>
          )}
          {!isSubmit() && <div class="w-[600px] h-[600px]"></div>}
        </div>
    </div>
  );
};

export default App;
