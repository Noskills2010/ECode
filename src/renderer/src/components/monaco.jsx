import { Editor, loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

loader.config({ monaco })

export default function Monaco() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column"}}>
      <Editor
        height="100%"
        defaultLanguage="python"
        defaultValue="# Schreib deinen Code hier..."
        theme="vs-dark"
      />
    </div>
  )
}
