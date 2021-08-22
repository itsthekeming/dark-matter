import { PropsWithChildren } from 'react'
import { CompendiumNavbar } from './compendium-navbar'

export function CompendiumLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <CompendiumNavbar />
      <main>{children}</main>
    </>
  )
}
