import Monaco from './monaco'
import '../stylesheets/App.css'
import Sidebar from './sidebar'

export default function App() {
  return (
    <div id="app">
      <div id="main">
        <Sidebar/>
        <div id="editor-area">
          <div id="tabs">Tabs{/* TODO: TabBar */}</div>
          <Monaco/>
        </div>
      </div>
      <div id="terminal">Terminal</div>
      <div id="statusbar">Statusbar</div>
    </div>
  )
}
