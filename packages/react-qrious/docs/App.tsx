import { get, merge, set } from 'lodash'
import React, { useState } from 'react'
import { QRious, QriousProps } from 'react-qrious'

export const LEVELS = Object.freeze(['L', 'M', 'Q', 'H'] as const)

// eslint-disable-next-line @typescript-eslint/no-type-alias
type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>

export const App = () => {
  const [props, setState] = useState<QriousProps>({
    background: '#ffffff',
    backgroundAlpha: 1,
    foreground: '#000000',
    foregroundAlpha: 1,
    level: 'L',
    mime: 'image/png',
    padding: 0,
    size: 100,
    value: 'http://www.1stg.me',
  })

  const setProps = (newProps: Partial<QriousProps>) =>
    setState((oldProps: QriousProps) => merge({}, oldProps, newProps))

  const fieldProps = (name: string, onChange?: (value: unknown) => void) => {
    const defaultOnChange = (e: ChangeEvent) => {
      const { type, value } = e.currentTarget
      setProps(
        set(
          {},
          name,
          type === 'number'
            ? value.trim() === ''
              ? ''
              : parseFloat(value)
            : value,
        ),
      )
    }
    return {
      onChange(e: ChangeEvent) {
        if (onChange) {
          onChange(e.currentTarget.value)
        } else {
          defaultOnChange(e)
        }
      },
      // type-coverage:ignore-next-line
      value: get(props, name),
    }
  }
  return (
    <>
      <h1>ReactQRious</h1>
      <ul className="lists">
        <li>
          <label>background(color)</label>
          <input type="color" {...fieldProps('background')} />
        </li>
        <li>
          <label>backgroundAlpha(0.1-1.0)</label>
          <input type="number" {...fieldProps('backgroundAlpha')} />
        </li>
        <li>
          <label>foreground(color)</label>
          <input type="color" {...fieldProps('foreground')} />
        </li>
        <li>
          <label>foregroundAlpha(0.1-1.0)</label>
          <input type="number" {...fieldProps('foregroundAlpha')} />
        </li>
        <li>
          <label>level</label>
          <select {...fieldProps('level')}>
            {LEVELS.map(level => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </li>
        <li>
          <label>mime</label>
          <select {...fieldProps('mime')}>
            <option value="image/png">image/png</option>
            <option value="image/jpeg">image/jpeg</option>
          </select>
        </li>
        <li>
          <label>padding(px)</label>
          <input type="number" {...fieldProps('padding')} />
        </li>
        <li>
          <label>size(px)</label>
          <input type="number" {...fieldProps('size')} />
        </li>
        <li>
          <label>value</label>
          <textarea rows={6} cols={80} {...fieldProps('value')} />
        </li>
      </ul>
      <QRious {...props} />
    </>
  )
}
