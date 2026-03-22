import FileTreeItemFolder from './FileTreeItemFolder'
import FileTreeItemFile from './FileTreeItemFile'
import { useState, useEffect } from 'react'

const iterStructure = (obj, onContextMenu) => {
  return obj.map((item) => {
    if (item.type === 'Folder') {
      return (
        <FileTreeItemFolder name={item.name} onContextMenu={(e) => onContextMenu(e, 'folder', item.path)}>
          {iterStructure(item.children, onContextMenu)}
        </FileTreeItemFolder>
      )
    } else {
      return <FileTreeItemFile name={item.name} onContextMenu={(e) => onContextMenu(e, 'file', item.path)} />
    }
  })
}

export default function Sidebar() {
  const [structure, setStructure] = useState([])
  const [contextMenu, setContextMenu] = useState(null) // { x, y, type }

  useEffect(() => {
    window.api.sendDirectory('C:/development/ECode/ECode/src')
    window.api.getDirectory((data) => setStructure(data))
  }, [])

  const handleContextMenu = (e, type, path) => {
    e.preventDefault()
    e.stopPropagation() // verhindert, dass das Event nach oben "blubbert"
    setContextMenu({ x: e.clientX, y: e.clientY, type, path })
  }

  const closeMenu = () => setContextMenu(null)

  return (
    <div
      onClick={closeMenu}
      style={{
        flex: 1,
        minWidth: 0,
        height: '100%',
        backgroundColor: '#1e1e1e',
        padding: '10px',
        borderRadius: '10px',
        overflowY: 'auto',
        overflowX: 'clip'
      }}
    >
      <FileTreeItemFolder
        name={'topFolderNamePlaceholder'}
        onContextMenu={(e) => handleContextMenu(e, 'folder')}
      >
        <div>{iterStructure(structure, handleContextMenu)}</div>
      </FileTreeItemFolder>

      {contextMenu && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '6px',
            padding: '4px 0',
            zIndex: 1000,
            minWidth: '150px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          {/* Unterscheidung: andere Optionen je nach Typ */}
          {contextMenu.type === 'folder' ? (
            <div>
              <div>new Folder</div>
              <div>new File</div>
              <div>Rename</div>
              <div>delete folder</div>
            </div>
          ) : (
            <div>
              <div>Rename</div>
              <div>delete</div>
              <div>run file(not implemented for long)</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
