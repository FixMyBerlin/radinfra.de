import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

type Props = {
  children: React.ReactNode
}

export const NavigationMobile = ({ children }: Props) => {
  return (
    <div className="lg:hidden">
      <Popover as="div" className="inline-block text-left">
        <PopoverButton className="hover:text-blackfocus:outline-hidden inline-flex w-full items-center justify-center gap-2 rounded-md border border-teal-100 bg-teal-900 py-2 pr-2 pl-3 font-medium text-teal-100 hover:bg-teal-100/70 focus-visible:ring-2 focus-visible:ring-white/75">
          Menu
          <Bars3Icon className="size-4" />
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <PopoverPanel className="absolute right-2 mt-2 w-64 origin-top-right divide-y divide-teal-100 rounded-md bg-teal-950 p-3 ring-1 shadow-lg ring-teal-900 focus:outline-hidden">
            {children}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}
