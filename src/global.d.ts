declare module "react-globe.gl" {
  import { ComponentType } from "react";

  export interface Globe {
    pointOfView: (options: {
      lat: number;
      lng: number;
      altitude: number;
    }) => void;
    // 필요한 다른 메서드 및 속성을 추가합니다.
  }

  const Globe: ComponentType<any>;
  export default Globe;
}
