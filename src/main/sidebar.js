import { ipcMain } from 'electron'
import chokidar from 'chokidar'

// Sortiert den Baum: Erst Ordner, dann Dateien, beides alphabetisch
const sortTree = (nodes) => {
  nodes.sort((a, b) => {
    // 1. Ordner priorisieren
    if (a.type !== b.type) {
      return a.type === 'Folder' ? -1 : 1
    }
    // 2. Alphabetisch sortieren
    return a.name.localeCompare(b.name)
  })
  // Unterordner rekursiv sortieren
  nodes.forEach((node) => {
    if (node.children) {
      sortTree(node.children)
    }
  })
}

const removeNode = (parts, currentTree) => {
  if (parts.length === 1) {
    // Element liegt direkt im Hauptverzeichnis (Root)
    const index = currentTree.findIndex((item) => item.name === parts[0])
    if (index !== -1) currentTree.splice(index, 1)
  } else {
    // Element liegt in einem Unterordner
    const parent = getParent(parts[parts.length - 2], currentTree)
    if (parent && parent.children) {
      const index = parent.children.findIndex((item) => item.name === parts[parts.length - 1])
      if (index !== -1) parent.children.splice(index, 1)
    }
  }
}

const getParent = (name, tree) => {
  for (const item of tree) {
    if (item.name === name) return item
    if (item.children) {
      const found = getParent(name, item.children)
      if (found) return found
    }
  }
  return null
}

const insertFile = (parts, tree) => {
  if (parts.length === 1) {
    tree.push({ name: parts[0], type: 'File' })
  } else {
    const parent = getParent(parts[parts.length - 2], tree)
    if (parent) {
      parent.children.push({ name: parts[parts.length - 1], type: 'File' })
    }
  }
}

export const watchDir = (WatchPath, mainWindow) => {
  let tree = []
  let pendingFiles = []
  let isReady = false  // ← neues Flag

  return chokidar
    .watch(WatchPath)
    .on('all', (event, path) => {
      if (event === 'addDir' || event === 'add') {
        const parts = path.split('\\').slice(WatchPath.split('/').length)

        if (event === 'addDir') {
          if (!tree.find((item) => item.name === path[0])) {
            if (parts.length === 1) {
              tree.push({ name: parts[0], type: 'Folder', children: [] })
            }
            if (parts.length > 1) {
              const parent = getParent(parts[parts.length - 2], tree)
              if (parent) {
                parent.children.push({
                  name: parts[parts.length - 1],
                  type: 'Folder',
                  children: []
                })
              }
            }
          }
        }

        if (event === 'add') {
          if (isReady) {
            // Nach ready → direkt in tree einfügen ✅
            insertFile(parts, tree)
            mainWindow.webContents.send('sidebarGetFiles', tree)
          } else {
            // Vor ready → wie bisher puffern
            pendingFiles.push(parts)
          }
        }
      }
    })
    .on('ready', () => {
      // for debug reasons: console.log('ready', pendingFiles)
      isReady = true // ← ab jetzt direkt einfügen

      pendingFiles.forEach((item) => {
        insertFile(item, tree)
      })
      pendingFiles = [] // Speicher freigeben

      sortTree(tree)

      // for debug reasons: console.log(JSON.stringify(tree, null, 2))
      mainWindow.webContents.send('sidebarGetFiles', tree)
    })
    .on('unlink', (path) => {
      const parts = path.split('\\').slice(WatchPath.split('/').length)
      removeNode(parts, tree)
      mainWindow.webContents.send('sidebarGetFiles', tree)
    })
    .on('unlinkDir', (path) => {
      const parts = path.split('\\').slice(WatchPath.split('/').length)
      removeNode(parts, tree)
      mainWindow.webContents.send('sidebarGetFiles', tree)
    })
    .on('addDir', () => {
      mainWindow.webContents.send('sidebarGetFiles', tree)
    })
}
