import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { TextPlugin } from 'gsap/TextPlugin.js';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

window.addEventListener('load', () => {
	gsap.from('body', { autoAlpha: 0 }); // here it'll start
});

// LENIS
const lenis = new Lenis();
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
ScrollTrigger.create({
	trigger: '#presentation .title',
	start: 'top 50% ',
	end: 'bottom+=500 50%',
	markers: false,
	pin: true,
});

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
	end: 'bottom+=2000 bottom',
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
		end: 'top 50%',
		animation: numberOfCertificatesTl,
		markers: true,
		scrub: 1,
	});
});
