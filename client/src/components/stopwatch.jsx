import waldo1 from '../waldo1.jpg'
import waldo2 from '../waldo2.jpg'
import waldo3 from '../waldo3.jpg'

function Stopwatch(props) {
    const {min, sec, ms, found} = props

    return (
        <div className='stopwatch-container'>
            <div>
                {sec < 1500 &&
                    <div className='stopwatch'>
                        {min < 10 ? '0'+min : min}:{sec < 10 ? '0'+sec : sec}.{ms < 10 ? '0'+ms : ms}
                    </div>        
                }
                {sec === 1500 &&
                    <div className='time-up'>
                        Time's up!
                    </div>
                }
            </div>
            <div className='image-container'>
                <div>You are trying to find:</div>
                <div className='images'></div>
                <img src={waldo1} className='find-small' style={found.one ? {opacity: 0.0, border: "0.25rem solid black"} : {border: "0.25rem solid black"}}/>
                <img src={waldo2} className='find-small' style={found.two ? {opacity: 0.0, border: "0.25rem solid black"} : {border: "0.25rem solid black"}}/>
                <img src={waldo3} className='find-small' style={found.three ? {opacity: 0.0, border: "0.25rem solid black"} : {border: "0.25rem solid black"}}/>
            </div>
        </div>
    )
}

export default Stopwatch