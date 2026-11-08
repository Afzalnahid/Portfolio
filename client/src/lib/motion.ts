// One place where GSAP and its plugins are registered (every plugin is free
// since GSAP 3.13). Components import gsap from here, never from "gsap"
// directly, so a plugin is never used before it is registered.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

// Motion only for people who have not asked their device for less of it.
// Under "reduce" every element simply shows in its final state.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
// Pointer effects (tilt, magnetic buttons) only with a real mouse.
export const FINE_POINTER = "(prefers-reduced-motion: no-preference) and (pointer: fine)";

// Timing from the motion-design skill: entrances ease out, nothing on screen
// waits on a stagger longer than ~0.5 s in total.
export const EASE_OUT = "power3.out";
