import tokens from '../../tokens/tokens.json';

export const OVERLAY_CONFIG = {
  sideOffset: tokens.space['2'].$value.value,
  collisionPadding: tokens.space['4'].$value.value,
  tooltipDelay: 500,
  toastDuration: 5000,
} as const;
