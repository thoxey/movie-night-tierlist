// Tier rows shown on the board, in order. `id` is used as the drag container id.
// `pool` (the unranked tray) and `missed` are special containers handled separately.
export interface Tier {
  id: string
  label: string
  color: string
}

export const TIERS: Tier[] = [
  { id: 'S', label: 'S', color: '#ff7f7f' },
  { id: 'A', label: 'A', color: '#ffbf7f' },
  { id: 'B', label: 'B', color: '#ffdf7f' },
  { id: 'C', label: 'C', color: '#ffff7f' },
  { id: 'D', label: 'D', color: '#bfff7f' },
  { id: 'F', label: 'F', color: '#7fbfff' },
]

export const POOL = 'pool'

// All container ids in board order (used for export + initial state).
export const TIER_IDS = TIERS.map((t) => t.id)
