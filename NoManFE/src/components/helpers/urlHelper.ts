import { AppConfig } from "../../Contexts/ConfigContext/types";

export  const moviesApiPath = (config:AppConfig) => `${config.apiHost}:${config.apiPort}${config.apiPaths.moviesPath}`;
export const movieApiPath = (config:AppConfig, id:number) => `${config.apiHost}:${config.apiPort}${config.apiPaths.moviesPath}/${id}`;
export const showTimesApiPath = (config:AppConfig, id:number) => `${config.apiHost}:${config.apiPort}${config.apiPaths.movieShowingsPath}/${id}`;
export const bookingPostPath = (config:AppConfig) => `${config.apiHost}:${config.apiPort}${config.apiPaths.movieBookingPath}`;