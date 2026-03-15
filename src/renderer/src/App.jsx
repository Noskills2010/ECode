import Monaco from './components/monaco'
import './stylesheets/App.css'

export default function App() {
  return (
    <div id="app">
      <div id="main">
        <div id="sidebar">Sidebar</div>
        <div id="editor-area">
          <div id="tabs">aaaa{/* TODO: TabBar */}</div>
          <Monaco/>
        </div>
      </div>
      <div id="terminal">Terminal</div>
      <div id="statusbar">Statusbar</div>
    </div>
  )
}
