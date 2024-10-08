'use client'

import * as React from 'react'
import { useChainSpecs, useIsHydrated } from '@/hooks'
import { cn, compressAddress } from '@/utils'
import { Spinner } from './ui/spinner'
import { Button, type ButtonProps } from './ui/button'
import { CircleAlert, Pointer, Wallet } from 'lucide-react'

export interface WalletWidgetProps extends ButtonProps {
  text?: string
  applyClassToLoading?: boolean
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  showWalletWidget: () => void
  closeWalletWidget: () => void
}

export function WalletWidget(props: WalletWidgetProps) {
  const { size, className, text, applyClassToLoading = true, ...rest } = props
  const isHydrated = useIsHydrated()
  const { isConnected, address, iconSrc, isUnsupportedChain } = useChainSpecs()

  if (!isHydrated || (isConnected && !address))
    return (
      <Spinner className={cn('in--m-auto', applyClassToLoading && className)} />
    )

  const getStartIcon = () => {
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
    if (!!isConnected && !!text) return <Pointer size={20} />

    return null
  }

  const getChildren = () => {
    if (!isConnected) return 'Connect Wallet'

    if (!!text) return text

    return compressAddress(address)
  }

  return (
    <Button
      {...rest}
      {...((!isConnected || !!text || isUnsupportedChain) && {
        color: 'primary',
      })}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      className={cn(className, 'in--leading-[unset]')}
      type="button"
      size={!size ? 'sm' : size}
      onClick={() => {
        if (!isConnected) props.showWalletWidget()
        else props.closeWalletWidget()
        return
      }}
    >
      {getChildren()}
    </Button>
  )
}
