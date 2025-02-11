import { type ReactNode } from 'react'

import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/ui/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Profile',
    href: ''
  },
  {
    title: 'Personal blockers',
    href: '/account/blockers'
  }
]

const AccountLayout = ({ children }: { children: ReactNode }) => (
  <div className='space-y-6 p-10 pb-16'>
    <div className='space-y-0.5'>
      <h2 className='text-2xl font-bold tracking-tight'>Account</h2>
      <p className='text-muted-foreground'>Manage your account settings and set yours date blockers.</p>
    </div>
    <Separator className='my-6' />
    <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
      <aside className='-mx-4 lg:w-1/5'>
        <SidebarNav items={sidebarNavItems} />
      </aside>
      <div className='flex-1 lg:max-w-2xl'>{children}</div>
    </div>
  </div>
)
export default AccountLayout
