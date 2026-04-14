export interface Award {
  id: string
  slug: string
  name: string
  description: string
  /** Path to award background image (shared across all awards) */
  bgSrc: string
  /** Path to award name overlay image */
  nameSrc: string
  /** Anchor link target: /awards#{slug} */
  href: string
  /** Number of prizes (e.g. "10", "01") */
  count?: string
  /** Prize recipient unit (e.g. "Cá nhân", "Tập thể") */
  countUnit?: string
  /** Prize monetary value (e.g. "7.000.000 VNĐ") */
  value?: string
  /** Note appended after value (e.g. "cho mỗi giải thưởng") */
  valueSuffix?: string
  /** Second prize value — for Signature Creator "Hoặc" split (e.g. "8.000.000 VNĐ") */
  value2?: string
  /** Note appended after second value (e.g. "cho giải tập thể") */
  valueSuffix2?: string
}

export interface NavLink {
  label: string
  href: string
  isActive?: boolean
}

export interface NotificationCount {
  unread: number
}
