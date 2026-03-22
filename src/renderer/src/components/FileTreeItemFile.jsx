//import { useState } from 'react'

export default function FileTreeItemFile({ name, onContextMenu }) {
  return (
    <div
      style={{
        cursor: 'default',
        textOverflow: 'hidden',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}
      onContextMenu={onContextMenu}
    >
      📄 {name}
    </div>
  )
}
