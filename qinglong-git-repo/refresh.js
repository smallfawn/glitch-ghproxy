const path = require('path');
const axios = require('axios');
const fs = require('fs');

module.exports = function () {
    const configPath = path.join(__dirname, 'config.json');
    let config = {};
    try {
        const configFile = fs.readFileSync(configPath, 'utf8');
        config = JSON.parse(configFile);
    } catch (error) {
        console.error(error);
    }
    if (config.refreshStatus && config.refreshTime && config.glitchAppUrl) {
        setInterval(async () => {
            try {
                const response = await axios.get(config.glitchAppUrl);
                console.log(config.glitchAppUrl)
                //console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }, config.refreshTime);
    }
}
