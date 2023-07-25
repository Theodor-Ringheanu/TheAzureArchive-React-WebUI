import React, { useEffect, useState } from 'react';

const ArticleCover = ({ article }) => {
    const [publicationDate, setPublicationDate] = useState({});
    useEffect(() => {
        const publicationDate = article?.publicationDate;
        if (publicationDate) {
          const date = new Date(publicationDate);
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          const monthName = months[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          const _publicationDate = `${day} ${monthName} ${year}`;
          setPublicationDate(_publicationDate);
        }
      }, [article]);

    return (
        <div className='article-box'>
            <div className="article">
                <div style={{ zIndex: 3 }}>
                    <span>{typeof publicationDate === 'string' ? publicationDate : ''}</span>
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