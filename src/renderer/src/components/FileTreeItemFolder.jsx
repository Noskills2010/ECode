import { useState } from 'react'


export default function FileTreeItemFolder({ name, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div style={{ cursor: 'default' }}>
      <div>
        <span onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'v' : '>'}</span>
        {isOpen ? '📂' : '📁'} {name}
        {isOpen && <div style={{ paddingLeft: 16 }}>{children}</div>}
      </div>
    </div>
  )
}
