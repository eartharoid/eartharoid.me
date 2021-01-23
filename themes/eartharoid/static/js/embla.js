const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
	prevBtn.addEventListener('click', embla.scrollPrev, false);
	nextBtn.addEventListener('click', embla.scrollNext, false);
};

const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
	return () => {
		if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
		else prevBtn.setAttribute('disabled', 'disabled');

		if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
		else nextBtn.setAttribute('disabled', 'disabled');
	};
};

const wrap = document.querySelector('.embla');
const viewPort = wrap.querySelector('.embla__viewport');
const prevBtn = wrap.querySelector('.embla__button--prev');
const nextBtn = wrap.querySelector('.embla__button--next');
const embla = EmblaCarousel(viewPort, {
	dragFree: true,
	containScroll: 'keepSnaps'
});
const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);

setupPrevNextBtns(prevBtn, nextBtn, embla);

embla.on('select', disablePrevAndNextBtns);
embla.on('init', disablePrevAndNextBtns);