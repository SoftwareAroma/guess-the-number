import React from 'react';
import { GenerateRandomNumber } from '../utils';
import { BoundInput } from './widgets';

const defaultConfig ={
    lowerBound: 0,
    upperBound: 10,
}

const statusMessages = {
    default: '',
    success: 'You got it!',
    lower: 'Guess Lower',
    upper: 'Guess Higher',
    error: 'Invalid Input',
}

// type of config
type TConfig = typeof defaultConfig;

const MainComponent = () => {

    const [_lastGuess, setLastGuess] = React.useState(0);
    const [_guess, setGuess] = React.useState(0);
    const [_config, setConfig] = React.useState(defaultConfig);
    const [_statusMessage, setStatusMessage] = React.useState(statusMessages);

    // get the random number from the utils functions
    const _randomNumber = React.useMemo(() => {
        return GenerateRandomNumber(_config.lowerBound, _config.upperBound);
    }, [_config.lowerBound, _config.upperBound]);

    const changeConfig = (config:TConfig) => {
        console.log(config);
        setConfig(config);
    }

    // change status message
    const changeStatusMessage = () => {
        // if guess is the same as _random number set the default message to success
        if(_guess !== null){
            if(_guess.toString() === _randomNumber.toString()){
                setStatusMessage({...statusMessages, default: statusMessages.success});
            }else if(_guess > _randomNumber){
                setStatusMessage({...statusMessages, default: statusMessages.lower});
            }else if(_guess < _randomNumber){
                setStatusMessage({...statusMessages, default: statusMessages.upper});
            }
        }else{
            setStatusMessage({...statusMessages, default: statusMessages.error});
        }
    }

    // verify game
    const verifyGame = (event:any) => {
        event.preventDefault();
        if(_guess !== null){
            changeStatusMessage();
            setLastGuess(_guess);
        }
    }

    // reset app to default
    const resetApp = () => {
        setLastGuess(0);
        setGuess(0);
        setConfig(defaultConfig);
        setStatusMessage(statusMessages);
    }

    return (
        <React.Fragment>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="bg-white shadow-md px-10 py-10 rounded-md">
                    <div className="flex justify-center items-center mb-8">
                        <div className="flex text-xl md:text-2xl lg:text-4xl">
                            Play!
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className='prompt'>Guess the number between 1 and 10</div>
                            <div className="flex flex-row justify-start items-center">
                                <div className="mr-4">
                                    Last Guess:
                                </div>
                                <div className='last-guess'>{_lastGuess === 0 ? "None" : _lastGuess}</div>
                            </div>
                            <div className={_statusMessage.default === statusMessages.success ? "text-green-500" : ""}>{_statusMessage.default}</div>
                            <div className="flex justify-between items-center space-x-4 my-2">
                                <BoundInput
                                    title="Guess"
                                    name="guess"
                                    value={_guess === 0 ? "" : _guess}
                                    onChange={(e:any) => {
                                        e.preventDefault();
                                        setGuess(e.target.value)
                                    }}
                                ></BoundInput>
                                <button
                                    className={_guess === 0 ? "cursor-not-allowed bg-blue-300 hover:bg-blue-400 blue-400 px-4 py-2 text-white font-bold rounded-md" : "bg-blue-400 px-4 py-2 text-white font-bold rounded-md hover:bg-blue-700"} name='attempt'
                                    onClick={_guess === 0 ? ()=> {} : (event) => verifyGame(event)}
                                >
                                    Make guess
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center my-8">
                            <h3>Game Config</h3>
                        </div>
                        <div className='flex flex-col justify-start items-start space-y-2'>
                            {/* lower bound */}
                            <BoundInput
                                title='Lower Bound'
                                name='lowerBound'
                                type='number'
                                value={_config.lowerBound}
                                onChange={(e:any) => {
                                    e.preventDefault();
                                    changeConfig({..._config, lowerBound: parseInt(e.target.value)})
                                }}
                            ></BoundInput>

                            {/* upper bound */}
                            <BoundInput
                                title='Upper Bound'
                                name='upperBound'
                                type='number'
                                value={_config.upperBound}
                                onChange={(e:any) => {
                                    e.preventDefault();
                                    changeConfig({..._config, upperBound: parseInt(e.target.value)})
                                }}
                            ></BoundInput>
                        </div>
                        <div className="flex flex-row justify-center">
                            <button 
                                className='bg-red-500 px-4 py-1 rounded-sm text-white font-bold tracking-wider text-lg md:text-xl lg:text-2xl mt-4' 
                                name='reset'
                                onClick={() => resetApp()}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainComponent;