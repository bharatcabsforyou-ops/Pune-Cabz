export const carAssets = {
  cursorSedan: "/icons/car-assets/cursor-car-clean.svg",
  cursorSedanPhoto: "/icons/car-assets/cursor-sedan.png",
  searchCars: "/icons/car-assets/search-cars.png",
  buyCars: "/icons/car-assets/buy-cars.png",
  bookDrive: "/icons/car-assets/book-drive.png",
  findDealer: "/icons/car-assets/find-dealer.png",
  evCars: "/icons/car-assets/ev-cars.png",
  carKeys: "/icons/car-assets/car-keys.png",
  steeringWheel: "/icons/car-assets/steering-wheel.png",
  wheelBrake: "/icons/car-assets/wheel-brake.png",
  speedometer: "/icons/car-assets/speedometer.png",
  tools: "/icons/car-assets/tools.png",
} as const;

export type CarAssetKey = keyof typeof carAssets;
