import FileTreeItemFolder from './FileTreeItemFolder';
import FileTreeItemFile from './FileTreeItemFile';
import { useState } from 'react'

const isValidName = (name, childrenNames) => {
  if (name.includes('.')) {
    if (!childrenNames.filter((i) => i === name).length > 1) {
      return true
    } else {
      return false
    }
  } else {
    if (!childrenNames.filter((i) => i === name).length > 1) {
      return true
    } else {
      return false
    }
  }
}


const iterStructure = (obj) => {
  let fileTree = obj.map((item) => {
    if (item.type === "Folder") {

      return <FileTreeItemFolder name={item.name}>{iterStructure(item.children)}</FileTreeItemFolder>
    }
    else {
      return <FileTreeItemFile name={item.name}/>
    }
  })
  return fileTree;
};

let fileTree = iterStructure([
  {
    name: 'src',
    type: 'Folder',
    children: [
      {
        name: 'main.py',
        type: 'File'
      },
      {
        name: 'utils',
        type: 'Folder',
        children: [
          { name: 'helper.py', type: 'File' },
          { name: 'math.py', type: 'File' }
        ]
      },
      {
        name: 'models',
        type: 'Folder',
        children: [
          { name: 'user.py', type: 'File' },
          { name: 'post.py', type: 'File' }
        ]
      }
    ]
  },
  {
    name: 'tests',
    type: 'Folder',
    children: [
      { name: 'test_main.py', type: 'File' },
      { name: 'test_utils.py', type: 'File' }
    ]
  },
  { name: 'README.md', type: 'File' },
  { name: 'requirements.txt', type: 'File' }
])

export default function Sidebar() {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        height: '100%',
        backgroundColor: '#1e1e1e',
        padding: '10px',
        borderRadius: '10px',
        overflowY: 'auto'
      }}
    >
      <div>{fileTree}</div>
    </div>
  )
}
