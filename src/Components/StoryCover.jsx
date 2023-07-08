import React from 'react';

const StoryCover = ({ story }) => {
    return (
        <div className='story-box'>
            <div className="story">
                <div>
                    <span>{story.series}</span>
                </div>

                <div>
                    <img className='cover-image'
                        src={story.imageUrl}
                        alt='story cover image'>
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