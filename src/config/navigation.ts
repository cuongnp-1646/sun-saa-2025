/**
 * Application route constants — derived from .momorph/contexts/SCREENFLOW.md.
 * NEVER hard-code URLs in component files. Always import from here.
 */
export const ROUTES = {
  home: '/',
  awards: '/awards',
  kudos: '/kudos',
  theLeRules: '/the-le',
  profile: '/profile',
  communityStandards: '/community-standards',
  notifications: '/notifications',
  countdown: '/countdown',
  login: '/login',
} as const

export const AWARD_ROUTES = {
  topTalent: `${ROUTES.awards}#top-talent`,
  topProject: `${ROUTES.awards}#top-project`,
  topProjectLeader: `${ROUTES.awards}#top-project-leader`,
  bestManager: `${ROUTES.awards}#best-manager`,
  signatureCreator: `${ROUTES.awards}#signature-2025-creator`,
  mvp: `${ROUTES.awards}#mvp`,
} as const

export const NAV_LINKS = [
  { label: 'About SAA 2025', href: ROUTES.home },
  { label: 'Awards Information', href: ROUTES.awards },
  { label: 'Sun* Kudos', href: ROUTES.kudos },
] as const
