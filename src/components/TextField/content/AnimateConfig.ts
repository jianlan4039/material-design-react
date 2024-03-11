export type AnimationArgs = Parameters<Element['animate']>
export type ElementAndAnimations = [HTMLElement, AnimationArgs, commit: boolean][]

export const executeAnimation = async (elementAndAnimations: ElementAndAnimations) => {
  const animations: [Animation, boolean][] = []
  for (const [element, animationArgs, commit] of elementAndAnimations) {
    const animate = element.animate(animationArgs[0], animationArgs[1])
    animations.push([animate, commit])
  }
  await Promise.all(animations.map((animation) => animation[0].finished))
  animations.forEach(a => {
    if (a[1]) {
      a[0].commitStyles()
      a[0].cancel()
    }
  })
}