import { useState } from 'preact/hooks'

function disableScroll() {
  const x = 0
  const y = 0
  window.onscroll = function () {
    window.scrollTo(x, y)
  }
}

function enableScroll() {
  window.onscroll = null
}

function scrollController(isActive) {
  if (!isActive) enableScroll()
  else disableScroll()
}

export default function Hamburger({ children }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <div
        onClick={() => {
          setIsActive(!isActive)
          scrollController(!isActive)
        }}
      >
        <img
          class={`w-12 sm:w-14 aspect-square block relative z-30 ${isActive ? 'hidden' : ''}`}
          src='/public/icons/menu.svg'
        />
        <img
          class={`w-12 sm:w-14 aspect-square block relative z-30 ${isActive ? '' : 'hidden'}`}
          src='/public/icons/cross.svg'
        />
      </div>
      <div
        class={`fixed top-28 sm:top-[7.5rem]  pt-12 transition-transfor duration-700 left-0 h-screen w-screen bg-black z-20 opacity-95 ${
          isActive ? 'translate-x-0 ' : '-translate-x-[70rem]'
        }`}
      >
        {children}
      </div>
    </>
  )
}
