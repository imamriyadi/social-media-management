let sessions = {};
const fs = require(`fs`);

const MultiClient = (number) =>{
    const SESSION_FILE_PATH = __dirname + `/../sessions/session_${number}.json`;
    let sessionData;
    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionData = require(SESSION_FILE_PATH);
    }

    const puppeteerOptions = {
        session: sessionData,
        puppeteer: {
            //headless: false,
            userDataDir: __dirname + `/../sessions/${number}`,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    };

    // Use the saved values
    sessions[number] = new Client(puppeteerOptions);

    sessions[number].initialize();

    sessions[number].on('authenticated', (session) => {
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) console.log(err);
            else console.log(`Session stored`);
        });
    });

    sessions[number].on("ready", (session) => {

    });

    sessions[number].on('disconnected', (reason) => {

    });

    sessions[number].on('message', (msg) => {
        socket.emit('message', msg);
    });

    sessions[number].on('message_create', (msg) => {
        if (msg.fromMe) {
            // bisa menyimpan
        }
    });

    sessions[number].on('message_revoke_everyone', async (after, before) => {
        console.log(after); // message after it was deleted.
        if (before) {
            console.log(before); // message before it was deleted.
        }
    });

    sessions[number].on('message_revoke_me', (msg) => {
        console.log(msg.body);
    });

    sessions[number].on('message_ack', (msg, ack) => {
        /*
              == ACK VALUES ==
              ACK_ERROR: -1
              ACK_PENDING: 0
              ACK_SERVER: 1
              ACK_DEVICE: 2
              ACK_READ: 3
              ACK_PLAYED: 4
          */

        if (ack === 3) {
            // The message was read
        }
    });

    sessions[number].on('group_join', (notification) => {
        console.log('join', notification);
        notification.reply('User joined.');
    });

    sessions[number].on('group_leave', (notification) => {
        console.log('leave', notification);
        notification.reply('User left.');
    });

    sessions[number].on('group_update', (notification) => {
        console.log('update', notification);
    });

    sessions[number].on('change_battery', (batteryInfo) => {
        const { battery, plugged } = batteryInfo;
        console.log(`Battery: ${battery}% - Charging? ${plugged}`);
    });


    return sessions[number];
}

module.exports = MultiClient;
