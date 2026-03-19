const files = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'main.py', type: 'file' },
      { name: 'utils.py', type: 'file' },
      { name: 'ast.py', type: 'file' }
    ]
  },
  { name: 'README.md', type: 'file' },
  { name: 'hello.js', type: 'file' }
]


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
      {files.map((file) =>
        file.type === 'folder' ? (
          <div key={file.name}>📁 {file.name}</div>
        ) : (
          <div key={file.name}>📄 {file.name}</div>
        )
      )}
    </div>
  )
}
