declare module "*.geojson" {
  const value: {
    type: string;
    features: {
      type: string;
      properties: {
        [key: string]: any;
      };
      geometry: {
        type: string;
        coordinates: number[][][];
      };
    }[];
  };
  export default value;
}
