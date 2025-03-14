export type InverterThemeConfig = {
  theme?: 'light' | 'dark' | 'system'
  baseTheme?: BaseTheme
  lightTheme?: ThemeColors
  darkTheme?: ThemeColors
}

export type CSSVariableValue = `${number}${string}` | string

export type BaseTheme = {
  radius?: CSSVariableValue
}

export type ThemeColors = {
  primary?: CSSVariableValue
  'primary-foreground'?: CSSVariableValue
  'primary-hover'?: CSSVariableValue
  'primary-active'?: CSSVariableValue

  accent?: CSSVariableValue
  'accent-foreground'?: CSSVariableValue

  background?: CSSVariableValue
  'background-2'?: CSSVariableValue
  foreground?: CSSVariableValue

  card?: CSSVariableValue
  'card-foreground'?: CSSVariableValue

  popover?: CSSVariableValue
  'popover-foreground'?: CSSVariableValue

  secondary?: CSSVariableValue
  'secondary-foreground'?: CSSVariableValue
  'secondary-hover'?: CSSVariableValue
  'secondary-active'?: CSSVariableValue

  muted?: CSSVariableValue
  'muted-foreground'?: CSSVariableValue

  destructive?: CSSVariableValue
  'destructive-foreground'?: CSSVariableValue
  'destructive-hover'?: CSSVariableValue
  'destructive-active'?: CSSVariableValue

  warning?: CSSVariableValue
  success?: CSSVariableValue
  error?: CSSVariableValue

  info?: CSSVariableValue
  'info-foreground'?: CSSVariableValue

  link?: CSSVariableValue
  'link-hover'?: CSSVariableValue
  'link-active'?: CSSVariableValue

  input?: CSSVariableValue
  'input-hover'?: CSSVariableValue

  'chart-1'?: CSSVariableValue
  'chart-2'?: CSSVariableValue
  'chart-3'?: CSSVariableValue
  'chart-4'?: CSSVariableValue
  'chart-5'?: CSSVariableValue

  border?: CSSVariableValue
  ring?: CSSVariableValue
}
