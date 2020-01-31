// tslint:disable: ordered-imports

declare module '*.md' {
  import { ComponentType } from 'react'

  const Component: ComponentType

  export default Component
}

declare module '@mdx-js/react' {
  import React from 'react'
  export const MDXProvider: React.ComponentType<{
    components: Record<string, React.ComponentType<any>>
  }>
}
