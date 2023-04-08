import React from 'react';

const StoryCover = ({ story }) => {
    return (
        <div className='story-box'>
            <div className="story">
                <div style={{zIndex: 3}}>
                    <span>{story.series}</span>
                </div>

                <div>
                    <img className='cover-image'
                        src={story.imageUrl}
                        alt='story cover'>
                    </img>
                </div>

                <div>
                    <span>{story.author}</span>
                    <h3>{story.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default StoryCover;