'use client'

import { useRef, useEffect } from "react"
import ProductCard from './ProductCard'
import { Poppins } from "next/font/google";

const poppins = Poppins({
	subsets: ['latin'],
	weight:"400",
  })

export function CategorySection({ id, name, products }) {

	useEffect(() => {
		const slider = document.querySelector(`.items${id}`);
		let isDown = false;
		let startX;
		let scrollLeft;

		// Mouse events
		const mouseDown = (e) => {
			isDown = true;
			slider.classList.add('active');
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		};
		const mouseLeave = () => {
			isDown = false;
			slider.classList.remove('active');
		};
		const mouseUp = () => {
			isDown = false;
			slider.classList.remove('active');
		};
		const mouseMove = (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 1;
			slider.scrollLeft = scrollLeft - walk;
			console.log(walk);
		};

		// Touch events
		const touchStart = (e) => {
			isDown = true;
			slider.classList.add('active');
			const touch = e.touches[0];
			startX = touch.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		};
		const touchEnd = () => {
			isDown = false;
			slider.classList.remove('active');
		};
		const touchMove = (e) => {
			if (!isDown) return;
			e.preventDefault();
			const touch = e.touches[0];
			const x = touch.pageX - slider.offsetLeft;
			const walk = (x - startX) * 1;
			slider.scrollLeft = scrollLeft - walk;
			console.log(walk);
		};

		// Add event listeners for mouse and touch events
		slider.addEventListener('mousedown', mouseDown);
		slider.addEventListener('mouseleave', mouseLeave);
		slider.addEventListener('mouseup', mouseUp);
		slider.addEventListener('mousemove', mouseMove);

		slider.addEventListener('touchstart', touchStart);
		slider.addEventListener('touchend', touchEnd);
		slider.addEventListener('touchmove', touchMove);

		// Cleanup event listeners
		return () => {
			slider.removeEventListener('mousedown', mouseDown);
			slider.removeEventListener('mouseleave', mouseLeave);
			slider.removeEventListener('mouseup', mouseUp);
			slider.removeEventListener('mousemove', mouseMove);

			slider.removeEventListener('touchstart', touchStart);
			slider.removeEventListener('touchend', touchEnd);
			slider.removeEventListener('touchmove', touchMove);
		};
	}, [id]);

	return (
		<div className={`w-full ${poppins.className}`}>
		  <h1 className="text-xl font-bold text-[#0355bb]">{name}</h1>
		  <div className="grid-container w-full mb-3">
			<main className="grid-item main w-full">
			  <div className={`items${id} items flex gap-4 overflow-x-auto`}>
				{products.map((product) => (
				  <div
					key={product.id}
					className="item flex-shrink-0"
				  >
					<ProductCard product={product} />
				  </div>
				))}
			  </div>
			</main>
		  </div>
	
		  <style jsx>{`
			.items${id} {
			  overflow-x: hidden;
			}
	
			.grid-container {
			  overflow-x: hidden;
			}
	
			* {
			  scrollbar-width: none;
			  -ms-overflow-style: none;
			}
	
			*::-webkit-scrollbar {
			  display: none;
			}
		  `}</style>
		</div>
	  );
}
