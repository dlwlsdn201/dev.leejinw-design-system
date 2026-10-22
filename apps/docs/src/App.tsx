import { useEffect, useState } from 'react';
import { Badge, Button, Checkbox, Link, Textarea, TextField } from '@dev.leejinw/ui';
import tokens from '@dev.leejinw/ui/tokens.json';

type Language = 'ko' | 'en';

const COPY = {
  ko: {
    subtitle: '개인 프로젝트를 위한 프론트엔드 디자인 시스템',
    intro: '적은 규칙으로 일관된 화면을 만듭니다. 기본 요소의 상태와 사용 기준을 한곳에서 확인하세요.',
    foundations: '기초 규칙',
    components: '컴포넌트',
    colors: '색상',
    typography: '타이포그래피',
    spacing: '간격',
    shape: '모서리와 테두리',
    actualSize: '두 요소 사이에 실제 간격을 적용했습니다. (1:1 CSS px)',
    sampleDesign: '디자인',
    sampleDevelopment: '개발',
    spacingUsage: { micro: '미세 조정', '1': '밀접한 아이콘과 텍스트', '2': '관련 태그나 보조 요소', '3': '작은 컨트롤 그룹', '4': '관련 폼 요소', '6': '카드 내부 콘텐츠 그룹', '8': '독립적인 콘텐츠 그룹', '12': '작은 섹션 사이', '16': '큰 섹션 사이' },
    corners: '모서리 반경',
    borders: '테두리 두께',
    focus: '포커스 링',
    focusOffset: '바깥 간격',
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
    spacing: 'Spacing',
    shape: 'Corners & borders',
    actualSize: 'Actual spacing between two elements. (1:1 CSS px)',
    sampleDesign: 'Design',
    sampleDevelopment: 'Code',
    spacingUsage: { micro: 'Fine adjustments', '1': 'Closely related icons and text', '2': 'Related tags or supporting elements', '3': 'Small control groups', '4': 'Related form elements', '6': 'Content groups within a card', '8': 'Independent content groups', '12': 'Between small sections', '16': 'Between major sections' },
    corners: 'Corner radius',
    borders: 'Border width',
    focus: 'Focus ring',
    focusOffset: 'Offset',
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
  { name: 'Accent', token: 'color.action.default', hex: tokens.color.primitive.green['600'].$value.hex, className: 'swatch-accent' },
  { name: 'Canvas', token: 'color.surface.canvas', hex: tokens.color.primitive.neutral.canvas.$value.hex, className: 'swatch-canvas' },
  { name: 'Surface', token: 'color.surface.default', hex: tokens.color.primitive.neutral.white.$value.hex, className: 'swatch-surface' },
  { name: 'Text', token: 'color.text.primary', hex: tokens.color.primitive.neutral.ink.$value.hex, className: 'swatch-text' },
  { name: 'Border', token: 'color.border.control', hex: tokens.color.primitive.neutral.control.$value.hex, className: 'swatch-border' },
] as const;

const SPACING_SPECIMENS = (Object.entries(tokens.space) as [keyof typeof tokens.space, (typeof tokens.space)[keyof typeof tokens.space]][]).sort(([, first], [, second]) => first.$value.value - second.$value.value);
const RADIUS_SPECIMENS = Object.entries(tokens.radius);
const STROKE_SPECIMENS = Object.entries(tokens.stroke);
const FOCUS_WIDTH = tokens.focusIndicator.width.$value;
const FOCUS_OFFSET = tokens.focusIndicator.offset.$value;

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
                {SWATCHES.map(({ name, token, hex, className }) => (
                  <div className="swatch-row" key={name}>
                    <span className={`swatch ${className}`} aria-hidden="true" />
                    <span className="swatch-name">{name}<small>{token}</small></span>
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
              <p className="specimen-caption">{copy.actualSize}</p>
              <div className="spacing-examples">
                {SPACING_SPECIMENS.map(([name, token]) => (
                  <figure className="spacing-example" key={name}>
                    <figcaption><code>space.{name}</code><strong>{token.$value.value}{token.$value.unit}</strong></figcaption>
                    <div className="spacing-preview">
                      <div className="spacing-pair" style={{ gap: `var(--ds-space-${name})` }}>
                        <span>{copy.sampleDesign}</span><span>{copy.sampleDevelopment}</span>
                      </div>
                    </div>
                    <p>{copy.spacingUsage[name]}</p>
                  </figure>
                ))}
              </div>
              <p>{copy.spacingDescription}</p>
            </article>
            <article className="foundation-panel shape-panel">
              <div className="panel-head"><h3>{copy.shape}</h3><span>SHAPE</span></div>
              <h4 className="specimen-label">{copy.corners}</h4>
              <div className="shape-specimens">
                {RADIUS_SPECIMENS.map(([name, token]) => (
                  <div className="shape-specimen" key={name}>
                    <span className="radius-sample" style={{ borderRadius: `var(--ds-radius-${name})` }} aria-hidden="true" />
                    <code>radius.{name}</code>
                    <span>{token.$value.value}{token.$value.unit}</span>
                  </div>
                ))}
              </div>
              <h4 className="specimen-label">{copy.borders}</h4>
              <div className="stroke-specimens">
                {STROKE_SPECIMENS.map(([name, token]) => (
                  <div className="shape-specimen" key={name}>
                    <span className="stroke-sample" style={{ borderWidth: `var(--ds-stroke-${name})` }} aria-hidden="true" />
                    <code>stroke.{name}</code>
                    <span>{token.$value.value}{token.$value.unit}</span>
                  </div>
                ))}
              </div>
              <div className="focus-specimen">
                <span className="focus-sample">{copy.focus}</span>
                <span>{FOCUS_WIDTH.value}{FOCUS_WIDTH.unit} · {copy.focusOffset} {FOCUS_OFFSET.value}{FOCUS_OFFSET.unit}</span>
              </div>
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
