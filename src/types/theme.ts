export type InverterThemeConfig = {
  theme?: 'light' | 'dark' | 'system'
  baseTheme?: BaseTheme
  lightTheme?: ThemeColors
  darkTheme?: ThemeColors
}

export type CSSVariableValue = `${number}${string}` | string

export type BaseTheme = {
  primary?: CSSVariableValue
  'primary-foreground'?: CSSVariableValue
  accent?: CSSVariableValue
  'accent-foreground'?: CSSVariableValue
  destructive?: CSSVariableValue
  'destructive-foreground'?: CSSVariableValue
  radius?: CSSVariableValue

  'chart-1'?: CSSVariableValue
  'chart-2'?: CSSVariableValue
  'chart-3'?: CSSVariableValue
  'chart-4'?: CSSVariableValue
  'chart-5'?: CSSVariableValue
}

export type ThemeColors = {
  background?: CSSVariableValue
  foreground?: CSSVariableValue
  card?: CSSVariableValue
  'card-foreground'?: CSSVariableValue
  popover?: CSSVariableValue
  'popover-foreground'?: CSSVariableValue
  secondary?: CSSVariableValue
  'secondary-foreground'?: CSSVariableValue
  muted?: CSSVariableValue
  'muted-foreground'?: CSSVariableValue
  border?: CSSVariableValue
  input?: CSSVariableValue
  ring?: CSSVariableValue
}
