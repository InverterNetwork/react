'use client'

import React from 'react'
import { useChainSpecs, useIsHydrated } from '@/hooks'
import utils, { cn } from '@/utils'
import { Spinner } from './ui/spinner'
import { Button, type ButtonProps } from './ui/button'
import { CircleAlert, Pointer, Wallet } from 'lucide-react'

export function WalletWidget(
  props: Omit<ButtonProps, 'color' | 'onClick'> & {
    text?: string
    applyClassToLoading?: boolean
    showWalletWidget: () => void
    closeWalletWidget: () => void
  }
) {
  const { size, className, text, applyClassToLoading = true, ...rest } = props
  const isHydrated = useIsHydrated()
  const { isConnected, address, iconSrc, isUnsupportedChain } = useChainSpecs()

  if (!isHydrated || (isConnected && !address))
    return (
      <Spinner className={cn('m-auto', applyClassToLoading && className)} />
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
          className="max-h-full rounded-full"
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

    return utils.format.compressAddress(address)
  }

  return (
    <Button
      {...rest}
      {...((!isConnected || !!text || isUnsupportedChain) && {
        color: 'primary',
      })}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      className={cn(className, 'leading-[unset]')}
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
