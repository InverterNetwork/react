'use client'

import * as React from 'react'
import { useChainSpecs, useIsHydrated } from '@/hooks'
import { cn } from '@/utils'
import { Button } from './ui/button'
import type { ButtonProps } from './ui/button'
import { CircleAlert, Pointer, Wallet } from 'lucide-react'
import { compressAddress } from '@inverter-network/sdk'

export interface WalletWidgetProps extends ButtonProps {
  text?: string
  applyClassToLoading?: boolean
  setShowWalletWidget: () => void
}

export function WalletWidget(props: WalletWidgetProps) {
  const {
    size,
    className,
    text,
    applyClassToLoading = true,
    setShowWalletWidget,
    ...rest
  } = props
  const isHydrated = useIsHydrated()
  const { isConnected, address, iconSrc, isUnsupportedChain } = useChainSpecs()

  if (!isHydrated || (isConnected && !address))
    return (
      <Button
        loader={props.loader}
        loading
        className={cn(applyClassToLoading && className)}
      />
    )

  const getStartIcon = () => {
    if ('startIcon' in props) return props.startIcon
    if (!isConnected) return <Wallet size={20} />

    if (!!iconSrc)
      return (
        <img
          src={iconSrc}
          alt="icon"
          width={20}
          height={20}
          className="in--max-h-full in--rounded-full"
        />
      )

    if (text === undefined && isUnsupportedChain)
      return <CircleAlert size={20} fill="red" />

    return null
  }

  const getEndIcon = () => {
    if ('endIcon' in props) return props.endIcon
    if (!!isConnected && !!text) return <Pointer size={20} />

    return null
  }

  const getChildren = () => {
    if (!isConnected) return 'Connect Wallet'
    if (!!text) return text

    return compressAddress(address)
  }

  const color = (() => {
    if ('color' in props) return props.color
    if (!isConnected || !!text || isUnsupportedChain) return 'primary'
    return ''
  })()

  const variant = (() => {
    if ('variant' in props) return props.variant
    if (isConnected) return 'outline'
    return 'default'
  })()

  return (
    <Button
      color={color}
      variant={variant}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      className={cn(className, 'in--leading-[unset]')}
      type={props.type ?? 'button'}
      size={size ?? 'sm'}
      onClick={setShowWalletWidget}
      {...rest}
    >
      {getChildren()}
    </Button>
  )
}
