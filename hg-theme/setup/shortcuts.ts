import { defineShortcutsSetup } from '@slidev/types'

const UI_SHORTCUTS = new Set([
  'toggle_overview',
  'hide_overview',
  'goto',
  'goto_from_overview',
  'next_overview',
  'prev_overview',
  'up_overview',
  'down_overview',
  'toggle_dark',
])

export default defineShortcutsSetup((_nav, shortcuts) => {
  return shortcuts.filter((shortcut) => !UI_SHORTCUTS.has(shortcut.name ?? ''))
})
