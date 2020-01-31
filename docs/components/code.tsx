import Highlight, { Language, defaultProps } from 'prism-react-renderer'
import React from 'react'

const LANGUAGE_REGEXP = /language-(?=[a-z]+)/

export const pre = (props: {}) => <div {...props} />

export const code: React.FunctionComponent<{
  children: string
  className?: string
}> = ({ children, className }) => (
  <Highlight
    {...defaultProps}
    code={children}
    language={className!.replace(LANGUAGE_REGEXP, '') as Language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={{ ...style, padding: '20px' }}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
