import { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, Link, Textarea, TextField } from '@dev.leejinw/ui';

type Language = 'ko' | 'en';

const COPY = {
  ko: {
    subtitle: '개인 프로젝트를 위한 프론트엔드 디자인 시스템',
    intro: '적은 규칙으로 일관된 화면을 만듭니다. 기본 요소의 상태와 사용 기준을 한곳에서 확인하세요.',
    foundations: '기초 규칙',
    components: '컴포넌트',
    colors: '색상',
    typography: '타이포그래피',
    spacing: '간격과 형태',
    spacingDescription: '4px을 기본 단위로 사용합니다. 컨트롤은 기본 40px, 터치 환경에서는 최소 44px을 목표로 합니다.',
    button: '버튼',
    buttonDescription: '동작을 실행합니다. 한 화면에서 가장 중요한 동작에만 primary를 사용합니다.',
    primaryAction: '변경 사항 저장',
    secondaryAction: '취소',
    ghostAction: '자세히 보기',
    link: '링크',
    linkDescription: '다른 위치로 이동합니다. 동작 실행에 사용하지 않습니다.',
    internalLink: '사용 가이드',
    externalLink: '외부 문서',
    textField: '텍스트 필드',
    textFieldDescription: '짧은 정보를 입력받습니다. 항상 보이는 이름을 제공합니다.',
    name: '프로젝트 이름',
    nameHint: '사용자가 이해하기 쉬운 이름을 입력하세요.',
    namePlaceholder: '예: 개인 디자인 시스템',
    errorLabel: '이메일',
    errorText: '올바른 이메일 주소를 입력하세요.',
    textarea: '여러 줄 입력',
    textareaDescription: '긴 설명을 입력받습니다. 입력 공간의 높이는 내용에 맞게 늘릴 수 있습니다.',
    description: '프로젝트 설명',
    descriptionPlaceholder: '프로젝트의 목표와 주요 결정을 적어 주세요.',
    checkbox: '체크박스',
    checkboxDescription: '독립적인 선택 상태를 나타냅니다. 즉시 설정을 켜고 끄는 용도에는 사용하지 않습니다.',
    checkboxLabel: '업데이트 소식 받기',
    checkboxHint: '언제든지 변경할 수 있습니다.',
    badge: '배지',
    badgeDescription: '짧은 분류나 상태를 표시합니다. 클릭 동작을 넣지 않습니다.',
    badgeNeutral: '초안',
    badgeAccent: '진행 중',
    badgeError: '오류',
    accessibility: '접근성 기준',
    accessibilityDescription: '키보드 포커스, 상태 설명, 한·영 긴 문구, 320px 화면과 200% 확대를 확인합니다.',
  },
  en: {
    subtitle: 'A frontend design system for personal projects',
    intro: 'A small set of rules for consistent interfaces. Explore the states and usage guidance for each foundation and component.',
    foundations: 'Foundations',
    components: 'Components',
    colors: 'Color',
    typography: 'Typography',
    spacing: 'Spacing & shape',
    spacingDescription: 'Spacing starts from 4px. Controls are 40px by default, with at least 44px for touch use.',
    button: 'Button',
    buttonDescription: 'Triggers an action. Reserve primary emphasis for the most important action on a screen.',
    primaryAction: 'Save changes',
    secondaryAction: 'Cancel',
    ghostAction: 'Learn more',
    link: 'Link',
    linkDescription: 'Navigates to another location. Do not use it to trigger an action.',
    internalLink: 'Usage guide',
    externalLink: 'External documentation',
    textField: 'Text field',
    textFieldDescription: 'Collects short input. Always provide a visible label.',
    name: 'Project name',
    nameHint: 'Choose a name people can understand.',
    namePlaceholder: 'e.g. Personal design system',
    errorLabel: 'Email',
    errorText: 'Enter a valid email address.',
    textarea: 'Textarea',
    textareaDescription: 'Collects longer input. People can resize the field as needed.',
    description: 'Project description',
    descriptionPlaceholder: 'Describe the goal and key decisions.',
    checkbox: 'Checkbox',
    checkboxDescription: 'Represents an independent selection. Avoid using it for immediate on/off settings.',
    checkboxLabel: 'Receive updates',
    checkboxHint: 'You can change this later.',
    badge: 'Badge',
    badgeDescription: 'Displays a short category or status. It is not an action.',
    badgeNeutral: 'Draft',
    badgeAccent: 'In progress',
    badgeError: 'Error',
    accessibility: 'Accessibility baseline',
    accessibilityDescription: 'Review keyboard focus, status descriptions, long Korean and English text, 320px layouts, and 200% zoom.',
  },
} as const;

const SWATCHES = [
  { name: 'Accent', hex: '#0F766E', className: 'swatch-accent' },
  { name: 'Canvas', hex: '#F8FAF9', className: 'swatch-canvas' },
  { name: 'Surface', hex: '#FFFFFF', className: 'swatch-surface' },
  { name: 'Text', hex: '#17231F', className: 'swatch-text' },
  { name: 'Border', hex: '#71847A', className: 'swatch-border' },
] as const;

/** Displays the bilingual foundation and component catalogue. */
const App = () => {
  const [language, setLanguage] = useState<Language>('ko');
  const [isChecked, setIsChecked] = useState(false);
  const copy = COPY[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Quiet Precision home">QP<span>.</span></a>
        <nav aria-label={language === 'ko' ? '주요 메뉴' : 'Main navigation'}>
          <a href="#foundations">{copy.foundations}</a>
          <a href="#components">{copy.components}</a>
        </nav>
        <div className="language-switch" aria-label="Language">
          <button type="button" aria-pressed={language === 'ko'} onClick={() => setLanguage('ko')}>KR</button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">PERSONAL DESIGN SYSTEM · V1</div>
          <h1 id="hero-title">Quiet<br /><em>Precision.</em></h1>
          <p className="hero-subtitle">{copy.subtitle}</p>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-rule" aria-hidden="true" />
          <div className="hero-meta"><span>REACT 19 / TYPESCRIPT</span><span>LIGHT FOUNDATION</span><span>KO · EN</span></div>
        </section>

        <section className="section" id="foundations" aria-labelledby="foundations-title">
          <div className="section-heading"><span className="section-index">01</span><h2 id="foundations-title">{copy.foundations}</h2></div>
          <div className="foundation-grid">
            <article className="foundation-panel color-panel">
              <div className="panel-head"><h3>{copy.colors}</h3><span>LIGHT / V1</span></div>
              <div className="swatches">
                {SWATCHES.map(({ name, hex, className }) => (
                  <div className="swatch-row" key={name}>
                    <span className={`swatch ${className}`} aria-hidden="true" />
                    <span className="swatch-name">{name}</span>
                    <code>{hex}</code>
                  </div>
                ))}
              </div>
            </article>
            <article className="foundation-panel typography-panel">
              <div className="panel-head"><h3>{copy.typography}</h3><span>PRETENDARD VARIABLE</span></div>
              <div className="type-specimen"><span>Display · 40 / 48</span><strong>정교함의 기준<br />The art of clarity</strong></div>
              <div className="type-specimen body-specimen"><span>Body · 16 / 24</span><p>복잡한 것을 명료하게. Make complexity feel effortless.</p></div>
            </article>
            <article className="foundation-panel spacing-panel">
              <div className="panel-head"><h3>{copy.spacing}</h3><span>4PX BASE</span></div>
              <div className="space-bars" aria-label="4, 8, 12, 16, 24, 32px spacing scale">
                {[4, 8, 12, 16, 24, 32].map((value) => <div key={value}><span>{value}</span><i style={{ width: `${value * 4}px` }} /></div>)}
              </div>
              <p>{copy.spacingDescription}</p>
            </article>
          </div>
        </section>

        <section className="section" id="components" aria-labelledby="components-title">
          <div className="section-heading"><span className="section-index">02</span><h2 id="components-title">{copy.components}</h2></div>
          <div className="component-grid">
            <article className="component-panel"><div className="panel-head"><h3>{copy.button}</h3><span>ACTION</span></div><p>{copy.buttonDescription}</p><div className="example-row"><Button>{copy.primaryAction}</Button><Button variant="secondary">{copy.secondaryAction}</Button><Button variant="ghost">{copy.ghostAction}</Button></div><div className="example-row"><Button isLoading>{copy.primaryAction}</Button><Button disabled>{copy.primaryAction}</Button></div></article>
            <article className="component-panel"><div className="panel-head"><h3>{copy.link}</h3><span>NAVIGATION</span></div><p>{copy.linkDescription}</p><div className="example-row"><Link href="#foundations">{copy.internalLink}</Link><Link href="https://www.w3.org/WAI/ARIA/apg/" variant="accent" isExternal>{copy.externalLink}</Link></div></article>
            <article className="component-panel"><div className="panel-head"><h3>{copy.textField}</h3><span>INPUT</span></div><p>{copy.textFieldDescription}</p><div className="form-stack"><TextField label={copy.name} hint={copy.nameHint} placeholder={copy.namePlaceholder} /><TextField label={copy.errorLabel} error={copy.errorText} defaultValue="invalid-address" /></div></article>
            <article className="component-panel"><div className="panel-head"><h3>{copy.textarea}</h3><span>INPUT</span></div><p>{copy.textareaDescription}</p><Textarea label={copy.description} placeholder={copy.descriptionPlaceholder} /></article>
            <article className="component-panel"><div className="panel-head"><h3>{copy.checkbox}</h3><span>SELECTION</span></div><p>{copy.checkboxDescription}</p><Checkbox label={copy.checkboxLabel} hint={copy.checkboxHint} checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} /></article>
            <article className="component-panel"><div className="panel-head"><h3>{copy.badge}</h3><span>STATUS</span></div><p>{copy.badgeDescription}</p><div className="example-row"><Badge>{copy.badgeNeutral}</Badge><Badge tone="accent">{copy.badgeAccent}</Badge><Badge tone="error">{copy.badgeError}</Badge></div></article>
          </div>
        </section>

        <aside className="accessibility-note"><span>03 / QUALITY</span><div><h2>{copy.accessibility}</h2><p>{copy.accessibilityDescription}</p></div></aside>
      </main>
      <footer className="site-footer"><strong>Quiet Precision<span>.</span></strong><span>PERSONAL DESIGN SYSTEM · 2026</span></footer>
    </div>
  );
};

export default App;
