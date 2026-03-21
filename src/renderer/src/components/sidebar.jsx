import FileTreeItemFolder from './FileTreeItemFolder';
import FileTreeItemFile from './FileTreeItemFile';
import { useState, useEffect } from 'react'

const isValidName = (name, childrenNames) => {
  if (!childrenNames.filter((i) => i === name).length > 1) {
    return true
  } else {
    return false
  }
}

const iterStructure = (obj) => {
  return obj.map((item) => {
    if (item.type === "Folder") {
      return <FileTreeItemFolder name={item.name}>{iterStructure(item.children)}</FileTreeItemFolder>
    } else {
      return <FileTreeItemFile name={item.name}/>
    }
  })
}

export default function Sidebar() {
  const [structure, setStructure] = useState([])

  useEffect(() => {
    window.api.sendDirectory('C:/development/ECode/ECode/src')
    window.api.getDirectory((data) => {
      setStructure(data)
    })
  }, [])

  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      height: '100%',
      backgroundColor: '#1e1e1e',
      padding: '10px',
      borderRadius: '10px',
      overflowY: 'auto'
    }}>
      <div>{iterStructure(structure)}</div>
    </div>
  )
}
