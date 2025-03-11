export type InverterThemeConfig = {
  theme?: 'light' | 'dark' | 'system'
  baseTheme?: BaseTheme
  lightTheme?: ThemeColors
  darkTheme?: ThemeColors
}

export type CSSVariableValue = `${number}${string}` | string

export type BaseTheme = {
  radius?: CSSVariableValue
  ring?: CSSVariableValue
}

export type ThemeColors = {
  primary?: CSSVariableValue
  'primary-foreground'?: CSSVariableValue

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

  muted?: CSSVariableValue
  'muted-foreground'?: CSSVariableValue

  destructive?: CSSVariableValue
  'destructive-foreground'?: CSSVariableValue

  warning?: CSSVariableValue
  'warning-foreground'?: CSSVariableValue

  success?: CSSVariableValue
  'success-foreground'?: CSSVariableValue

  error?: CSSVariableValue
  'error-foreground'?: CSSVariableValue

  info?: CSSVariableValue
  'info-foreground'?: CSSVariableValue

  'chart-1'?: CSSVariableValue
  'chart-2'?: CSSVariableValue
  'chart-3'?: CSSVariableValue
  'chart-4'?: CSSVariableValue
  'chart-5'?: CSSVariableValue

  border?: CSSVariableValue
  input?: CSSVariableValue
}
