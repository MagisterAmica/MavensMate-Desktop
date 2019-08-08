var electron        = require('electron');
var app             = electron.app;
var ipc             = electron.ipcMain;

module.exports = function(attachWindow) {
  return [
    {
      label: 'MavensMate',
      submenu: [
        {
          label: 'MavensMate v'+app.getVersion()
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide MavensMate',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Actual Size',
          accelerator: 'CmdOrCtrl+0',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.setZoomLevel(0)
          }
        },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          click (item, focusedWindow) {
            if (focusedWindow) {
              const {webContents} = focusedWindow
              webContents.getZoomLevel((zoomLevel) => {
                webContents.setZoomLevel(zoomLevel + 0.5)
              })
            }
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click (item, focusedWindow) {
            if (focusedWindow) {
              const {webContents} = focusedWindow
              webContents.getZoomLevel((zoomLevel) => {
                webContents.setZoomLevel(zoomLevel - 0.5)
              })
            }
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'New Window',
          accelerator: 'Command+N',
          click: function() {
            attachWindow();
          }
        },
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        },
      ]
    },
    {
      label: 'Advanced',
      submenu: [
        {
          label: 'Toggle MavensMate Server Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Alt+Command+K';
            else
              return 'Ctrl+Shift+K';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.send('toggle-server-developer-tools');
            }
          }
        },
        {
          label: 'Toggle MavensMate Desktop Developer Tools',
          accelerator: (function() {
            if (process.platform === 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.send('toggle-desktop-developer-tools');
            }
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'MavensMate v'+app.getVersion()
        },
        {
          label: 'Check for Updates',
          click: function() { require('electron').shell.openExternal('https://github.com/MagisterAmica/MavensMate-Desktop/releases') }
        },
        {
          label: 'Learn More',
          click: function() { require('electron').shell.openExternal('http://mavensmate.com') }
        },
        {
          label: 'Submit a GitHub Issue',
          click: function() { require('electron').shell.openExternal('https://github.com/MagisterAmica/MavensMate/issues') }
        }
      ]
    }
  ];
};
