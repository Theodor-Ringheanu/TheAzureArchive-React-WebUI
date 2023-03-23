import React from 'react';

const ArticleCover = ({ article }) => {
    return (
        <div className='story-box'>
            <div className="story">
                <div>
                </div>

                <div>
                    <img className='cover-image'
                        src={article.imageUrl}
                        alt='article cover image'>
                    </img>
                </div>

                <div>
                    <span>{article.author}</span>
                    <h3>{article.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default ArticleCover;