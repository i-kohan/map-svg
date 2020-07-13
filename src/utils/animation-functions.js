import gsap from 'gsap';

export const mapZoomIn = element => {
  const tl = gsap.timeline();

  tl.to(element, 0.3, {
    opacity: 1,
  });

  tl.to(element, 0.3, {
    scale: 1.5,
  })
}

export const mapZoomOut = element => {
  const tl = gsap.timeline();

  tl.to(element, 0.3, {
    scale: 1,
  })

  tl.to(element, 0.3, {
    opacity: 0,
  });
}

export const fadeIn = element => {
  gsap.to(element, 0.75, {
    opacity: 1,
    ease: "power4.out",
  });
};

export const fadeOut = element => {
  gsap.to(element, 0.75, {
    opacity: 0,
    ease: "power4.out"
  });
};
