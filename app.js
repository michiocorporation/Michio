'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 981px)').addEventListener('change', closeMenu);

const projects = {
  bardot: { title: 'バルドー姉さん', category: 'WEB DESIGN', description: 'ドラマの世界観を伝えるプロモーションサイト。', images: ['bardot.webp'], alt: ['バルドー姉さん Webサイト全体のデザイン'], url: 'https://bardotnesan.jp/' },
  msbar: { title: 'M’s Bar', category: 'WEB DESIGN', description: 'お店の紹介から店舗情報までをまとめたWebサイト。', images: ['msbar.webp'], alt: ['M’s Bar Webサイト全体のデザイン'], url: 'https://msbar-karaoke.com/' },
  gig: { title: 'The Gig Gravity', category: 'LOGO DESIGN', description: 'バンドの世界観を表現したロゴデザイン。黒背景・白背景の2つの展開をご覧いただけます。', images: ['gig-gravity.webp', 'gig-gravity-white.webp'], alt: ['The Gig Gravity ロゴ 黒背景', 'The Gig Gravity ロゴ 白背景'] },
  alive: { title: 'ALIVE PHOTO', category: 'LOGO DESIGN', description: 'カメラの絞りをモチーフにした、フォトグラファーのロゴデザイン。', images: ['alive-photo.webp'], alt: ['ALIVE PHOTO ロゴデザイン'] },
  amafuri: { title: '天降神社', category: 'SIGN DESIGN', description: '情報の読みやすさと、神社らしいモチーフを組み合わせた案内看板のデザイン。', images: ['amafuri.webp'], alt: ['天降神社 案内看板デザイン'] },
  tanuki: { title: '毒舌たぬき', category: 'CHARACTER DESIGN', description: '表情やしぐさで気持ちを伝える、たぬきのLINEスタンプ。', images: ['tanuki.webp'], alt: ['毒舌たぬき LINEスタンプ一覧'] }
};
const dialog = document.querySelector('#project-dialog');
let projectTrigger;
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    projectTrigger = button;
    document.querySelector('#project-title').textContent = project.title;
    document.querySelector('#project-category').textContent = project.category;
    document.querySelector('#project-description').textContent = project.description;
    const link = document.querySelector('#project-link');
    link.hidden = !project.url;
    if (project.url) link.href = project.url;
    else link.removeAttribute('href');
    const images = project.images.map((source, index) => {
      const image = document.createElement('img');
      image.src = `assets/${source}`;
      image.alt = project.alt[index];
      return image;
    });
    document.querySelector('#project-images').replaceChildren(...images);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    document.querySelector('.dialog-close').focus();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  projectTrigger?.focus();
});
