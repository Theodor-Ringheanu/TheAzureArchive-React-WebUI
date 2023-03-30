import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from 'moment';

function AddArticle() {
    window.scrollTo(0, 0);
    const articleTitle = useRef("");
    const articleAuthor = useRef("");
    const articlePublicationDate = useRef("");
    const articleImageUrl = useRef("");
    const articleContent = useRef("");

    const navigate = useNavigate();

    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [contentError, setContentError] = useState(false);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    function AddArticleHandler() {
        if (articleTitle.current.value.length < 2 ||articleTitle.current.value.length >= 250) {
            setTitleError(true);
            return;
        }
        if (articleAuthor.current.value.length < 2 ||articleAuthor.current.value.length >= 250) {
            setAuthorError(true);
            return;
        }
        if (!validateDate(articlePublicationDate.current.value)) {
            setDateError(true);
            return;
        }
        if (articleImageUrl.current.value.length < 2 || articleImageUrl.current.value.length >= 250) {
            setImageUrlError(true);
            return;
        }
        if (articleContent.current.value.length < 2) {
            setContentError(true);
            return;
        }
        const payload = {
            title: articleTitle.current.value,
            author: articleAuthor.current.value,
            publicationDate: articlePublicationDate.current.value,
            imageUrl: articleImageUrl.current.value,
            content:articleContent.current.value
        };

        axios
            .post("https://localhost:7080/api/Articles", payload)
            .then((response) => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    return (
        <>
            <h1>Create Article</h1>
            <Form>
                <Form.Group className="form-box">

                    <Form.Group className="label-1" controlId="formArticleTitle">
                        <Form.Label>Title</Form.Label>
                        {titleError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid title.
                            </div>}
                        <Form.Control type="text" placeholder="Title" ref={articleTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticleAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid author.
                            </div>}
                        <Form.Control type="text" placeholder="Author" ref={articleAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticlePublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        {dateError &&
                            <div style={{ color: 'red' }}>
                                You really should enter a valid date in YYYY-MM-DD format.
                            </div>}
                        <Form.Control type="text" placeholder="YYYY-MM-DD" ref={articlePublicationDate} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticleImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        {imageUrlError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid image URL. The article needs a cover.
                            </div>}
                        <Form.Control type="text" placeholder="https://www.example.com" ref={articleImageUrl} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticleContent">
                        <Form.Label>Content</Form.Label>
                        {contentError &&
                            <div style={{ color: 'red' }}>
                                Please enter some content. It's an article after all.
                            </div>}
                        <Form.Control as="textarea" rows={10} placeholder="Lorem ipsum..."
                            ref={articleContent} />
                    </Form.Group>

                    <Button className="editBtn" variant="primary" type="button" onClick={AddArticleHandler}>
                        PUBLISH ARTICLE
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}

export default AddArticle;
