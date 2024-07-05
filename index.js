const electron = require('electron');
const path = require('path');
const url = require('url');

if (require('electron-squirrel-startup')) app.quit();

// SET ENV
process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
	// Create new window
	mainWindow = new BrowserWindow({
		height: 700,
		width: 1100,
		resizable: false,
		// webPreferences: {
		// 	nodeIntegration: true
		// }
	});
	// Load html in window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true,
	}));
	// Quit app when closed
	mainWindow.on('closed', function () {
		app.quit();
	});

	// Build menu from template
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	// Insert menu
	Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
	// Each object is a dropdown
	{
		label: 'Options',
		submenu: [
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click() {
					app.quit();
				}
			},
			{
				label: 'Nouvelle Partie',
				accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
				click() {
					mainWindow.loadURL(url.format({
						pathname: path.join(__dirname, '/views/game.html'),
						protocol: 'file:',
						slashes: true,
					}));
				}
			}
		]
	}
];

// If OSX, add empty object to menu
if (process.platform == 'darwin') {
	mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				role: 'reload'
			},
			{
				label: 'Toggle DevTools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			}
		]
	});
}