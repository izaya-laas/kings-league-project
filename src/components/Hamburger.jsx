import { useEffect, useState } from 'preact/hooks'

function disableScroll() {
  const x = window.scrollX
  const y = window.scrollY
  window.onscroll = function () {
    window.scrollTo(x, y)
  }
}
function enableScroll() {
  window.onscroll = null
}

export const Hamburger = ({ children }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) enableScroll()
    else disableScroll()
  }, [isActive])

  return (
    <>
      <div onClick={() => setIsActive(!isActive)}>
        <img
          class={`w-12 sm:w-14 aspect-square block relative z-30 ${isActive ? 'hidden' : ''}`}
          src='/public/menu.svg'
        />
        <img
          class={`w-12 sm:w-14 aspect-square block relative z-30 ${isActive ? '' : 'hidden'}`}
          src='/public/cross.svg'
        />
      </div>
      <div
        class={`fixed top-36 transition-transfor duration-700 left-0 h-screen w-screen bg-black z-20 opacity-95 ${
          isActive ? 'translate-y-0 ' : '-translate-y-[70rem]'
        }`}
      >
        {children}
      </div>
    </>
  )
}
