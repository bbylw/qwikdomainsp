import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

/**
 * Preview server entry point (`vite preview` against an SSR build).
 */
export default createQwikCity({ render, qwikCityPlan });
