import Monaco from './monaco'
import '../stylesheets/App.css'
import Sidebar from './sidebar'
import { Group, Panel } from 'react-resizable-panels'

export default function App() {
  return (
    <div id="app">
      <div id="workspace">
        <Group orientation="vertical" style={{ height: '100%' }}>
          <Panel defaultSize={70} minSize={30} style={{ display: 'flex' }}>
            <div id="main">
              <Group orientation="horizontal" style={{ height: '100%' }}>
                <Panel defaultSize={20} minSize={'10%'} style={{ display: 'flex' }}>
                  <Sidebar />
                </Panel>
                <Panel minSize={'15%'} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div id="editor-area">
                    <div id="tabs">Tabs</div>
                    <Monaco />
                  </div>
                </Panel>
              </Group>
            </div>
          </Panel>
          <Panel defaultSize={30} minSize={'5%'} maxSize={'95%'} style={{ display: 'flex' }}>
            <div id="terminal">Terminal</div>
          </Panel>
        </Group>
      </div>
      <div id="statusbar">Statusbar</div>
    </div>
  )
}
