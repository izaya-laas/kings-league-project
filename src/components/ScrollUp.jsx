import { useEffect, useState } from 'preact/hooks'

export default function ScrollUp() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) setIsActive(true)
      else setIsActive(false)
    })
  }, [])

  return (
    <a
      href='#top'
      class={`p-2 sm:p-4 fixed z-20 bottom-4 right-4 bg-[#fab60a] rounded-full  transition-transform duration-700 ${
        isActive ? 'translate-x-0' : 'translate-x-52'
      }`}
    >
      <img src='/public/up.svg' class='w-4 sm:w-6' />
    </a>
  )
}
