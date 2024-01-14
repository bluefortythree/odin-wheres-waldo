import waldo from '../waldo.jpg'
import waldo1 from '../waldo1.jpg'
import waldo2 from '../waldo2.jpg'
import waldo3 from '../waldo3.jpg'
import { Link } from 'react-router-dom'

function Main(props) {

    // console.log(props.position)

    return (
        <div className='wrapper'>
            <img src={waldo} onClick={props.select}/>
            {props.modal && 
                <div className='selector' style={{left: props.position.x, top: props.position.y}}>
                    <img src={waldo1} onClick={() => {props.test('telescope', props.position.x, props.position.y)}}></img>
                    <img src={waldo2} onClick={() => {props.test('waldo', props.position.x, props.position.y)}}></img>
                    <img src={waldo3} onClick={() => {props.test('astronaut', props.position.x, props.position.y)}}></img>
                </div>
            }
            {props.visibility && !props.gameOver &&
                <div className='modal'>
                    <h1>Welcome!</h1>
                    <h2>Find the three characters as quickly as possible. It's that easy! Click 'play' to get started.</h2>
                    <div className='images'>
                        <img src={waldo1} className='find'/>
                        <img src={waldo2} className='find'/>
                        <img src={waldo3} className='find'/>
                    </div>
                    <button className='play' onClick={props.handleClick}>Play ►</button>
                </div>
            }
            {!props.visibility && props.gameOver && (!props.found.one || !props.found.two || !props.found.three) &&
                <div className='modal out-of-time'>
                    <h1>Game over!</h1>
                    <h2>You ran out of time. Click 'try again' to start a new game.</h2>
                    <button className='play' onClick={props.reset}>Try again</button>
                </div>
            }
            {props.successMessage && 
                <div className='success-message'>Correct!</div>
            }
            {props.failureMessage && 
                <div className='failure-message'>Try again!</div>
            }
            {props.alreadyFound && 
                <div className='already-found'>Already found!</div>
            }
            {props.gameOverMessage &&
                <div className='game-over-container'>
                    <div className='game-over-message'>Congratulations! Your time is {props.min < 10 ? '0'+props.min : props.min}:{props.sec < 10 ? '0'+props.sec : props.sec}.{props.ms < 10 ? '0'+props.ms : props.ms}!</div>
                    <form action='leaderboard'>
                        <label htmlFor='name'>Your name:</label>
                        <input type='text' id='name' name='name'  minLength={3} maxLength={20} onChange={props.handleNameChange} />
                        <button type='submit' className='submit-button' onClick={props.submitScore}>Submit</button>
                    </form>
                    <button className='play-again-button'onClick={props.reset}>Play again</button>
                </div>
            }
        </div>
    )
}

export default Main