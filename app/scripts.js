import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { TextPlugin } from 'gsap/TextPlugin.js';
import Lenis from 'lenis';

document.querySelectorAll('.lazy-img').forEach((img) => {
	img.onload = () => {
		ScrollTrigger.refresh();
	};
});

gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.addEventListener('load', () => {
	gsap.from('body', { autoAlpha: 0 }); // here it'll start
});

// LENIS
const lenis = new Lenis({
	touchInertiaMultiplier: 10,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});
gsap.ticker.lagSmoothing(0);

/* ========== INTRO  ==========*/

const introTl = gsap
	.timeline({ defaults: { duration: 1 } })
	.to('#intro .greetings, #intro p', {
		opacity: 0,
	})
	.to('#intro .fullname', {
		xPercent: -20,
	})
	.to(
		'#intro svg',
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
	trigger: '#intro',
	start: 'top top',
	end: 'bottom+=400 top',
	animation: introTl,
	pin: true,
	scrub: 0.2,
	markers: false,
});

/* ========== COURTAINS ========== */

const courtainsTl = gsap
	.timeline()
	.to(
		'.courtains-title:nth-child(1)',
		{
			x: -100,
			y: -100,
			opacity: 0,
		},
		'+=0.15'
	)
	.to(
		'.courtains-title:nth-child(2)',
		{
			x: 100,
			y: 100,
			opacity: 0,
		},
		'<'
	)
	.from(
		'.courtains-text',
		{
			scale: 0,
			opacity: 0,
		},
		'<+=0.03'
	)
	.from('.courtains.left', {
		xPercent: -100,
	})
	.from(
		'.courtains.right',
		{
			xPercent: 100,
		},
		'<'
	);

ScrollTrigger.create({
	trigger: '#courtains',
	start: 'top top',
	end: 'top+=3000 bottom',
	animation: courtainsTl,
	pin: true,
	scrub: 0.5,
	markers: false,
});

/* ========== PRESENTATION ========== */
const presentationParagraphs = document.querySelectorAll('#presentation .info > div');
const presentationTitle = document.querySelector('#presentation .stickyTitle > h3');

const presentationTitles = [
	'Who am I?',
	'What are<br/>my passions?',
	'What about<br/>my hobbies?',
	'What do I do<br/>for a living?',
];

presentationTitles.forEach((title, i) => {
	const tweenCb = () => gsap.to(presentationTitle, { text: title });
	const tweenCbBack = () =>
		gsap.to(presentationTitle, {
			text: {
				value: title,
				rtl: true,
			},
		});
	ScrollTrigger.create({
		trigger: presentationParagraphs[i],
		start: 'top 50% ',
		end: 'bottom 50%',
		markers: false,
		onEnter: tweenCb,
		onEnterBack: tweenCbBack,
		scrub: 1,
	});
});

/* ========== EDUCATION ========== */

const certificatesIntroTl = gsap
	.timeline()
	.to(
		'#certificates .title',
		{
			opacity: 0,
		},
		'1'
	)
	.from('#certificates .school', {
		opacity: 0,
	})
	.to(
		'#certificates .school',
		{
			opacity: 0,
		},
		'>+1'
	)
	.from('#certificates .but', {
		opacity: 0,
	})
	.to(
		'#certificates .but',
		{
			opacity: 0,
		},
		'>+1'
	);

ScrollTrigger.create({
	trigger: '#certificates > .intro',
	animation: certificatesIntroTl,
	start: 'top top',
	end: 'bottom+=1500 bottom',
	markers: false,
	pin: true,
	scrub: 0.5,
});

const certificates = document.querySelectorAll('.numberOfCertificates');

certificates.forEach((certificate) => {
	gsap.set(certificate.querySelectorAll('.number'), { yPercent: -50 });

	const numberOfCertificatesTl = gsap
		.timeline()
		.from(certificate.querySelectorAll('.number > div'), {
			yPercent: 100,
			stagger: 0.2,
		})
		.from(
			certificate.querySelector('.info'),
			{
				opacity: 0,
			},
			'<'
		);

	ScrollTrigger.create({
		trigger: certificate,
		start: 'top bottom',
		end: 'top 80%',
		animation: numberOfCertificatesTl,
		markers: false,
		scrub: 1,
	});
});

/* ========== KNOWLEDGE ========== */
const knowledge = document.querySelector('#knowledge .horizontal-scroll');

const getScrollAmount = () => {
	return -(knowledge.scrollWidth - window.innerWidth + (window.innerWidth / 2 - 200));
};

const tween = gsap.to(knowledge, {
	x: getScrollAmount,
	duration: 3,
	ease: 'none',
});

ScrollTrigger.create({
	trigger: '#knowledge .wrapper',
	start: 'top top',
	end: () => `+=${getScrollAmount() * -1}`,
	pin: true,
	animation: tween,
	scrub: 1,
	invalidateOnRefresh: true,
	markers: false,
});

ScrollTrigger.create({
	trigger: '.technologies',
	start: 'top bottom',
	end: 'bottom+=200 top',
	scrub: 0.5,
	markers: false,
	animation: gsap.to('.parallax-logo', {
		duration: 1,
		y: (_i, target) => {
			const multiplier = target.dataset.multiplier;
			return `-=${100 * multiplier}`;
		},
	}),
});

/* ========== ENGIMEDIA ========== */
const getBottom = () => {
	return document.getElementById('engimedia').clientHeight - window.innerWidth;
};

const engimediaTween = gsap.from('#engimedia .logo', { bottom: getBottom, ease: 'none' });

ScrollTrigger.create({
	trigger: '#engimedia',
	start: 'top top',
	end: 'bottom 80%',
	animation: engimediaTween,
	invalidateOnRefresh: true,
	scrub: 0,
	markers: false,
});

/* ========== SET IT UP ========== */
const getFinalSize = () => {
	return (
		Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) * 2
	);
};

ScrollTrigger.create({
	trigger: '#setitup .background',
	start: 'top top',
	end: 'bottom+=1000 bottom',
	animation: gsap.to('#setitup .background .circle', {
		width: getFinalSize,
		height: getFinalSize,
		ease: 'power2.out',
	}),
	invalidateOnRefresh: true,
	pin: true,
	scrub: 0,
	markers: false,
});

const setitupBubblesTween = gsap.to('#setitup .bubble', {
	y: -600,
});

ScrollTrigger.create({
	trigger: '#setitup .content',
	start: 'top bottom',
	end: 'bottom top',
	animation: setitupBubblesTween,
	scrub: 0.5,
	markers: false,
});

/* ========== WOMPO ========== */
const wompoIntroTween = gsap
	.timeline()
	.to('#wompo .bubble', {
		backgroundColor: '#573EF6',
		width: () =>
			Math.max(window.innerWidth, window.innerHeight) +
			Math.min(window.innerWidth, window.innerHeight) / 2,
		height: () =>
			Math.max(window.innerWidth, window.innerHeight) +
			Math.min(window.innerWidth, window.innerHeight) / 2,
	})
	.from('#wompo-logo', {
		opacity: 0,
		scale: 0.5,
	})
	.from(
		'#wompo .wompo-title',
		{
			opacity: 0,
			y: 100,
		},
		'>-0.3'
	);

ScrollTrigger.create({
	trigger: '#wompo .intro',
	start: 'top top',
	end: 'bottom+=1000 top',
	animation: wompoIntroTween,
	pin: true,
	scrub: 0.2,
	markers: false,
});

document.querySelectorAll('#wompo .info .container p').forEach((p, i) => {
	const tween = gsap.from(p, {
		opacity: 0,
		x: i % 2 === 0 ? -100 : 100,
	});
	ScrollTrigger.create({
		trigger: p,
		start: 'top 80%',
		end: 'bottom top',
		animation: tween,
		toggleActions: 'restart none none reverse',
		markers: false,
	});
});
