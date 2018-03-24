const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

module.exports = {
    
    getCommandLineOptions: function () {

        const optionDefinitions = [
            { 
                name: 'launchServer',
                alias: 'l',
                type: String,
                defaultOption: 'N',
                typeLabel: '[underline]{Y / N}',
                description: 'type Y to start the process.'
            }
        ];
    
        const options = commandLineArgs(optionDefinitions)
        
        if ( !options.launchServer ) {
            const usage = commandLineUsage([
                {
                    header: 'Launch server',
                    content: 'A simple app for movie collections.'
                },
                {
                    header: 'Options',
                    optionList: optionDefinitions
                },
                {
                    header: 'moreInfos',
                    content: 'Project home: [underline]{https://notYetAvailable}'
                }
            ])
            
            process.exit();
        }
    
        return options;
    }
}