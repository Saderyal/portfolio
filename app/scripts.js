import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { TextPlugin } from 'gsap/TextPlugin.js';
import Lenis from 'lenis';

window.addEventListener('load', () => {
	gsap.from('body', { autoAlpha: 0 }); // here it'll start
});

// Initialize a new Lenis instance for smooth scrolling
const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const introTl = gsap
	.timeline({ defaults: { duration: 1 } })
	.to('#intro-section .greetings, #intro-section p', {
		opacity: 0,
	})
	.to('#intro-section .fullname', {
		xPercent: -20,
	})
	.to(
		'#intro-section svg',
		{
			rotateZ: 180,
		},
		'<'
	)
	.from(
		'.clown',
		{
			opacity: 0,
			x: -50,
		},
		'<+1'
	);

ScrollTrigger.create({
	trigger: '#intro-section',
	start: 'top top',
	end: 'bottom top',
	animation: introTl,
	pin: true,
	scrub: 0.2,
	markers: true,
});
