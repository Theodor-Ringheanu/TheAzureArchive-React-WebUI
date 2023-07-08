import React from 'react';

const ArticleCover = ({ article }) => {
    return (
        <div className='article-box'>
            <div className="article">
                <div style={{ zIndex: 3 }}>
                    <span>{article.publicationDate}</span>
                </div>

                <div>
                    <img className='cover-image'
                        src={article.imageUrl}
                        alt='article cover'>
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