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
  bardot: {
    title: 'バルドー姉さん', category: 'WEB DESIGN',
    description: 'ドラマを初めて知る方や出演者のファンに向けて、作品の世界観と見どころを伝える公式サイト。作品紹介からストーリー、キャスト情報までをまとめ、作品への関心を深めてもらうことを目指しました。',
    services: ['Webデザイン', 'コーディング'],
    background: 'ドラマの公式サイト制作をご依頼いただきました。作品の雰囲気を印象的に伝えながら、ストーリーや出演者、制作スタッフなどの情報を分かりやすく届けることを目指しました。',
    scope: 'Webサイトのデザインとコーディングを担当しました。',
    points: [
      { title: '作品の世界観を印象づけるデザイン', text: 'キービジュアルを大きく配置し、黒を基調にゴールドを組み合わせた表現で、作品の華やかさとドラマ性を伝えています。' },
      { title: '作品への理解が深まる情報の順序', text: '作品紹介、ストーリー、キャスト、スタッフの順に情報を整理。ページを読み進めながら、作品の背景と見どころを把握できる構成にしました。' },
      { title: '最新情報へつながる案内', text: '公式Instagramへのリンクを設け、作品に興味を持った方が、最新のお知らせや撮影の様子を確認できるようにしています。' }
    ],
    images: ['bardot.webp'], alt: ['バルドー姉さん 作品紹介・ストーリー・キャスト情報を掲載したWebサイトの制作画面'], url: 'https://bardotnesan.jp/'
  },
  msbar: {
    title: 'M’s Bar', category: 'WEB DESIGN / CUSTOMER JOURNEY',
    description: '福岡県飯塚市でカラオケバーを探している方や、初めて来店する方に向けた店舗サイト。お店の雰囲気・料金・アクセスをまとめ、Instagramでの相談やGoogleマップでの来店案内につながる導線を整えました。',
    services: ['Webデザイン', 'コーディング', 'Instagram・Googleマップ導線改善'],
    background: '集客につながるWebサイトの制作と、Instagram・Googleマップへの導線改善をご相談いただきました。初めての方にもお店の魅力や利用方法が伝わり、問い合わせや来店につながる情報の流れを整えることを目指しました。',
    scope: 'Webサイトのデザイン・コーディングと、Instagram・Googleマップへの導線改善を担当しました。',
    points: [
      { title: '来店前に知りたい情報を整理', text: 'お店のコンセプト、店内紹介、料金システム、よくある質問、アクセスを掲載。初めての方が利用を検討するために必要な情報を、ひとつのサイトにまとめました。' },
      { title: '問い合わせ・来店につながる導線', text: 'Instagramへの相談とGoogleマップでの場所の確認に進めるリンクを配置。情報を見た後、次の行動へ移りやすい構成にしています。' },
      { title: 'お店らしさと利用しやすさを伝える表現', text: 'ボルドーとゴールドを基調に、お店の華やかな雰囲気を表現。店内の様子とサービス内容を組み合わせ、来店時のイメージが伝わるデザインにしました。' }
    ],
    images: ['msbar.webp'], alt: ['M’s Bar 店舗紹介・料金・SNSと地図への導線を掲載したWebサイトの制作画面'], url: 'https://msbar-karaoke.com/'
  },
  teriha: {
    title: 'TERIHA U15', category: 'WEB DESIGN',
    description: '女子中学生と保護者に向けたバスケットボールクラブの公式サイト。チームの理念、コーチ紹介、練習場所、入会案内をまとめ、体験・見学のお問い合わせにつながる情報を掲載しています。',
    images: ['teriha-desktop.jpg', 'teriha-mobile.jpg'],
    alt: ['TERIHA U15のPC版トップページ', 'TERIHA U15のスマートフォン版トップページ'],
    url: 'https://teriha-u15.com/'
  },
  gig: { title: 'The Gig Gravity', category: 'LOGO DESIGN', description: 'バンドの世界観を表現したロゴデザイン。黒背景・白背景の2つの展開をご覧いただけます。', images: ['gig-gravity.webp', 'gig-gravity-white.webp'], alt: ['The Gig Gravity ロゴ 黒背景', 'The Gig Gravity ロゴ 白背景'] },
  alive: { title: 'ALIVE PHOTO', category: 'LOGO DESIGN', description: 'カメラの絞りをモチーフにした、フォトグラファーのロゴデザイン。', images: ['alive-photo.webp'], alt: ['ALIVE PHOTO ロゴデザイン'] },
  amafuri: { title: '天降神社', category: 'SIGN DESIGN', description: '情報の読みやすさと、神社らしいモチーフを組み合わせた案内看板のデザイン。', images: ['amafuri.webp'], alt: ['天降神社 案内看板デザイン'] },
  tanuki: { title: '毒舌たぬき', category: 'CHARACTER DESIGN', description: '表情やしぐさで気持ちを伝える、たぬきのLINEスタンプ。', images: ['tanuki.webp'], alt: ['毒舌たぬき LINEスタンプ一覧'] }
};
const dialog = document.querySelector('#project-dialog');
const projectDetails = document.querySelector('#project-details');
let projectTrigger;

function renderProjectDetails(project) {
  projectDetails.replaceChildren();
  projectDetails.hidden = !project.services;
  document.querySelector('#project-images-heading').hidden = !project.services;
  if (!project.services) return;

  function addSection(title, className = '') {
    const section = document.createElement('section');
    section.className = className;
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.append(heading);
    projectDetails.append(section);
    return section;
  }

  const servicesSection = addSection('制作内容・担当範囲');
  const tags = document.createElement('ul');
  tags.className = 'project-service-tags';
  project.services.forEach(service => {
    const tag = document.createElement('li');
    tag.textContent = service;
    tags.append(tag);
  });
  const scope = document.createElement('p');
  scope.textContent = project.scope;
  servicesSection.append(tags, scope);

  const backgroundSection = addSection('ご依頼の背景・制作の目的');
  const background = document.createElement('p');
  background.textContent = project.background;
  backgroundSection.append(background);

  const pointsSection = addSection('工夫した点');
  const points = document.createElement('ul');
  points.className = 'project-point-list';
  project.points.forEach(point => {
    const item = document.createElement('li');
    const title = document.createElement('h4');
    title.textContent = point.title;
    const description = document.createElement('p');
    description.textContent = point.text;
    item.append(title, description);
    points.append(item);
  });
  pointsSection.append(points);
}
document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project) return;
    projectTrigger = button;
    document.querySelector('#project-title').textContent = project.title;
    document.querySelector('#project-category').textContent = project.category;
    document.querySelector('#project-description').textContent = project.description;
    renderProjectDetails(project);
    const mockup = document.querySelector('#project-mockup');
    const devicePreview = button.querySelector('.device-mockup');
    mockup.replaceChildren();
    mockup.hidden = !devicePreview;
    mockup.className = `project-mockup work-${button.dataset.project}`;
    if (devicePreview) {
      const preview = devicePreview.cloneNode(true);
      preview.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
      mockup.append(preview);
    }
    document.querySelector('#project-images-heading').hidden = !project.url;
    const link = document.querySelector('#project-link');
    link.hidden = !project.url;
    if (project.url) link.href = project.url;
    else link.removeAttribute('href');
    const images = project.images.map((source, index) => {
      const image = document.createElement('img');
      image.src = `assets/${source}`;
      image.alt = project.alt[index];
      if (source.endsWith('-mobile.jpg')) image.className = 'project-mobile-capture';
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
