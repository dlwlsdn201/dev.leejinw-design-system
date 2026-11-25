# Guided Motion Implementation Plan

> Native execution in this session; the user's B selection authorizes the direction.

**Goal:** Apply the approved B motion direction to interactive UI components.
**Architecture:** CSS Modules consume existing motion/spacing tokens and Radix data-state. Independent translate avoids existing transform positioning and swipe behavior.
**Tech Stack:** React 19, CSS Modules, Radix UI.
**Spec:** docs/superpowers/specs/2026-11-25-guided-motion-design.md

## Constraints
150/200ms duration; 2/4px displacement; public API and accessibility preserved.

## Review Focus
Dialog centered placement, closed-state unmount, Toast swipe, disabled hover, reduced motion.

## Steps
- [x] Add control transitions and state-driven overlay animation in ui.module.css / extended.module.css.
- [x] Verify typecheck, lint, test, build and storybook:build.
- [x] Inspect real browser interactions and reduced motion; document outcome.

Verification: all five required commands passed. Browser: Select open rotates SVG 180deg over 200ms and runs guided-enter; icon center delta 0px. Reduced-motion Dialog has no animation, centered at 375px without horizontal overflow.
