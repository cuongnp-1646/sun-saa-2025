import { describe, it, expect } from 'vitest'
import { AWARDS } from '@/config/awards'

describe('AWARDS static data', () => {
  it('has exactly 6 entries', () => {
    expect(AWARDS).toHaveLength(6)
  })

  it('each entry has non-empty count, countUnit, value, valueSuffix', () => {
    for (const award of AWARDS) {
      expect(award.count, `${award.name}: count missing`).toBeTruthy()
      expect(award.countUnit, `${award.name}: countUnit missing`).toBeTruthy()
      expect(award.value, `${award.name}: value missing`).toBeTruthy()
      expect(award.valueSuffix, `${award.name}: valueSuffix missing`).toBeTruthy()
    }
  })

  it('Top Talent has correct values per spec', () => {
    const award = AWARDS.find((a) => a.slug === 'top-talent')
    expect(award?.count).toBe('10')
    expect(award?.countUnit).toBe('Cá nhân')
    expect(award?.value).toBe('7.000.000 VNĐ')
    expect(award?.valueSuffix).toBe('cho mỗi giải thưởng')
  })

  it('Top Project has correct values per spec', () => {
    const award = AWARDS.find((a) => a.slug === 'top-project')
    expect(award?.count).toBe('02')
    expect(award?.countUnit).toBe('Tập thể')
    expect(award?.value).toBe('15.000.000 VNĐ')
    expect(award?.valueSuffix).toBe('cho mỗi giải thưởng')
  })

  it('Top Project Leader has correct values per spec', () => {
    const award = AWARDS.find((a) => a.slug === 'top-project-leader')
    expect(award?.count).toBe('03')
    expect(award?.countUnit).toBe('Cá nhân')
    expect(award?.value).toBe('7.000.000 VNĐ')
    expect(award?.valueSuffix).toBe('cho mỗi giải thưởng')
  })

  it('Best Manager has correct values per spec', () => {
    const award = AWARDS.find((a) => a.slug === 'best-manager')
    expect(award?.count).toBe('01')
    expect(award?.countUnit).toBe('Cá nhân')
    expect(award?.value).toBe('10.000.000 VNĐ')
    expect(award?.valueSuffix).toBe('cho mỗi giải thưởng')
  })

  it('Signature 2025 Creator has correct values per spec', () => {
    const award = AWARDS.find((a) => a.slug === 'signature-2025-creator')
    expect(award?.count).toBe('01')
    expect(award?.countUnit).toBe('Cá nhân hoặc tập thể')
    expect(award?.value).toBe('5.000.000 VNĐ')
    expect(award?.valueSuffix).toBe('cho giải cá nhân')
    expect(award?.value2).toBe('8.000.000 VNĐ')
    expect(award?.valueSuffix2).toBe('cho giải tập thể')
  })

  it('MVP has correct values per spec', () => {
    const award = AWARDS.find((a) => a.slug === 'mvp')
    expect(award?.count).toBe('01')
    expect(award?.countUnit).toBe('Cá nhân')
    expect(award?.value).toBe('15.000.000 VNĐ')
    expect(award?.valueSuffix).toBe('cho giải cá nhân')
  })

  it('each entry has required base fields (id, slug, name, description, bgSrc, nameSrc, href)', () => {
    for (const award of AWARDS) {
      expect(award.id).toBeTruthy()
      expect(award.slug).toBeTruthy()
      expect(award.name).toBeTruthy()
      expect(award.description).toBeTruthy()
      expect(award.bgSrc).toBeTruthy()
      expect(award.nameSrc).toBeTruthy()
      expect(award.href).toBeTruthy()
    }
  })
})
