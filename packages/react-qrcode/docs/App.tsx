import { get, merge, set } from 'lodash'
import React, { useState } from 'react'
import {
  LEVELS,
  MASK_PATTERNS,
  MODES,
  MaskPattern,
  QRCode,
  QRCodeProps,
  QRCodeSegment,
  TYPES,
} from 'react-qrcode'

const DEFAULT_TEXT = 'https://www.1stg.me'

type FormModel = Omit<QRCodeProps, 'maskPattern' | 'width' | 'version'> & {
  manualMode?: boolean
  maskPattern?: MaskPattern | ''
  width?: number | ''
  version?: number | ''
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>

// eslint-disable-next-line sonarjs/cognitive-complexity
export const App = () => {
  const [{ manualMode, ...options }, setState] = useState<FormModel>({
    version: '',
    errorCorrectionLevel: 'M',
    maskPattern: '',
    margin: 4,
    scale: 4,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
    type: 'image/png',
    quality: 0.92,
    width: '',
    value: DEFAULT_TEXT,
  })

  const setOptions = (newOptions: Partial<FormModel>) =>
    setState(oldOptions => merge({}, oldOptions, newOptions))

  const fieldProps = (name: string, onChange?: (value: unknown) => void) => {
    const defaultOnChange = (e: ChangeEvent) => {
      const { type, value } = e.currentTarget
      setOptions(
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
      value: get(options, name),
    }
  }

  return (
    <>
      <h1>ReactQRcode</h1>
      <ul className="lists">
        <li>
          <label>version</label>
          <select {...fieldProps('version')}>
            {Array.from({ length: 40 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </li>
        <li>
          <label>errorCorrectionLevel</label>
          <select {...fieldProps('errorCorrectionLevel')}>
            {LEVELS.map(level => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </li>
        <li>
          <label>maskPattern</label>
          <select {...fieldProps('maskPattern')}>
            {MASK_PATTERNS.map(pattern => (
              <option key={pattern}>{pattern}</option>
            ))}
          </select>
        </li>
        <li>
          <label>margin</label>
          <input type="number" {...fieldProps('margin')} />
        </li>
        <li />
        <li>
          <label>scale</label>
          <input type="number" {...fieldProps('scale')} />
        </li>
        <li>
          <label>width</label>
          <input type="number" {...fieldProps('width')} />
        </li>
        <li>
          <label>color.dark</label>
          <input type="color" {...fieldProps('color.dark')} />
        </li>
        <li>
          <label>color.light</label>
          <input type="color" {...fieldProps('color.light')} />
        </li>
        <li>
          <label>type</label>
          <select {...fieldProps('type')}>
            {TYPES.map((type, index) => (
              <option key={index}>{type}</option>
            ))}
          </select>
        </li>
        <li>
          <label>quality</label>
          <input type="number" step="0.01" {...fieldProps('quality')} />
        </li>
        <li>
          <label>
            manualMode
            <input
              type="checkbox"
              {...fieldProps('manualMode', () =>
                setOptions({
                  manualMode: !manualMode,
                  value: manualMode
                    ? DEFAULT_TEXT
                    : [
                        {
                          data: DEFAULT_TEXT,
                          mode: 'auto',
                        },
                      ],
                }),
              )}
            />
          </label>
        </li>
        <li>
          <label>
            value
            {manualMode && (
              <button
                onClick={() =>
                  setOptions({
                    value: (options.value as QRCodeSegment[]).concat({
                      data: DEFAULT_TEXT,
                      mode: 'auto',
                    }),
                  })
                }
              >
                +
              </button>
            )}
          </label>
          {manualMode ? (
            <ul>
              {(options.value as QRCodeSegment[]).map((_, index, value) => (
                <li key={index}>
                  {value.length <= 1 || (
                    <button
                      onClick={() =>
                        setOptions({
                          value: value.filter((__, i) => i === index),
                        })
                      }
                    >
                      -
                    </button>
                  )}
                  <div>
                    <label>mode</label>
                    <select {...fieldProps(`value[${index}].mode`)}>
                      {MODES.map(mode => (
                        <option key={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>data</label>
                    <textarea
                      rows={6}
                      cols={80}
                      {...fieldProps(`value[${index}].data`)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <textarea rows={6} cols={80} {...fieldProps('value')} />
          )}
        </li>
      </ul>
      <QRCode {...(options as QRCodeProps)} />
    </>
  )
}
