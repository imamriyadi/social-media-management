const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const ProjectController = require("../controller/ProjectController");
let socket = null;
const SESSION_FILE_PATH = __dirname + `/../sessions/single/session_session.json`;

const SingleClient = (sockets) => {
    socket = sockets;
    let sessionCfg;
    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionCfg = require(SESSION_FILE_PATH);
    }

    const client = new Client({
        restartOnAuthFail: true,
        puppeteer: {
            // userDataDir: __dirname + `/../sessions/single/data`,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu'
            ],
            headless: true
        },
        session: sessionCfg
    });

    client.initialize();
    socket.emit('message', 'Connecting...');
    socket.emit('check', "check info");
    socket.on("check_info", args => {
        if (typeof (client.info) !== 'undefined') {
            socket.emit('message', client.info.pushname);
            socket.emit('isConnectWa', client.info.pushname);
        } else {
            socket.emit('notConnectWa', "Not Connected WA");
        }
    });
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode.toDataURL(qr, (err, url) => {
            socket.emit('qr', url);
            socket.emit('message', 'QR Code received, scan please!');
        });
    });

    client.on('ready', () => {
        socket.emit('ready', 'Whatsapp is ready!');
        socket.emit('message', 'Whatsapp is ready!');
        socket.emit('message', client.info.phone);
    });


    client.on('authenticated', (session) => {
        socket.emit('message', 'Whatsapp is authenticated!');
        console.log('AUTHENTICATED', session);
        sessionCfg = session;
        ProjectController.updateToken(session).then(result => {
            console.log('Token Update :', result);
        }).catch(err => {
            console.log('Token Gagal Update :', err);
        });
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.error(err);
            }
        });
    });

    client.on('auth_failure', function (session) {
        socket.emit('message', 'Auth failure, restarting...');
    });

    client.on('disconnected', (reason) => {
        socket.emit('message', 'Whatsapp is disconnected!');
        socket.emit('disconnected', 'Whatsapp is disconnected!');
        client.destroy();
        sessionCfg = null;
        fs.unlinkSync(SESSION_FILE_PATH, function (err) {
            if (err) return console.log(err);
            console.log('Session file deleted!');
        });
        client.initialize();
    });

    client.on('message', msg => {
        socket.emit('message', 'MESSAGE RECEIVED');
        socket.emit('message', Math.random());
        if (msg.body === '!ping reply') {
            // Send a new message as a reply to the current one
            msg.reply('pong');

        } else if (msg.body === '!ping') {
            // Send a new message to the same chat
            client.sendMessage(msg.from, 'pong');

        } else if (msg.body === '!info') {
            let info = client.info;
            client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.me.user}
            Platform: ${info.platform}
            WhatsApp version: ${info.phone.wa_version}
        `);
        } else {
            client.sendMessage(msg.from, msg.body);
        }
    });

    client.on('message_create', (msg) => {
        console.log('NEW MESSAGE', msg);
        // Fired on all message creations, including your own
        if (msg.fromMe) {
            // do stuff here
        }
    });

    client.on('message_revoke_everyone', async (after, before) => {
        // Fired whenever a message is deleted by anyone (including you)
        console.log(after); // message after it was deleted.
        if (before) {
            console.log(before); // message before it was deleted.
        }
    });

    client.on('message_revoke_me', async (msg) => {
        // Fired whenever a message is only deleted in your own view.
        console.log(msg.body); // message before it was deleted.
    });

    client.on('message_ack', (msg, ack) => {
        console.log('MESSAGE SENT', msg, ack);
        /*
            == ACK VALUES ==
            ACK_ERROR: -1
            ACK_PENDING: 0
            ACK_SERVER: 1
            ACK_DEVICE: 2
            ACK_READ: 3
            ACK_PLAYED: 4
        */

        if (ack == 3) {
            // The message was read
        }
    });

    client.on('group_join', (notification) => {
        // User has joined or been added to the group.
        console.log('join', notification);
        notification.reply('User joined.');
    });

    client.on('group_leave', (notification) => {
        // User has left or been kicked from the group.
        console.log('leave', notification);
        notification.reply('User left.');
    });

    client.on('group_update', (notification) => {
        // Group picture, subject or description has been updated.
        console.log('update', notification);
    });

    client.on('change_battery', (batteryInfo) => {
        // Battery percentage for attached device has changed
        const {battery, plugged} = batteryInfo;
        console.log(`Battery: ${battery}% - Charging? ${plugged}`);
    });
}


module.exports = {SingleClient};
