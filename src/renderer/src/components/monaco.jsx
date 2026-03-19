import { Editor, loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import "./../stylesheets/monaco.css"

loader.config({ monaco })

export default function Monaco() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '5px'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          borderRadius: '10px'
        }}
        id={'monaco-styling-div'}
      >
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue="# Schreib deinen Code hier..."
          theme="vs-dark"
        />
      </div>
    </div>
  )
}
