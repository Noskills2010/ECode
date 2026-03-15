import { Editor, loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

loader.config({ monaco })

export default function Monaco() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="python"
      defaultValue="# Schreib deinen Code hier..."
      theme="vs-dark"
    />
  )
}
