import Monaco from './components/monaco'
import './stylesheets/App.css'

export default function App() {
  return (
    <>
      <div id={'App'}>
        <div id={'sidebar'}>Sidebar</div>
        <div id={'right-editor'}>
          <div id={'editor'}>
            {/*missing TabBar TODO add TabBar*/}
            <Monaco></Monaco>
          </div>
          <div id={'bottom'}>
            <div id={'terminal'}>terminal</div>
            <div id={'statusBar'}>statusbar</div>
          </div>
        </div>
      </div>
    </>
  )
}
