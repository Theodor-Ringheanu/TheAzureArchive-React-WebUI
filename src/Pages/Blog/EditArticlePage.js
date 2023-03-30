import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import moment from 'moment';

function EditArticle() {
    const articleTitle = useRef("");
    const articleAuthor = useRef("");
    const articlePublicationDate = useRef("");
    const articleImageUrl = useRef("");
    const articleContent = useRef("");

    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://localhost:7080/api/Articles/${id}`)
            .then((response) => {
                articleTitle.current.value = response.data.value.title;
                articleAuthor.current.value = response.data.value.author;
                articlePublicationDate.current.value = response.data.value.publicationDate;
                articleImageUrl.current.value = response.data.value.imageUrl;
                articleContent.current.value = response.data.value.content;
                window.scrollTo(0, 0);
            });
    }, []);

    function validateDate(date) {
        return moment(date, ['YYYY-MM-DD'], true).isValid();
    }

    function EditArticleHandler() {
        if (articleTitle.current.value.length < 2 || articleTitle.current.value.length >= 250) {
            setTitleError(true);
            return;
        }
        if (articleAuthor.current.value.length < 2 || articleAuthor.current.value.length >= 250) {
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
            content: articleContent.current.value
        };

        axios
            .put(`https://localhost:7080/api/Articles/${id}`, payload)
            .then(() => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(`Apparently there's this error: ${error}`);
            });
    }

    function deleteConfirmHandler() {
        axios.delete(`https://localhost:7080/api/Articles/${id}`)
            .then(() => {
                navigate("/home");
            });
    }

    return (
        <>
            <h1>EDIT</h1>
            <Form>
                <Form.Group className="form-box">

                    <Form.Group className="label-1" controlId="formArticleTitle">
                        <Form.Label>Title</Form.Label>
                        {titleError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid title.
                            </div>}
                        <Form.Control type="text" placeholder={articleTitle} ref={articleTitle} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticleAuthor">
                        <Form.Label>Author</Form.Label>
                        {authorError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid author.
                            </div>}
                        <Form.Control type="text" placeholder={articleAuthor} ref={articleAuthor} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticlePublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        {dateError &&
                            <div style={{ color: 'red' }}>
                                You really should enter a valid date in YYYY-MM-DD format.
                            </div>}
                        <Form.Control type="text" placeholder={articlePublicationDate} ref={articlePublicationDate} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticleImageUrl">
                        <Form.Label>Image URL</Form.Label>
                        {imageUrlError &&
                            <div style={{ color: 'red' }}>
                                Please enter a valid image URL. The article needs a cover.
                            </div>}
                        <Form.Control type="text" placeholder={articleImageUrl} ref={articleImageUrl} />
                    </Form.Group>

                    <Form.Group className="label-1" controlId="formArticleContent">
                        <Form.Label>Content</Form.Label>
                        {contentError &&
                            <div style={{ color: 'red' }}>
                                Please enter some content. It's an article after all.
                            </div>}
                        <Form.Control as="textarea" rows={10} placeholder={articleContent}
                            ref={articleContent} />
                    </Form.Group>

                    <Button className="editBtn" variant="primary" type="button" onClick={EditArticleHandler}>
                        Edit Article
                    </Button>

                    <Button className="deleteBtn" variant="primary" type="button" onClick={deleteConfirmHandler}>
                        Delete Article
                    </Button>

                </Form.Group>
            </Form>
        </>
    )
}

export default EditArticle;