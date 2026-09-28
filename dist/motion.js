'use strict';

(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  const opening = document.querySelector('.opening-screen');
  const skip = document.querySelector('.opening-skip');
  const toggle = document.querySelector('.motion-toggle');
  let paused = false;
  let openingFinished = !root.classList.contains('intro-playing');
  let openingTimer;
  let revealTimer;

  function finishOpening() {
    if (openingFinished) return;
    openingFinished = true;
    clearTimeout(openingTimer);
    const hadFocus = opening.contains(document.activeElement);
    root.classList.remove('intro-playing');
    if (hadFocus) document.querySelector('.brand').focus({preventScroll:true});
    opening.hidden = true;
    if (!reduced.matches) {
      hero.classList.add('hero-revealing');
      revealTimer = setTimeout(() => hero.classList.remove('hero-revealing'), 2000);
    }
  }
  opening.addEventListener('animationend', event => {
    if (event.animationName === 'intro-exit') finishOpening();
  });
  skip.addEventListener('click', finishOpening);
  // Keyboard, scroll and touch input can always interrupt the intro.
  document.addEventListener('keydown', event => {
    if (!openingFinished && ['Escape','Tab','PageDown','ArrowDown',' '].includes(event.key)) finishOpening();
  });
  window.addEventListener('wheel', () => { if (!openingFinished) finishOpening(); }, {passive:true});
  window.addEventListener('touchstart', () => { if (!openingFinished) finishOpening(); }, {passive:true});
  if (!openingFinished) openingTimer = setTimeout(finishOpening, 2600);
  else opening.hidden = true;

  // 3D vertices are projected into a 2D canvas. These are mathematical shapes,
  // with no image downloads, particle framework, or continuous layout reads.
  const cube = {
    points:[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],
    edges:[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
  };
  const octa = {points:[[1.4,0,0],[-1.4,0,0],[0,1.4,0],[0,-1.4,0],[0,0,1.4],[0,0,-1.4]],edges:[[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[2,5],[3,4],[3,5]]};
  const ring = {points:[],edges:[]};
  for (let layer=0;layer<2;layer++) {
    for (let i=0;i<24;i++) {
      const a=i/24*Math.PI*2;
      ring.points.push([Math.cos(a)*1.2,Math.sin(a)*1.2,layer ? .52 : -.52]);
      ring.edges.push([layer*24+i,layer*24+(i+1)%24]);
    }
  }
  for (const i of [0,6,12,18]) ring.edges.push([i,i+24]);
  const meshes=[cube,octa,ring];
  // x/y are section-relative; sizes are in CSS pixels. Text areas stay clear.
  const layouts={
    hero:[[.03,.08,17],[.27,.04,19],[.49,.14,22],[.76,.06,17],[.96,.1,24],[.025,.47,14],[.49,.48,16],[.93,.46,21],[.055,.84,19],[.28,.88,15],[.53,.83,23],[.76,.89,18],[.97,.8,20],[.66,.44,14],[.86,.31,13],[.4,.96,15]],
    about:[[.035,.19,19],[.43,.15,24],[.94,.89,25],[.38,.86,17]],
    strengths:[[.96,.1,22],[.04,.83,24],[.48,.93,17]],
    contact:[[.035,.2,17],[.49,.1,23],[.93,.17,21],[.52,.83,18],[.95,.88,27]]
  };
  const fields=[];
  document.querySelectorAll('[data-geometry]').forEach(canvas => {
    const context=canvas.getContext('2d');
    if (!context) return;
    const type=canvas.dataset.geometry;
    const palette=type==='contact' ? ['#f0d8a7','#f9e5e8','#e0ae65'] : type==='strengths' ? ['#d4ab65','#8390ac','#c34b59'] : ['#b51f30','#b38a43','#465875'];
    fields.push({canvas,context,type,palette,width:0,height:0,visible:false,layout:layouts[type]});
  });
  let frame=0;
  let elapsed=0;
  let lastTime=0;
  let lastPaint=0;

  function draw(field) {
    const {context:ctx,width,height,layout,palette}=field;
    ctx.clearRect(0,0,width,height);
    const small=width<650;
    const visibleLayout=small && field.type==='hero'
      ? [[.96,.08,17],[.018,.19,13],[.98,.34,12],[.98,.48,14],[.018,.62,13],[.96,.77,18],[.82,.93,12],[.03,.95,13]]
      : small ? layout.map(([x,y,size],i)=>[i%2 ? .98 : .02,y,size*.8]) : layout;
    visibleLayout.forEach(([px,py,size],i) => {
      const mesh=meshes[i%3];
      const phase=i*1.83;
      const t=elapsed*.001;
      const ax=phase+t*(i%2 ? .17 : -.14);
      const ay=phase*.61+t*.21;
      const az=phase*.4+t*(i%2 ? -.09 : .08);
      const cx=Math.cos(ax),sx=Math.sin(ax),cy=Math.cos(ay),sy=Math.sin(ay),cz=Math.cos(az),sz=Math.sin(az);
      const radius=size*(small ? .72 : 1);
      const centerX=width*px+Math.sin(t*.35+phase)*(small ? 3 : 8);
      const centerY=height*py+Math.sin(t*.44+phase)*(small ? 5 : 12);
      const points=mesh.points.map(([x,y,z]) => {
        const y1=y*cx-z*sx,z1=y*sx+z*cx;
        const x2=x*cy+z1*sy,z2=-x*sy+z1*cy;
        const x3=x2*cz-y1*sz,y3=x2*sz+y1*cz;
        const p=4.8/(4.8-z2);
        return [centerX+x3*radius*p,centerY+y3*radius*p];
      });
      ctx.strokeStyle=palette[i%palette.length];
      ctx.globalAlpha=field.type==='hero' ? .62 : .38;
      ctx.lineWidth=small ? 1 : 1.25;
      ctx.lineJoin='round';
      ctx.beginPath();
      mesh.edges.forEach(([a,b])=>{ctx.moveTo(...points[a]);ctx.lineTo(...points[b]);});
      ctx.stroke();
    });
    ctx.globalAlpha=1;
  }
  function canRun() {return !paused && !reduced.matches && !document.hidden && fields.some(f=>f.visible);}
  function tick(now) {
    frame=0;
    if (!canRun()) {lastTime=0;return;}
    if (lastTime) elapsed+=Math.min(now-lastTime,64);
    lastTime=now;
    if (now-lastPaint>=1000/30) {fields.filter(f=>f.visible).forEach(draw);lastPaint=now;}
    frame=requestAnimationFrame(tick);
  }
  function syncAnimation() {
    if (canRun()) {if (!frame) {lastTime=0;frame=requestAnimationFrame(tick);}}
    else {cancelAnimationFrame(frame);frame=0;lastTime=0;}
  }
  function resize(field) {
    const width=field.canvas.clientWidth,height=field.canvas.clientHeight;
    const dpr=Math.min(devicePixelRatio||1,width<650 ? 1.5 : 2);
    field.width=width;field.height=height;
    field.canvas.width=Math.round(width*dpr);field.canvas.height=Math.round(height*dpr);
    field.context.setTransform(dpr,0,0,dpr,0,0);
    draw(field);
  }
  if ('ResizeObserver' in window) {
    const resizeObserver=new ResizeObserver(entries=>entries.forEach(entry=>{const field=fields.find(f=>f.canvas===entry.target);if(field)resize(field);}));
    fields.forEach(f=>resizeObserver.observe(f.canvas));
  } else window.addEventListener('resize',()=>fields.forEach(resize),{passive:true});
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        const field=fields.find(f=>f.canvas===entry.target);
        if(field)field.visible=entry.isIntersecting;
        if(entry.target===hero)hero.classList.toggle('is-offscreen',!entry.isIntersecting);
      });
      syncAnimation();
    },{rootMargin:'80px'});
    fields.forEach(f=>observer.observe(f.canvas));
    observer.observe(hero);
  } else fields.forEach(f=>{f.visible=true;});

  function updatePreference() {
    root.classList.toggle('motion-paused',paused||reduced.matches);
    root.classList.toggle('motion-ready',!reduced.matches);
    toggle.hidden=reduced.matches;
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.querySelector('.motion-toggle-label').textContent=paused ? '動きを再生' : '動きを止める';
    toggle.querySelector('.motion-toggle-icon').textContent=paused ? '▷' : 'Ⅱ';
    if (reduced.matches) {
      finishOpening();
      clearTimeout(revealTimer);
      hero.classList.remove('hero-revealing');
      elapsed=0;
      fields.forEach(draw);
    }
    syncAnimation();
  }
  toggle.addEventListener('click',()=>{paused=!paused;updatePreference();});
  reduced.addEventListener('change',updatePreference);
  document.addEventListener('visibilitychange',()=>{
    root.classList.toggle('page-hidden',document.hidden);
    syncAnimation();
  });
  window.addEventListener('pagehide',()=>{finishOpening();cancelAnimationFrame(frame);frame=0;});
  window.addEventListener('pageshow',()=>{root.classList.toggle('page-hidden',document.hidden);syncAnimation();});
  fields.forEach(resize);
  updatePreference();
})();
