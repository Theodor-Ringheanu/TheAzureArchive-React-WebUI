import React from 'react';

const NewsCover = ({ news }) => {
    return (
        <div className='story-box'>
            <div className="story">
                <div style={{zIndex: 3}}>
                    <span>{news.source}</span>
                </div>

                <div>
                    <img className='cover-image'
                        src={news.imageUrl}
                        alt='news cover image'>
                    </img>
                </div>

                <div>
                    <span>{news.author}</span>
                    <h3>{news.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default NewsCover;