import { RefObject, useCallback } from 'react'

const AnimationClassMap = {
  ['fade-in']: 'animate-fade-in',
  ['fade-out']: 'animate-fade-out',
  ['slide-up']: 'animate-slide-up',
  ['slide-down']: 'animate-slide-down',
  ['centered-slide-up']: 'animate-centered-slide-up',
  ['centered-slide-down']: 'animate-centered-slide-down',
}
export type RevealAnimation = 'fade-in' | 'slide-up' | 'slide-down' | 'centered-slide-up' | 'centered-slide-down'

export default function useReveal(
  ref: RefObject<HTMLElement>,
  animation: RevealAnimation
) {
  const show = useCallback(() => {
    const isHidden = ref.current?.classList.contains('hidden')
    if (isHidden) {
      ref.current?.addEventListener(
        'animationend',
        () => {
          ref.current?.classList.remove(AnimationClassMap[animation])
        },
        { once: true }
      )
      ref.current?.classList.add(AnimationClassMap[animation])
      ref.current?.classList.remove('hidden')
    }
  }, [ref, animation])

  const hide = useCallback(() => {
    const isHidden = ref.current?.classList.contains('hidden')
    if (!isHidden) {
      ref.current?.addEventListener(
        'animationend',
        () => {
          console.log('ended')
          ref.current?.classList.add('hidden')
          ref.current?.classList.remove('animate-fade-out')
        },
        { once: true }
      )
      ref.current?.classList.add('animate-fade-out')
    }
  }, [ref])

  const toggle = useCallback(()=>{
    const isHidden = ref.current?.classList.contains('hidden')
    if(isHidden){
      show()
    }else{
      hide()
    }
  }, [show, hide])

  return { show, hide, toggle }
}
