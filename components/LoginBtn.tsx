import {signIn, signOut, useSession} from "next-auth/react"
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import {userState} from "../recoil/atoms/userState";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function LoginBtn() {
  const { data: session } = useSession();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (session) {
      setUser({
        name: session.user?.name ?? '',
      });
    }
  }, [session, setUser]);

  if (session) {
    // @ts-ignore
    return (
      <>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex border-2 border-primary w-full rounded-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50">
              <Image
                className="inline-block h-14 w-14 rounded-full"
                src={session?.user?.image ?? ''}
                alt={session?.user?.name ?? ''}
                referrerPolicy={'no-referrer'}
                width={60}
                height={60}
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }: {active: boolean}) => (
                    <Link
                      href="/api/auth/signout"
                      onClick={() => signOut()}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Sign out
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </>
    )
  }
  return (
    <>
      <button
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  )
}